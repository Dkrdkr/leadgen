export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogLocale?: string;
}

export const defaultSEO: SEOConfig = {
  title: "Nettoyage fin de bail Suisse romande | Trouvez LA meilleure entreprise",
  description:
    "Algorithme intelligent qui analyse vos besoins et trouve L'entreprise de nettoyage parfaite parmi nos partenaires certifiés ✓ 1 seul contact ✓ Genève, Lausanne, Vaud, Valais ✓ Devis gratuit 24h",
  canonical: window.location.origin,
  ogTitle: "Nettoyage fin de bail Suisse romande - Matching intelligent",
  ogDescription:
    "Notre système analyse vos besoins concrets et sélectionne automatiquement LA meilleure entreprise de nettoyage certifiée pour votre situation. Pas de spam, que de la pertinence.",
  ogType: "website",
  ogLocale: "fr_CH",
};

export const thankYouSEO: SEOConfig = {
  title: "Demande envoyée avec succès | Nettoyage Suisse romande",
  description:
    "Votre demande a été transmise à une entreprise partenaire. Vous serez contacté(e) prochainement.",
  canonical: `${window.location.origin}/?thankyou=1`,
  ogTitle: "Demande envoyée avec succès",
  ogType: "website",
  ogLocale: "fr_CH",
};

export const adminSEO: SEOConfig = {
  title: "Admin - Gestion des leads",
  description: "Interface d'administration locale pour la gestion des leads",
  canonical: `${window.location.origin}/?admin=1`,
  ogType: "website",
};

export function getSchemaOrgData() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Plateforme de mise en relation nettoyage fin de bail",
    description:
      "Service de qualification et transmission de demandes de nettoyage à des entreprises partenaires",
    provider: {
      "@type": "Organization",
      name: "Nettoyage Lead Gen Suisse",
    },
    areaServed: {
      "@type": "Place",
      name: "Suisse romande",
    },
    serviceType: "Lead Generation",
    category: "Cleaning Services",
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
