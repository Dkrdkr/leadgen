# 🚀 Déployer MAINTENANT - Checklist rapide

## ✅ Tout est prêt !

Votre plateforme est **100% prête** à être déployée. Voici les étapes à suivre maintenant.

---

## 📝 Étape 1 : Préparer l'environnement (2 minutes)

### 1.1 Créer le fichier .env

```bash
# Dans le terminal, à la racine du projet
cp .env.example .env
```

### 1.2 Éditer le .env

Ouvrir `.env` et changer le code admin :

```env
VITE_ADMIN_ACCESS_CODE=VotreCodeSecret2026!
VITE_SITE_URL=https://votre-domaine.ch
VITE_ADMIN_EMAIL=votre@email.com
```

⚠️ **IMPORTANT** : Changez `VotreCodeSecret2026!` par un code sécurisé unique !

---

## 🐙 Étape 2 : Push sur GitHub (5 minutes)

### 2.1 Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Lead gen platform ready for production"
```

### 2.2 Créer le repo sur GitHub

1. Aller sur https://github.com/new
2. Nom : `lead-gen-nettoyage` (ou autre)
3. **Privé** recommandé
4. Ne PAS initialiser avec README
5. Cliquer **Create repository**

### 2.3 Pusher le code

GitHub vous donnera des commandes. Exemple :

```bash
git remote add origin https://github.com/VotreUsername/lead-gen-nettoyage.git
git branch -M main
git push -u origin main
```

✅ **Code sur GitHub !**

---

## 🌐 Étape 3 : Déployer sur Vercel (3 minutes)

### 3.1 Créer compte Vercel

1. Aller sur https://vercel.com/signup
2. **Continue with GitHub**
3. Autoriser Vercel

### 3.2 Importer le projet

1. Dashboard Vercel → **Add New... → Project**
2. Sélectionner `lead-gen-nettoyage`
3. Configuration auto-détectée :
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

### 3.3 Ajouter les variables d'environnement

⚠️ **CRITIQUE** : Dans "Environment Variables" :

```
Name: VITE_ADMIN_ACCESS_CODE
Value: VotreCodeSecret2026!

Name: VITE_SITE_URL
Value: https://votre-domaine.ch

Name: VITE_ADMIN_EMAIL
Value: votre@email.com
```

### 3.4 Déployer

Cliquer **Deploy** → Attendre 1-2 min

✅ **Site en ligne !**

URL temporaire : `https://lead-gen-nettoyage-xxx.vercel.app`

---

## 🌍 Étape 4 : Configurer votre domaine (10-60 min)

### 4.1 Sur Vercel

1. Projet → **Settings → Domains**
2. Ajouter : `votre-domaine.ch`
3. Vercel affiche les DNS à configurer

### 4.2 Chez votre registrar

**Option A - Nameservers (recommandé)** :
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B - Records DNS** :
```
Type A : @ → 76.76.21.21
Type CNAME : www → cname.vercel-dns.com
```

⏱️ Propagation : 5min à 48h (souvent < 1h)

✅ **Site accessible sur votre domaine avec SSL !**

---

## 🔐 Étape 5 : Tester l'admin (2 minutes)

### 5.1 Accéder à l'admin

```
https://votre-domaine.ch/?admin=1
```

### 5.2 Se connecter

Code : celui défini dans `VITE_ADMIN_ACCESS_CODE`

### 5.3 Tester

- ✅ Login fonctionne
- ✅ Dashboard s'affiche
- ✅ Stats à 0 (normal, pas encore de leads)
- ✅ Boutons export désactivés (normal, aucun lead)

---

## 📊 Étape 6 : SEO - Google Search Console (10 minutes)

### 6.1 Créer compte Google Search Console

1. Aller sur https://search.google.com/search-console
2. Ajouter propriété : `votre-domaine.ch`
3. Méthode verification : **Balise HTML** ou **Fichier HTML**

### 6.2 Soumettre le sitemap

Une fois vérifié :

1. Menu **Sitemaps**
2. Ajouter : `https://votre-domaine.ch/sitemap.xml`
3. Cliquer **Soumettre**

✅ Google va indexer vos 7 pages (homepage + 6 villes)

---

## 🎯 Étape 7 : Premier test utilisateur (5 minutes)

### 7.1 Remplir le formulaire

1. Aller sur `https://votre-domaine.ch`
2. Cliquer "Trouver mon entreprise"
3. Remplir le formulaire (toutes les étapes)
4. Soumettre

### 7.2 Vérifier dans l'admin

1. Aller sur `/?admin=1`
2. Le lead devrait apparaître
3. Vérifier :
   - ✅ Tier A/B/C assigné
   - ✅ Score calculé
   - ✅ Toutes les données présentes

### 7.3 Tester l'export

1. Cliquer **"Excel"**
2. Fichier CSV téléchargé
3. Ouvrir avec Excel/Google Sheets
4. ✅ Toutes les colonnes présentes

---

## 🎉 C'EST EN LIGNE !

### Votre site est maintenant :

✅ **Déployé** sur Vercel avec SSL
✅ **Accessible** sur votre domaine custom
✅ **Optimisé SEO** avec 6 pages locales
✅ **Admin sécurisé** avec code d'accès
✅ **Export Excel/CSV** fonctionnel
✅ **Formulaire** avec validation et anti-spam
✅ **Scoring qualité** automatique des leads

---

## 📈 Prochaines étapes marketing

### Option 1 : Google Ads (rapide, payant)

**Pour** : Premiers leads sous 1 semaine
**Budget** : 200-300 CHF test
**ROI** : 30-80 CHF/lead revendu

#### Campagne test

**Mots-clés** :
- nettoyage fin de bail genève
- nettoyage fin de bail lausanne
- récupérer caution suisse

**Landing pages** :
- /geneve pour Genève
- /lausanne pour Lausanne
- / pour autres

### Option 2 : SEO (gratuit, lent)

**Pour** : Traffic gratuit long terme
**Délai** : 3-6 mois pour résultats
**ROI** : Illimité une fois positionné

✅ Déjà optimisé !
✅ Sitemap soumis
✅ 6 pages locales

Voir [SEO-GUIDE.md](SEO-GUIDE.md) pour stratégie détaillée.

---

## 🔧 Maintenance

### Exporter les leads régulièrement

⚠️ **Critique** : localStorage peut être effacé

**Fréquence recommandée** : 1x/semaine minimum

1. Aller sur `/?admin=1`
2. Cliquer **"Excel"**
3. Sauvegarder dans un dossier sécurisé

### Changer le code admin

Si compromis :

1. Vercel → Settings → Environment Variables
2. Modifier `VITE_ADMIN_ACCESS_CODE`
3. Redéployer

Nouveau code actif en 1-2 min.

---

## 📞 Support

### Documentation complète

- [GUIDE-DEPLOIEMENT.md](GUIDE-DEPLOIEMENT.md) - Guide détaillé
- [SEO-GUIDE.md](SEO-GUIDE.md) - Stratégie SEO complète
- [COMMENT-TESTER-SEO.md](COMMENT-TESTER-SEO.md) - Tests locaux

### Problème ?

1. Vérifier logs Vercel (Deployments → View Logs)
2. Vérifier DevTools Console (F12)
3. Tester en incognito
4. Vider localStorage : `localStorage.clear()` dans Console

---

## ✅ Checklist finale

- [ ] .env créé avec code admin unique
- [ ] Code pushé sur GitHub
- [ ] Projet déployé sur Vercel
- [ ] Variables env configurées sur Vercel
- [ ] Domaine custom configuré
- [ ] SSL actif (cadenas vert)
- [ ] Admin accessible avec code
- [ ] Formulaire testé (1 lead créé)
- [ ] Export Excel testé et fonctionnel
- [ ] Google Search Console configuré
- [ ] Sitemap soumis
- [ ] 6 pages ville testées

---

**🎊 FÉLICITATIONS ! Votre plateforme est en production !**

**Liens importants** :
- Site : https://votre-domaine.ch
- Admin : https://votre-domaine.ch/?admin=1
- Vercel Dashboard : https://vercel.com/dashboard

**Bon lancement ! 🚀**

---

## 💡 Pro Tips

### Sécurité

- ✅ Ne jamais partager le code admin publiquement
- ✅ Exporter les leads régulièrement
- ✅ Utiliser un code complexe (lettres, chiffres, symboles)
- ✅ Changer le code tous les 3-6 mois

### Performance

- ✅ Vérifier Lighthouse score (F12 → Lighthouse)
- ✅ Tester vitesse : https://pagespeed.web.dev/
- ✅ Vérifier mobile : https://search.google.com/test/mobile-friendly

### SEO

- ✅ Suivre positions mots-clés (Google Search Console)
- ✅ Vérifier indexation des 7 pages
- ✅ Créer Google My Business par ville
- ✅ Obtenir backlinks locaux (local.ch, search.ch)

### Analytics (optionnel)

Ajouter Google Analytics 4 :

1. Créer propriété GA4
2. Obtenir Measurement ID : `G-XXXXXXXXXX`
3. Ajouter variable Vercel : `VITE_GA_ID`
4. Redéployer

---

**Des questions ? Tout est dans les guides ! 📚**
