# 🚀 Guide de Déploiement - NetPro Suisse

## 📋 Prérequis

- Node.js 18+ installé
- Compte GitHub
- Compte Vercel (gratuit)
- Compte Supabase (gratuit)
- Domaine .ch acheté (Infomaniak recommandé)

---

## 🌐 Étape 1 : Domaine & DNS

### Acheter le domaine

1. Aller sur [Infomaniak](https://www.infomaniak.com/fr/domaines)
2. Chercher `netpro-suisse.ch` (ou variante disponible)
3. Acheter (~15 CHF/an)

### Configurer DNS

Ajouter ces enregistrements DNS :

```
Type    Nom     Valeur                  TTL
A       @       76.76.21.21             3600
CNAME   www     cname.vercel-dns.com    3600
```

---

## 🗄️ Étape 2 : Database (Supabase)

### Créer le projet

1. Aller sur [supabase.com](https://supabase.com)
2. Créer nouveau projet
3. Choisir région : Europe (Frankfurt recommended)
4. Noter les credentials :
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`

### Créer les tables

```sql
-- Table des leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Métadonnées
  locale VARCHAR(10) DEFAULT 'fr-CH',
  region VARCHAR(50) DEFAULT 'Suisse romande',
  page_path TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  -- Type de service
  service_type VARCHAR(50) NOT NULL,
  service_type_other TEXT,

  -- Détails du bien
  locality VARCHAR(100) NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  rooms VARCHAR(20) NOT NULL,
  approx_surface VARCHAR(20) NOT NULL,

  -- Timing
  move_out_date DATE,
  desired_date DATE,
  urgency VARCHAR(50) NOT NULL,

  -- Prestations
  extras JSONB NOT NULL,

  -- Notes & photos
  access_notes TEXT,
  photos JSONB,

  -- Coordonnées
  first_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact_preference VARCHAR(50) NOT NULL,
  time_window VARCHAR(50) NOT NULL,

  -- Consentements
  consent_partner_contact BOOLEAN DEFAULT TRUE,
  consent_privacy BOOLEAN DEFAULT TRUE,
  consent_marketing BOOLEAN DEFAULT FALSE,

  -- Scoring
  score INTEGER NOT NULL,
  tier VARCHAR(1) NOT NULL CHECK (tier IN ('A', 'B', 'C')),
  tags JSONB,

  -- Anti-spam
  honeypot TEXT DEFAULT '',
  time_to_submit_ms INTEGER,
  attempt_id UUID,
  rate_limited BOOLEAN DEFAULT FALSE,
  duplicate_check VARCHAR(20) DEFAULT 'none',

  -- Business
  partner_id UUID REFERENCES partners(id),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'sent', 'contacted', 'converted', 'lost')),
  sent_at TIMESTAMPTZ,
  price_chf DECIMAL(10,2)
);

-- Table des partenaires
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Infos entreprise
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),

  -- Localisation
  region TEXT[] DEFAULT '{}',

  -- Status
  status VARCHAR(20) DEFAULT 'trial' CHECK (status IN ('trial', 'active', 'paused', 'cancelled')),
  trial_ends_at TIMESTAMPTZ,

  -- Facturation
  total_leads INTEGER DEFAULT 0,
  total_revenue_chf DECIMAL(10,2) DEFAULT 0,
  balance_chf DECIMAL(10,2) DEFAULT 0
);

-- Table des événements
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  event_name VARCHAR(100) NOT NULL,
  lead_id UUID REFERENCES leads(id),
  payload JSONB,
  utm JSONB,
  variant VARCHAR(10)
);

-- Indexes pour performance
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_tier ON leads(tier);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_partner_id ON leads(partner_id);
CREATE INDEX idx_events_lead_id ON events(lead_id);
CREATE INDEX idx_events_created_at ON events(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies (à adapter selon auth)
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Partners can view their leads" ON leads FOR SELECT USING (partner_id = auth.uid());
```

---

## ☁️ Étape 3 : Déploiement Vercel

### Setup Git

```bash
cd lead-gen-nettoyage
git init
git add .
git commit -m "Initial commit - NetPro Suisse"

# Créer repo sur GitHub
gh repo create netpro-suisse --public --source=. --remote=origin --push
```

### Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Importer le repo GitHub
3. Ajouter les variables d'environnement :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_KEY=eyJxxxxx
RESEND_API_KEY=re_xxxxx
```

4. Déployer !

### Configurer domaine custom

Dans Vercel :
1. Settings → Domains
2. Ajouter `netpro-suisse.ch`
3. Suivre instructions DNS

---

## 📧 Étape 4 : Emails (Resend)

### Setup

1. Créer compte sur [resend.com](https://resend.com)
2. Vérifier domaine `netpro-suisse.ch`
3. Ajouter records DNS :

```
Type    Nom                             Valeur
TXT     resend._domainkey               (copier depuis Resend)
MX      @                               feedback-smtp.eu-west-1.amazonses.com
```

4. Créer API key → Copier dans Vercel env vars

### Tester email

```typescript
// pages/api/test-email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  await resend.emails.send({
    from: 'NetPro Suisse <no-reply@netpro-suisse.ch>',
    to: 'votre@email.com',
    subject: 'Test email',
    html: '<h1>Ça marche !</h1>'
  });

  res.json({ success: true });
}
```

---

## 🔄 Étape 5 : Migration du Code

### Passer de React/Vite à Next.js

```bash
# Créer nouveau projet Next.js
npx create-next-app@latest netpro-suisse-nextjs --typescript --tailwind --app

cd netpro-suisse-nextjs

# Copier les fichiers
cp -r ../lead-gen-nettoyage/src/components ./app/
cp -r ../lead-gen-nettoyage/src/lib ./lib/
cp -r ../lead-gen-nettoyage/src/styles ./app/

# Installer dépendances
npm install @supabase/supabase-js resend framer-motion react-hook-form zod
```

### Créer API Route

```typescript
// app/api/leads/route.ts
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { leadPayloadSchema } from '@/lib/validation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Valider avec Zod
    const validated = leadPayloadSchema.parse(body);

    // Sauvegarder dans Supabase
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        ...validated,
        utm_source: validated.utm.source,
        utm_medium: validated.utm.medium,
        utm_campaign: validated.utm.campaign,
        extras: validated.extras,
        tags: validated.leadScore.tags,
        score: validated.leadScore.score,
        tier: validated.leadScore.tier,
        photos: validated.photos,
      })
      .select()
      .single();

    if (error) throw error;

    // Trouver partenaire disponible pour cette région
    const { data: partner } = await supabase
      .from('partners')
      .select('*')
      .eq('status', 'active')
      .contains('region', [validated.locality])
      .limit(1)
      .single();

    // Envoyer email notification au partenaire
    if (partner) {
      await resend.emails.send({
        from: 'NetPro Suisse <leads@netpro-suisse.ch>',
        to: partner.email,
        subject: `Nouveau Lead Tier ${validated.leadScore.tier} - ${validated.locality}`,
        html: generateEmailHTML(validated),
      });

      // Mettre à jour le lead
      await supabase
        .from('leads')
        .update({
          partner_id: partner.id,
          status: 'sent',
          sent_at: new Date().toISOString(),
          price_chf: getTierPrice(validated.leadScore.tier),
        })
        .eq('id', lead.id);
    }

    return NextResponse.json({ success: true, leadId: lead.id });

  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}

function getTierPrice(tier: string): number {
  return tier === 'A' ? 75 : tier === 'B' ? 35 : 15;
}

function generateEmailHTML(lead: any): string {
  // Charger le template email-templates/new-lead-notification.html
  // Et remplacer les variables {{VARIABLE}}
  // Pour MVP, faire un simple HTML inline
  return `<html>...</html>`;
}
```

---

## 📊 Étape 6 : Analytics

### Google Analytics 4

1. Créer propriété sur [analytics.google.com](https://analytics.google.com)
2. Noter le `MEASUREMENT_ID` (G-XXXXXXXXXX)
3. Ajouter dans `app/layout.tsx` :

```typescript
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Facebook Pixel

```typescript
<Script id="facebook-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
    fbq('track', 'PageView');
  `}
</Script>
```

---

## ✅ Checklist de Lancement

### Technique
- [ ] Frontend déployé sur Vercel
- [ ] Database Supabase opérationnelle
- [ ] API routes fonctionnelles
- [ ] Emails Resend configurés
- [ ] Analytics (GA4 + FB Pixel)
- [ ] Domaine SSL actif
- [ ] Formulaire testé end-to-end

### Légal
- [ ] CGV rédigées
- [ ] Politique de confidentialité (LPD compliant)
- [ ] Mentions légales
- [ ] Contrat partenaire

### Marketing
- [ ] Google Ads configuré
- [ ] Facebook Ads configuré
- [ ] Google My Business créé
- [ ] Profils sociaux (LinkedIn, Instagram)

### Business
- [ ] Liste 100 entreprises prospects
- [ ] Email de prospection prêt
- [ ] Pitch deck partenaires (5 slides)
- [ ] Dashboard partenaire basique

---

## 🐛 Troubleshooting

### Lead ne s'enregistre pas
- Vérifier Supabase policies (RLS)
- Checker console browser pour erreurs
- Vérifier API route logs dans Vercel

### Email ne part pas
- Vérifier DNS records Resend
- Checker API key validity
- Tester avec `curl` l'API Resend

### Performance lente
- Activer edge caching Vercel
- Optimiser images (next/image)
- Lazy load composants lourds

---

## 📞 Support

**Questions technique** : Consulter ce guide d'abord
**Database issues** : Supabase docs
**Email issues** : Resend docs
**Hosting issues** : Vercel docs

---

**Dernière mise à jour** : Janvier 2026
