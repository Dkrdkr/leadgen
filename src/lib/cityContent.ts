export interface CityContent {
  slug: string;
  name: string;
  canton: string;
  title: string; // SEO title
  metaDescription: string;
  h1: string;
  localContent: {
    intro: string;
    whyLocal: string;
    coverage: string[];
  };
  keywords: string[];
  schema: {
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
  };
}

export const cities: Record<string, CityContent> = {
  geneve: {
    slug: "geneve",
    name: "Genève",
    canton: "Genève",
    title: "Nettoyage fin de bail Genève | Récupérez votre caution à 100%",
    metaDescription: "Nettoyage fin de bail à Genève ✓ Trouvez LA meilleure entreprise certifiée pour votre logement ✓ Algorithme intelligent ✓ 1 seul contact ✓ Devis gratuit sous 24h",
    h1: "Nettoyage fin de bail à Genève — Trouvez l'entreprise parfaite",
    localContent: {
      intro: "Vous quittez votre logement à Genève et vous voulez récupérer votre caution intégralement ? Notre algorithme analyse vos besoins précis (surface, type de bien, urgence, prestations) et sélectionne LA meilleure entreprise de nettoyage certifiée parmi nos partenaires genevois.",
      whyLocal: "Les régies genevoises sont particulièrement exigeantes sur l'état des lieux de sortie. Nos entreprises partenaires connaissent EXACTEMENT leurs critères : sols impeccables, joints de salle de bain, four décapé, vitres sans traces. Taux de validation : 94% à Genève.",
      coverage: [
        "Genève ville (1200-1209)",
        "Carouge (1227)",
        "Meyrin (1217)",
        "Vernier (1214)",
        "Lancy (1212)",
        "Chêne-Bougeries (1224)",
        "Thônex (1226)",
        "Plan-les-Ouates (1228)",
        "Versoix (1290)",
        "Grand-Saconnex (1218)",
      ],
    },
    keywords: [
      "nettoyage fin de bail genève",
      "nettoyage fin de bail carouge",
      "entreprise nettoyage genève",
      "nettoyage appartement genève",
      "récupérer caution genève",
      "état des lieux genève",
      "nettoyage meyrin",
      "nettoyage vernier",
      "nettoyage professionnel genève",
    ],
    schema: {
      addressLocality: "Genève",
      addressRegion: "GE",
      postalCode: "1200",
    },
  },
  lausanne: {
    slug: "lausanne",
    name: "Lausanne",
    canton: "Vaud",
    title: "Nettoyage fin de bail Lausanne | Entreprise certifiée Vaud",
    metaDescription: "Nettoyage fin de bail à Lausanne ✓ Algorithme intelligent pour trouver l'entreprise parfaite ✓ Spécialistes Vaud ✓ Caution garantie ✓ Devis gratuit 24h",
    h1: "Nettoyage fin de bail à Lausanne — L'entreprise idéale pour votre logement",
    localContent: {
      intro: "Fin de bail à Lausanne ? Notre système intelligent analyse votre situation (type de bien, surface, délai, prestations spéciales) et sélectionne automatiquement L'entreprise de nettoyage vaudoise la plus adaptée parmi nos partenaires certifiés.",
      whyLocal: "Les régies lausannoises appliquent des standards stricts. Nos entreprises partenaires sont formées aux exigences spécifiques du canton de Vaud : nettoyage complet cuisine, sanitaires irréprochables, sols traités selon le type de revêtement, vitres intérieures et extérieures.",
      coverage: [
        "Lausanne centre (1003-1005)",
        "Renens (1020)",
        "Pully (1009)",
        "Prilly (1008)",
        "Ecublens (1024)",
        "Crissier (1023)",
        "Lutry (1095)",
        "Chailly (1032)",
        "Epalinges (1066)",
        "Le Mont-sur-Lausanne (1052)",
      ],
    },
    keywords: [
      "nettoyage fin de bail lausanne",
      "nettoyage fin de bail vaud",
      "entreprise nettoyage lausanne",
      "nettoyage appartement lausanne",
      "nettoyage renens",
      "nettoyage pully",
      "récupérer caution vaud",
      "état des lieux lausanne",
      "nettoyage professionnel lausanne",
    ],
    schema: {
      addressLocality: "Lausanne",
      addressRegion: "VD",
      postalCode: "1003",
    },
  },
  vaud: {
    slug: "vaud",
    name: "Vaud",
    canton: "Vaud",
    title: "Nettoyage fin de bail Vaud | Toutes communes du canton",
    metaDescription: "Nettoyage fin de bail partout dans le canton de Vaud ✓ Entreprises certifiées locales ✓ Matching intelligent ✓ Morges, Nyon, Yverdon, Montreux ✓ Devis 24h",
    h1: "Nettoyage fin de bail dans tout le canton de Vaud",
    localContent: {
      intro: "Vous quittez un logement dans le canton de Vaud ? Notre algorithme trouve L'entreprise de nettoyage parfaite selon votre localité exacte (Morges, Nyon, Yverdon, Montreux, Vevey...), votre type de bien et votre urgence.",
      whyLocal: "Chaque région du canton a ses spécificités : appartements anciens à Vevey, villas neuves à Morges, immeubles modernes à Nyon. Notre réseau couvre TOUT le canton avec des entreprises locales certifiées qui connaissent les exigences des régies vaudoises.",
      coverage: [
        "Lausanne et agglomération",
        "Morges (1110)",
        "Nyon (1260)",
        "Yverdon-les-Bains (1400)",
        "Montreux (1820)",
        "Vevey (1800)",
        "Aigle (1860)",
        "Gland (1196)",
        "Rolle (1180)",
        "Payerne (1530)",
      ],
    },
    keywords: [
      "nettoyage fin de bail vaud",
      "nettoyage fin de bail morges",
      "nettoyage fin de bail nyon",
      "nettoyage fin de bail yverdon",
      "nettoyage fin de bail montreux",
      "nettoyage fin de bail vevey",
      "entreprise nettoyage vaud",
      "récupérer caution vaud",
    ],
    schema: {
      addressLocality: "Vaud",
      addressRegion: "VD",
    },
  },
  valais: {
    slug: "valais",
    name: "Valais",
    canton: "Valais",
    title: "Nettoyage fin de bail Valais | Sion, Martigny, Monthey",
    metaDescription: "Nettoyage fin de bail en Valais ✓ Entreprises certifiées Sion, Martigny, Monthey, Sierre ✓ Matching intelligent ✓ Caution garantie ✓ Devis gratuit 24h",
    h1: "Nettoyage fin de bail en Valais — Toutes villes du canton",
    localContent: {
      intro: "Fin de bail en Valais ? Notre système intelligent sélectionne automatiquement L'entreprise de nettoyage valaisanne la plus adaptée à votre situation : Sion, Martigny, Monthey, Sierre, ou toute autre commune du canton.",
      whyLocal: "Le Valais a des particularités (chalets, appartements en station, villas familiales). Nos entreprises partenaires couvrent tout le canton et sont équipées pour tous types de biens : appartements en ville, chalets en montagne, villas en plaine. Elles connaissent les standards des régies valaisannes.",
      coverage: [
        "Sion (1950)",
        "Martigny (1920)",
        "Monthey (1870)",
        "Sierre (3960)",
        "Conthey (1964)",
        "Fully (1926)",
        "Saxon (1907)",
        "Brigue (3900)",
        "Verbier (1936)",
        "Crans-Montana (3963)",
      ],
    },
    keywords: [
      "nettoyage fin de bail valais",
      "nettoyage fin de bail sion",
      "nettoyage fin de bail martigny",
      "nettoyage fin de bail monthey",
      "nettoyage fin de bail sierre",
      "entreprise nettoyage valais",
      "nettoyage chalet valais",
      "récupérer caution valais",
    ],
    schema: {
      addressLocality: "Valais",
      addressRegion: "VS",
    },
  },
  fribourg: {
    slug: "fribourg",
    name: "Fribourg",
    canton: "Fribourg",
    title: "Nettoyage fin de bail Fribourg | Entreprise certifiée bilingue",
    metaDescription: "Nettoyage fin de bail à Fribourg ✓ Service bilingue FR/DE ✓ Algorithme intelligent ✓ Entreprises certifiées canton ✓ Caution garantie ✓ Devis 24h",
    h1: "Nettoyage fin de bail à Fribourg — Service bilingue FR/DE",
    localContent: {
      intro: "Fin de bail à Fribourg ou dans le canton ? Notre algorithme sélectionne L'entreprise de nettoyage parfaite selon votre commune, votre type de bien et votre urgence. Service bilingue français/allemand disponible.",
      whyLocal: "Le canton de Fribourg est bilingue et nos entreprises partenaires le sont aussi. Elles connaissent les exigences des régies fribourgeoises et peuvent communiquer en français comme en allemand. Couverture complète : ville de Fribourg, Bulle, Romont, Estavayer, et toutes communes.",
      coverage: [
        "Fribourg ville (1700)",
        "Bulle (1630)",
        "Villars-sur-Glâne (1752)",
        "Marly (1723)",
        "Romont (1680)",
        "Estavayer-le-Lac (1470)",
        "Givisiez (1762)",
        "Düdingen/Guin (3186)",
        "Murten/Morat (3280)",
        "Tafers (1712)",
      ],
    },
    keywords: [
      "nettoyage fin de bail fribourg",
      "nettoyage fin de bail bulle",
      "entreprise nettoyage fribourg",
      "nettoyage appartement fribourg",
      "récupérer caution fribourg",
      "nettoyage bilingue fribourg",
      "état des lieux fribourg",
    ],
    schema: {
      addressLocality: "Fribourg",
      addressRegion: "FR",
      postalCode: "1700",
    },
  },
  neuchatel: {
    slug: "neuchatel",
    name: "Neuchâtel",
    canton: "Neuchâtel",
    title: "Nettoyage fin de bail Neuchâtel | La Chaux-de-Fonds",
    metaDescription: "Nettoyage fin de bail à Neuchâtel ✓ Entreprises certifiées canton ✓ La Chaux-de-Fonds, Val-de-Ruz ✓ Algorithme intelligent ✓ Devis gratuit 24h",
    h1: "Nettoyage fin de bail à Neuchâtel — Tout le canton",
    localContent: {
      intro: "Fin de bail dans le canton de Neuchâtel ? Notre système trouve automatiquement L'entreprise de nettoyage idéale selon votre ville (Neuchâtel, La Chaux-de-Fonds, Val-de-Ruz...), votre type de bien et votre délai.",
      whyLocal: "Nos entreprises partenaires couvrent l'ensemble du canton de Neuchâtel : ville de Neuchâtel, La Chaux-de-Fonds, Le Locle, Val-de-Ruz. Elles connaissent les exigences spécifiques des régies neuchâteloises et sont équipées pour tous types de logements.",
      coverage: [
        "Neuchâtel (2000)",
        "La Chaux-de-Fonds (2300)",
        "Le Locle (2400)",
        "Val-de-Ruz (2046)",
        "Peseux (2034)",
        "Boudry (2017)",
        "Marin-Epagnier (2074)",
        "Cortaillod (2016)",
        "Hauterive (2068)",
        "Saint-Aubin (2024)",
      ],
    },
    keywords: [
      "nettoyage fin de bail neuchâtel",
      "nettoyage fin de bail la chaux-de-fonds",
      "nettoyage fin de bail le locle",
      "entreprise nettoyage neuchâtel",
      "récupérer caution neuchâtel",
      "état des lieux neuchâtel",
    ],
    schema: {
      addressLocality: "Neuchâtel",
      addressRegion: "NE",
      postalCode: "2000",
    },
  },
};

export const getAllCitySlugs = (): string[] => {
  return Object.keys(cities);
};

export const getCityBySlug = (slug: string): CityContent | null => {
  return cities[slug] || null;
};

export const getCityMeta = (slug: string) => {
  const city = getCityBySlug(slug);
  if (!city) return null;

  return {
    title: city.title,
    description: city.metaDescription,
    keywords: city.keywords.join(", "),
    canonical: `https://nettoyage-suisse.ch/${slug}`,
    ogTitle: city.title,
    ogDescription: city.metaDescription,
    ogUrl: `https://nettoyage-suisse.ch/${slug}`,
  };
};
