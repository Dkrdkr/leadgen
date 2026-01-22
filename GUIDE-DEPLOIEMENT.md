# Guide de déploiement complet 🚀

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Configuration locale](#configuration-locale)
3. [Déploiement sur GitHub](#déploiement-sur-github)
4. [Déploiement sur Vercel](#déploiement-sur-vercel)
5. [Configuration domaine custom](#configuration-domaine-custom)
6. [Variables d'environnement](#variables-denvironnement)
7. [Accès admin](#accès-admin)
8. [FAQ et troubleshooting](#faq-et-troubleshooting)

---

## 🎯 Prérequis

### Comptes nécessaires (tous gratuits)

1. **GitHub** - https://github.com/signup
   - Pour héberger le code source
   - Gratuit illimité

2. **Vercel** - https://vercel.com/signup
   - Pour l'hébergement du site
   - Plan gratuit: illimité, 100 GB bandwidth/mois, SSL auto
   - Se connecter avec GitHub

3. **Nom de domaine** (que vous avez déjà ✅)
   - Ex: votre-domaine.ch

---

## 🔧 Configuration locale

### 1. Créer le fichier .env

```bash
# Dans le dossier lead-gen-nettoyage/
cp .env.example .env
```

### 2. Éditer `.env` avec vos paramètres

```env
# Code d'accès admin (changez-le!)
VITE_ADMIN_ACCESS_CODE=MonCodeSecret2026!

# URL de votre site (à mettre à jour après déploiement)
VITE_SITE_URL=https://votre-domaine.ch

# Email pour recevoir les notifications (optionnel)
VITE_ADMIN_EMAIL=votre@email.com
```

### 3. Tester en local

```bash
npm run dev
```

Tester les pages :
- Homepage: http://localhost:5173/
- Pages villes: http://localhost:5173/geneve
- Admin: http://localhost:5173/?admin=1
  - Code par défaut: `ADMIN2026` (ou celui dans `.env`)

---

## 📦 Déploiement sur GitHub

### 1. Initialiser Git (si pas déjà fait)

```bash
cd c:\Users\darko\tradingview-scripts\lead-gen-nettoyage
git init
git add .
git commit -m "Initial commit - Lead gen platform with SEO"
```

### 2. Créer le repository sur GitHub

1. Aller sur https://github.com/new
2. Nom du repo: `lead-gen-nettoyage` (ou autre nom)
3. Description: "Lead generation platform for cleaning services in Switzerland"
4. **Privé** ou **Public** : votre choix
5. Ne pas initialiser avec README/gitignore (déjà fait en local)
6. Cliquer **Create repository**

### 3. Pusher le code

GitHub va vous donner des commandes comme :

```bash
git remote add origin https://github.com/VotreUsername/lead-gen-nettoyage.git
git branch -M main
git push -u origin main
```

Copiez-collez ces commandes dans votre terminal.

✅ Votre code est maintenant sur GitHub !

---

## 🚀 Déploiement sur Vercel

### 1. Créer un compte Vercel

1. Aller sur https://vercel.com/signup
2. **Cliquer sur "Continue with GitHub"**
3. Autoriser Vercel à accéder à GitHub

### 2. Importer le projet

1. Sur le dashboard Vercel, cliquer **"Add New... → Project"**
2. Sélectionner votre repo `lead-gen-nettoyage`
3. Vercel détecte automatiquement Vite
4. **Configuration du projet** :
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Configurer les variables d'environnement

**IMPORTANT** : Dans la section "Environment Variables" sur Vercel :

```
VITE_ADMIN_ACCESS_CODE = VotreCodeSecret2026!
VITE_SITE_URL = https://votre-domaine.ch
VITE_ADMIN_EMAIL = votre@email.com
```

### 4. Déployer

1. Cliquer **Deploy**
2. Attendre 1-2 minutes
3. ✅ Site déployé !

Vercel vous donne une URL temporaire : `https://lead-gen-nettoyage-xxx.vercel.app`

---

## 🌐 Configuration domaine custom

### Option 1 : Domaine Vercel (temporaire)

Votre site est déjà accessible via :
```
https://lead-gen-nettoyage-xxx.vercel.app
```

Testez avant de configurer le domaine custom.

### Option 2 : Configurer votre domaine .ch

#### Sur Vercel

1. Aller dans votre projet → **Settings → Domains**
2. Ajouter votre domaine : `votre-domaine.ch`
3. Vercel vous donne des records DNS à configurer

#### Chez votre registrar (.ch)

Vous aurez 2 options :

**Option A - Nameservers (recommandé)**
Si Vercel propose des nameservers :
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```
Remplacer vos nameservers actuels par ceux de Vercel.

**Option B - Records DNS (si nameservers pas disponibles)**
Ajouter ces records DNS :

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

⏱️ **Propagation DNS** : 5 minutes à 48h (généralement < 1h)

### Vérifier que ça fonctionne

```bash
# Tester la propagation DNS
nslookup votre-domaine.ch

# Ou en ligne
https://www.whatsmydns.net/#A/votre-domaine.ch
```

Une fois propagé, votre site sera accessible sur `https://votre-domaine.ch` avec SSL automatique ! 🎉

---

## 🔐 Variables d'environnement

### Variables disponibles

| Variable | Description | Obligatoire | Exemple |
|----------|-------------|-------------|---------|
| `VITE_ADMIN_ACCESS_CODE` | Code d'accès admin | ✅ Oui | `MonSecret2026!` |
| `VITE_SITE_URL` | URL du site en production | ✅ Oui | `https://votre-domaine.ch` |
| `VITE_ADMIN_EMAIL` | Email admin (futur) | ❌ Non | `contact@domaine.ch` |

### Changer le code admin après déploiement

1. Aller sur Vercel → votre projet → **Settings → Environment Variables**
2. Modifier `VITE_ADMIN_ACCESS_CODE`
3. Cliquer **Save**
4. Aller dans **Deployments** → **Redeploy** (bouton ••• → Redeploy)
5. Le nouveau code sera actif en ~1 minute

---

## 👨‍💼 Accès admin

### URL d'accès

```
https://votre-domaine.ch/?admin=1
```

### Authentification

1. **Code d'accès** : celui défini dans `VITE_ADMIN_ACCESS_CODE`
   - Par défaut en local : `ADMIN2026`
   - En production : celui que vous avez défini sur Vercel

2. **Sécurité** :
   - Session valide 24h
   - Max 5 tentatives échouées
   - Blocage 15 minutes après 5 échecs
   - Stockage sécurisé dans localStorage

### Fonctionnalités admin

✅ **Voir tous les leads** avec filtres (Tier A/B/C, tri par qualité/date)
✅ **Stats en temps réel** (total, aujourd'hui, score moyen)
✅ **Export CSV simple** (colonnes essentielles)
✅ **Export Excel détaillé** (toutes les données + technique)
✅ **Export JSON** (format brut)
✅ **Copier dans presse-papier**
✅ **Voir détails** de chaque lead (modal avec JSON)
✅ **Supprimer** un lead individuel
✅ **Tout supprimer** (avec confirmation)
✅ **Déconnexion sécurisée**

### Limitations actuelles

⚠️ **Stockage local** : Les données sont dans le navigateur (localStorage)
- Pas de synchro entre appareils
- Exportez régulièrement !

📅 **Futur (Supabase)** : Base de données PostgreSQL cloud pour synchro multi-appareils

---

## 📊 Exporter les leads régulièrement

### Recommandation

Exportez vos leads **au moins 1x/semaine** :

1. Aller sur `/?admin=1`
2. Cliquer **"Excel"** pour export détaillé
3. Sauvegarder le fichier dans un dossier sécurisé

### Format Excel (recommandé)

Le fichier contient :
- Toutes les infos de contact
- Détails du bien
- Score et tags qualité
- Données UTM et tracking
- Temps de soumission

Ouvrir avec Excel/Google Sheets/LibreOffice.

---

## 🔍 FAQ et Troubleshooting

### Le site ne build pas sur Vercel

**Erreur** : `Build failed`

**Solutions** :
1. Vérifier que `package.json` est correct
2. Dans Vercel Settings :
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Vérifier les logs d'erreur Vercel

### Les pages ville (/geneve) ne fonctionnent pas

**Erreur** : 404 sur `/geneve`

**Solution** : Vérifier que `vercel.json` est bien présent :
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Le code admin ne fonctionne pas

**Erreur** : Code refusé

**Solutions** :
1. Vérifier `VITE_ADMIN_ACCESS_CODE` dans Vercel Environment Variables
2. Redéployer après changement de variable
3. Vider le cache navigateur (Ctrl+Shift+R)
4. Vérifier dans DevTools Console si erreurs JS

### Les leads disparaissent

**Cause** : localStorage effacé (cache navigateur vidé)

**Solution** : Exporter régulièrement en CSV/Excel !

**Futur** : Migration vers Supabase pour persistance cloud

### Le formulaire ne se soumet pas

**Erreur** : Bouton submit ne fait rien

**Solutions** :
1. Ouvrir DevTools Console (F12)
2. Vérifier erreurs JS
3. Vérifier que tous les champs requis sont remplis
4. Tester sur un autre navigateur

### SSL ne fonctionne pas

**Erreur** : Site accessible en HTTP seulement

**Solution** : Vercel configure SSL automatiquement mais ça peut prendre 5-10 min après ajout du domaine. Si après 1h ça ne fonctionne toujours pas :
1. Vérifier que DNS pointe bien vers Vercel
2. Aller dans Settings → Domains → Refresh SSL

---

## 🎓 Commandes utiles

### Développement local

```bash
# Lancer le dev server
npm run dev

# Lancer avec --host (accès depuis téléphone)
npm run dev -- --host

# Build de production
npm run build

# Preview de la build
npm run preview

# Vérifier TypeScript
npm run lint
```

### Git workflow

```bash
# Statut des fichiers modifiés
git status

# Ajouter tous les changements
git add .

# Commit
git commit -m "Description des changements"

# Push vers GitHub (déclenche auto-deploy Vercel)
git push

# Voir l'historique
git log --oneline

# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite
```

### Vercel CLI (optionnel)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer depuis local
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs
```

---

## 🚀 Prochaines étapes

### Étape 1 : Tester en production

1. ✅ Site déployé sur Vercel
2. ✅ Domaine custom configuré
3. ✅ Admin accessible avec code
4. ✅ Formulaire fonctionne
5. ✅ Export CSV/Excel fonctionne

### Étape 2 : SEO (déjà fait ✅)

1. ✅ Soumettre sitemap à Google Search Console
   - URL sitemap: `https://votre-domaine.ch/sitemap.xml`
2. ✅ Vérifier indexation des 7 pages (homepage + 6 villes)
3. ✅ Configurer Google Analytics (optionnel)

### Étape 3 : Marketing

1. **Google Ads** (rapide, payant)
   - Lancer campagne sur mots-clés locaux
   - Budget test : 200-300 CHF
   - Premiers leads sous 1 semaine

2. **SEO organique** (gratuit, lent)
   - Attendre indexation (1-3 semaines)
   - Premiers résultats 3-6 mois
   - Voir [SEO-GUIDE.md](SEO-GUIDE.md)

3. **Backlinks locaux**
   - local.ch
   - search.ch
   - Forums locataires suisse

### Étape 4 : Supabase (futur)

Pour synchro cloud des leads :
1. Créer compte Supabase gratuit
2. Configurer PostgreSQL
3. Migrer storage localStorage → Supabase
4. Auth admin via Supabase Auth

(Guide Supabase à venir)

---

## 📞 Support

### Ressources

- **Documentation Vercel** : https://vercel.com/docs
- **Documentation Vite** : https://vitejs.dev/
- **React Helmet Async** : https://github.com/staylor/react-helmet-async
- **Framer Motion** : https://www.framer.com/motion/

### Problèmes ?

1. Vérifier les logs Vercel (Deployments → cliquer sur deploy → View Function Logs)
2. Vérifier DevTools Console (F12) pour erreurs JS
3. Tester en mode incognito (cache)
4. Vider localStorage si nécessaire : `localStorage.clear()` dans Console

---

## ✅ Checklist finale avant lancement

- [ ] Code poussé sur GitHub
- [ ] Projet déployé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Domaine custom configuré et SSL actif
- [ ] Page admin accessible avec le bon code
- [ ] Formulaire testé et leads enregistrés
- [ ] Export CSV/Excel testé
- [ ] Toutes les pages ville testées (/geneve, /lausanne, etc.)
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configuré
- [ ] Google Search Console configuré
- [ ] Google Analytics configuré (optionnel)

---

**Félicitations ! 🎉 Votre plateforme est en ligne !**

Domaine : https://votre-domaine.ch
Admin : https://votre-domaine.ch/?admin=1

Bon lancement ! 🚀
