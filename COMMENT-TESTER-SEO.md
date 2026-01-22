# Comment tester les pages SEO en local

## 🖥️ Serveur dev actuellement actif

Votre serveur Vite avec `--host` tourne sur:
- **Local**: http://localhost:5173/
- **Network**: http://192.168.1.93:5173/

## 📍 URLs des pages ville à tester

### Important
Vite dev server ne gère PAS automatiquement le routing par path (comme `/geneve`).
Par défaut, toutes ces URLs vont charger l'app React, mais le routing custom dans App.tsx
va détecter le path et afficher la bonne page.

### Pages ville SEO (6 pages)

1. **Genève**
   - URL dev: http://localhost:5173/geneve
   - Vérifier: Title = "Nettoyage fin de bail Genève | Récupérez votre caution à 100%"
   - H1 = "Nettoyage fin de bail à Genève — Trouvez l'entreprise parfaite"

2. **Lausanne**
   - URL dev: http://localhost:5173/lausanne
   - Vérifier: Coverage zones (Renens, Pully, Prilly, etc.)

3. **Canton de Vaud**
   - URL dev: http://localhost:5173/vaud
   - Vérifier: Mention Morges, Nyon, Yverdon, Montreux

4. **Valais**
   - URL dev: http://localhost:5173/valais
   - Vérifier: Mention Sion, Martigny, Monthey

5. **Fribourg**
   - URL dev: http://localhost:5173/fribourg
   - Vérifier: Mention "Service bilingue FR/DE"

6. **Neuchâtel**
   - URL dev: http://localhost:5173/neuchatel
   - Vérifier: La Chaux-de-Fonds, Le Locle

### Page d'accueil

- URL dev: http://localhost:5173/
- Vérifier: Section "Trouvez votre entreprise locale" avec les 6 villes

### Pages spéciales (existantes)

- Admin: http://localhost:5173/?admin=1
- Thank you: http://localhost:5173/?thankyou=1
- Partners: http://localhost:5173/?partners=1

---

## ✅ Checklist de vérification par page ville

Pour chaque page, vérifier dans les DevTools:

### 1. Meta tags (F12 → Elements → <head>)
```html
<title>Nettoyage fin de bail [Ville] | ...</title>
<meta name="description" content="..." />
<meta name="keywords" content="..." />
<link rel="canonical" href="https://nettoyage-suisse.ch/[ville]" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
```

### 2. Schema.org JSON-LD (F12 → Elements → <head>)
Chercher les balises:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "LocalBusiness", ... },
    { "@type": "FAQPage", ... },
    { "@type": "Service", ... }
  ]
}
</script>
```

### 3. Contenu visible
- ✅ Badge "Service spécialisé [Ville] · Canton de [Canton]"
- ✅ H1 avec nom de la ville
- ✅ Section "Pourquoi choisir une entreprise spécialisée [Ville] ?"
- ✅ Liste "Zones couvertes à [Ville]" avec 10 communes
- ✅ Formulaire de lead présent
- ✅ FAQ présente
- ✅ Footer présent

### 4. Breadcrumb
```
Accueil / [Ville]
```

### 5. Internal links
Vérifier que tous les liens internes fonctionnent:
- Lien "Accueil" dans breadcrumb → retour à `/`
- CTA "Trouver mon entreprise à [Ville]" → scroll vers formulaire

---

## 🔧 Si une page ne s'affiche pas correctement

### Problème 1: Page blanche
**Cause**: Erreur React dans CityLanding.tsx
**Solution**: Ouvrir F12 → Console et vérifier les erreurs

### Problème 2: Page affiche la homepage au lieu de la page ville
**Cause**: Routing dans App.tsx ne détecte pas le path
**Solution**: Vérifier que le path est bien dans `getAllCitySlugs()`

### Problème 3: Meta tags ne changent pas
**Cause**: react-helmet-async pas initialisé
**Solution**: Vérifier que `<HelmetProvider>` est bien dans App.tsx

---

## 🚀 Test de production (après build)

### 1. Builder le projet
```bash
npm run build
```

### 2. Preview la build
```bash
npm run preview
```

### 3. Tester les URLs
Le preview server devrait gérer le routing correctement.
Si ce n'est pas le cas, il faudra configurer le serveur de production (Vercel, Netlify, etc.)
pour rediriger toutes les routes vers index.html (SPA fallback).

---

## 📊 Validation SEO (outils en ligne)

Une fois en production, tester avec:

### Google Rich Results Test
- URL: https://search.google.com/test/rich-results
- Entrer l'URL de chaque page ville
- Vérifier que LocalBusiness et FAQPage sont détectés

### Google Mobile-Friendly Test
- URL: https://search.google.com/test/mobile-friendly
- Vérifier que toutes les pages sont mobile-friendly

### Schema.org Validator
- URL: https://validator.schema.org/
- Coller le code source de chaque page
- Vérifier qu'il n'y a pas d'erreurs de schema

---

## 🎯 Configuration serveur production

### Important pour le routing

Si vous déployez sur:

#### Vercel
Créer un fichier `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Netlify
Créer un fichier `public/_redirects`:
```
/*    /index.html   200
```

#### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📝 Résumé

✅ **6 pages ville** optimisées SEO créées
✅ **Page d'accueil** avec liens internes vers toutes les villes
✅ **Schema.org** complet (LocalBusiness, FAQPage, Service)
✅ **Meta tags** uniques par page
✅ **Sitemap.xml** généré
✅ **Robots.txt** configuré
✅ **SEO-GUIDE.md** avec stratégie complète

**Prochaine étape**: Tester en local, puis déployer et soumettre à Google Search Console.

Bon test! 🚀
