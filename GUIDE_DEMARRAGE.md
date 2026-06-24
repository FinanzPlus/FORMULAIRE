# 🚀 Guide de Démarrage Rapide - FinanzPlus Austria

Ce guide vous aidera à démarrer rapidement l'application de formulaire d'éligibilité au prêt.

## ⚡ Démarrage Rapide (5 minutes)

### Étape 1 : Configuration de l'Email Backend

1. Ouvrez le fichier `backend/.env.example`
2. Copiez-le et renommez-le en `backend/.env`
3. Remplissez vos informations Proton Mail :

```env
PORT=5000
EMAIL_HOST=smtp.protonmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@proton.me
EMAIL_PASS=votre_mot_de_passe_application
```

**Comment obtenir un mot de passe d'application Proton Mail :**
- Connectez-vous à Proton Mail
- Paramètres → Sécurité et confidentialité
- Créez un mot de passe d'application
- Copiez-le dans le fichier `.env`

### Étape 2 : Démarrer le Backend

Ouvrez un terminal et exécutez :

```bash
cd backend
node server.js
```

Vous devriez voir :
```
🚀 Serveur FinanzPlus Austria démarré sur le port 5000
📧 Email de destination: kontakt_finanzplusaustria@proton.me
```

### Étape 3 : Démarrer le Frontend

Ouvrez un **nouveau terminal** et exécutez :

```bash
cd frontend
npm start
```

Le navigateur s'ouvrira automatiquement sur `http://localhost:3000`

## ✅ Test du Formulaire

### Données de Test

Utilisez ces données pour tester le formulaire :

**Informations Personnelles :**
- Nom : `Müller`
- Prénom : `Hans`
- Âge : `35`
- Adresse : `Hauptstraße 123, 1010 Wien, Austria`

**Coordonnées :**
- Téléphone : `+43 664 123 4567`

**Informations Professionnelles :**
- Profession : `Ingénieur Logiciel`
- Revenu mensuel : `3500`

**Documents :**
- Créez un fichier PDF ou JPG de test pour la carte d'identité
- Créez une image JPG de test pour la photo

**Consentement :**
- ✓ Cochez "J'accepte les conditions d'éligibilité"

### Vérification

1. Remplissez tous les champs
2. Uploadez les documents
3. Cochez la case de consentement
4. Cliquez sur "Soumettre ma demande"
5. Vérifiez que vous recevez un message de succès
6. Vérifiez votre boîte email `kontakt_finanzplusaustria@proton.me`

## 🐛 Problèmes Courants

### Le backend ne démarre pas

**Erreur : Port 5000 déjà utilisé**
```bash
# Solution : Changez le port dans backend/.env
PORT=5001
```

**Erreur : Module non trouvé**
```bash
# Solution : Réinstallez les dépendances
cd backend
npm install
```

### Les emails ne sont pas envoyés

**Vérifications :**
1. Le fichier `backend/.env` existe et contient vos identifiants
2. Vous utilisez un mot de passe d'application (pas votre mot de passe principal)
3. Le backend affiche "Serveur démarré" sans erreur

**Test de connexion email :**
```bash
# Dans le terminal du backend, vérifiez les logs
# Si vous voyez "Erreur lors de la soumission", vérifiez vos identifiants
```

### Erreur CORS

**Symptôme :** Message d'erreur dans la console du navigateur

**Solution :**
1. Assurez-vous que le backend est démarré AVANT le frontend
2. Vérifiez que l'URL dans `frontend/src/App.js` est `http://localhost:5000`

### Les fichiers ne s'uploadent pas

**Vérifications :**
1. Le dossier `backend/uploads/` existe
2. Les fichiers sont au format PDF, JPG ou PNG
3. Les fichiers font moins de 10MB

## 📱 Test sur Mobile

Pour tester sur mobile :

1. Trouvez l'adresse IP de votre ordinateur :
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Modifiez l'URL dans `frontend/src/App.js` :
   ```javascript
   // Remplacez localhost par votre IP
   const response = await fetch('http://192.168.1.X:5000/api/submit-application', {
   ```

3. Sur votre mobile, accédez à `http://192.168.1.X:3000`

## 🎨 Personnalisation

### Changer les Couleurs

Éditez `frontend/src/App.css` :

```css
/* Ligne 6 : Gradient de fond */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Ligne 30 : Gradient du header */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Changer l'Email de Destination

Éditez `backend/server.js` ligne 102 :

```javascript
to: 'votre_nouveau_email@example.com',
```

## 📊 Structure des Fichiers Importants

```
FORMULAIRE/
├── backend/
│   ├── server.js          ← API et logique d'envoi d'email
│   ├── .env              ← Configuration (à créer)
│   └── uploads/          ← Fichiers temporaires
│
├── frontend/
│   └── src/
│       ├── App.js        ← Formulaire React
│       └── App.css       ← Styles
│
└── README.md             ← Documentation complète
```

## 🔄 Workflow de Développement

1. **Modifier le formulaire** : Éditez `frontend/src/App.js`
2. **Modifier les styles** : Éditez `frontend/src/App.css`
3. **Modifier l'API** : Éditez `backend/server.js`
4. **Tester** : Les changements se rechargent automatiquement

## 📞 Support

Si vous rencontrez des problèmes :

1. Consultez le fichier `README.md` pour plus de détails
2. Vérifiez les logs dans les terminaux backend et frontend
3. Contactez : kontakt_finanzplusaustria@proton.me

## ✨ Prochaines Étapes

Une fois que tout fonctionne :

1. ✅ Testez avec de vraies données
2. ✅ Vérifiez la réception des emails
3. ✅ Testez sur différents appareils (mobile, tablette, desktop)
4. ✅ Personnalisez les couleurs et le design si nécessaire
5. ✅ Préparez le déploiement en production

---

**Bon développement ! 🚀**