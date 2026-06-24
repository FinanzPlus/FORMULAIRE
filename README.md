# Formulaire d'Éligibilité au Prêt FinanzPlus Austria

Application web complète pour la soumission de demandes de prêt avec React (frontend) et Node.js/Express (backend).

## 📋 Fonctionnalités

### Frontend (React)
- ✅ Formulaire multi-sections avec 7 sections distinctes
- ✅ Validation en temps réel des champs
- ✅ Upload de fichiers avec validation des formats (PDF, JPG, PNG)
- ✅ Design responsive (mobile et desktop)
- ✅ Activation conditionnelle du bouton de soumission
- ✅ Messages de confirmation et d'erreur
- ✅ Interface utilisateur moderne et professionnelle

### Backend (Node.js/Express)
- ✅ API RESTful pour la soumission du formulaire
- ✅ Gestion des uploads de fichiers avec Multer
- ✅ Envoi d'emails avec pièces jointes via Nodemailer
- ✅ Validation côté serveur
- ✅ Gestion robuste des erreurs
- ✅ Support CORS pour la communication frontend-backend

## 🚀 Installation et Configuration

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn
- Un compte email Proton Mail (pour l'envoi d'emails)

### 1. Installation du Backend

```bash
# Naviguer vers le dossier backend
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env à partir de l'exemple
cp .env.example .env
```

### 2. Configuration de l'Email (Backend)

Éditez le fichier `backend/.env` et remplissez vos informations :

```env
PORT=5000

# Configuration Proton Mail
EMAIL_HOST=smtp.protonmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@proton.me
EMAIL_PASS=votre_mot_de_passe_application
```

**Important :** Pour obtenir un mot de passe d'application Proton Mail :
1. Connectez-vous à votre compte Proton Mail
2. Allez dans **Paramètres** → **Sécurité et confidentialité**
3. Créez un **mot de passe d'application**
4. Utilisez ce mot de passe dans le fichier `.env`

### 3. Installation du Frontend

```bash
# Naviguer vers le dossier frontend
cd frontend

# Installer les dépendances
npm install
```

## 🎯 Démarrage de l'Application

### Démarrer le Backend

```bash
# Dans le dossier backend
cd backend
node server.js
```

Le serveur backend démarrera sur `http://localhost:5000`

### Démarrer le Frontend

```bash
# Dans un nouveau terminal, naviguer vers le dossier frontend
cd frontend
npm start
```

Le frontend démarrera sur `http://localhost:3000` et s'ouvrira automatiquement dans votre navigateur.

## 📝 Structure du Projet

```
FORMULAIRE/
├── backend/
│   ├── server.js              # Serveur Express principal
│   ├── .env.example           # Exemple de configuration
│   ├── .env                   # Configuration (à créer)
│   ├── .gitignore            # Fichiers à ignorer
│   ├── package.json          # Dépendances backend
│   └── uploads/              # Dossier temporaire pour les fichiers
│
├── frontend/
│   ├── public/               # Fichiers publics
│   ├── src/
│   │   ├── App.js           # Composant principal du formulaire
│   │   ├── App.css          # Styles de l'application
│   │   └── index.js         # Point d'entrée React
│   └── package.json         # Dépendances frontend
│
└── README.md                 # Ce fichier
```

## 📧 Sections du Formulaire

1. **Informations Personnelles**
   - Nom, Prénom, Âge, Adresse

2. **Coordonnées**
   - Numéro de téléphone

3. **Informations Professionnelles et Financières**
   - Travail/Profession, Revenu mensuel

4. **Documents et Pièces Justificatives**
   - Carte d'identité/Passeport (PDF, JPG, PNG)
   - Photographie d'identité (JPG, PNG)

5. **Conditions d'Éligibilité**
   - Informations sur le numéro de téléphone dédié

6. **Consentement**
   - Case à cocher obligatoire

7. **Soumission**
   - Bouton de soumission (actif uniquement si conditions acceptées)

## 🔒 Validation et Sécurité

### Validation Frontend
- Tous les champs obligatoires sont vérifiés
- Validation du format des numéros de téléphone
- Validation de l'âge (18-100 ans)
- Validation des types de fichiers
- Limite de taille des fichiers (10MB max)

### Validation Backend
- Double validation de tous les champs
- Vérification des types MIME des fichiers
- Protection contre les uploads malveillants
- Nettoyage automatique des fichiers temporaires

## 📨 Envoi des Emails

Les emails sont envoyés à : **kontakt_finanzplusaustria@proton.me**

Format de l'email :
- Sujet : "Nouvelle demande de prêt - [Prénom] [Nom]"
- Corps : HTML formaté avec toutes les informations
- Pièces jointes : Documents d'identité et photo

## 🛠️ Technologies Utilisées

### Frontend
- React 18
- CSS3 (avec design responsive)
- Fetch API pour les requêtes HTTP

### Backend
- Node.js
- Express.js
- Nodemailer (envoi d'emails)
- Multer (gestion des uploads)
- CORS (communication cross-origin)
- dotenv (gestion des variables d'environnement)

## 🐛 Dépannage

### Le backend ne démarre pas
- Vérifiez que le port 5000 n'est pas déjà utilisé
- Assurez-vous que le fichier `.env` existe et est correctement configuré

### Les emails ne sont pas envoyés
- Vérifiez vos identifiants Proton Mail dans `.env`
- Assurez-vous d'utiliser un mot de passe d'application (pas votre mot de passe principal)
- Vérifiez que le port 587 n'est pas bloqué par votre firewall

### Erreur CORS
- Assurez-vous que le backend est démarré avant le frontend
- Vérifiez que l'URL du backend dans `App.js` est correcte (`http://localhost:5000`)

### Les fichiers ne s'uploadent pas
- Vérifiez que le dossier `backend/uploads/` existe
- Assurez-vous que les fichiers respectent les formats autorisés
- Vérifiez la taille des fichiers (max 10MB)

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (< 480px)
- 📱 Tablette (480px - 768px)
- 💻 Desktop (> 768px)

## 🔄 Workflow de Soumission

1. L'utilisateur remplit le formulaire
2. Validation en temps réel des champs
3. Upload des documents requis
4. Acceptation des conditions d'éligibilité
5. Activation du bouton de soumission
6. Envoi des données au backend
7. Validation côté serveur
8. Envoi de l'email avec pièces jointes
9. Nettoyage des fichiers temporaires
10. Message de confirmation à l'utilisateur

## 📄 Licence

© 2026 FinanzPlus Austria - Tous droits réservés

## 👨‍💻 Support

Pour toute question ou problème, contactez : kontakt_finanzplusaustria@proton.me

---

**Note importante :** Avant de déployer en production, assurez-vous de :
- Configurer des variables d'environnement sécurisées
- Utiliser HTTPS pour toutes les communications
- Implémenter une authentification si nécessaire
- Ajouter des limites de taux (rate limiting)
- Configurer un système de logs approprié