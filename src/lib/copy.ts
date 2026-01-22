export interface CopyContent {
  hero: {
    h1: string;
    subheadline: string;
    valueProposition: string;
    cta: string;
    microcopy: string;
  };
  problem: {
    title: string;
    subtitle: string;
    issues: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  transparency: {
    title: string;
    content: string[];
  };
  whyDifferent: {
    title: string;
    benefits: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  howItWorks: {
    title: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
  whatYouGet: {
    title: string;
    items: string[];
  };
  trustBar: {
    items: Array<{
      icon: string;
      text: string;
    }>;
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    links: Array<{
      text: string;
      href: string;
    }>;
    disclaimer: string;
    copyright: string;
  };
  form: {
    step1Title: string;
    step2Title: string;
    progressLabel: (step: number) => string;
    nextButton: string;
    backButton: string;
    submitButton: string;
    modifyButton: string;
  };
  thankYou: {
    title: string;
    subtitle: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
    }>;
    transparencyBox: {
      title: string;
      content: string;
    };
    actions: {
      modify: string;
      download: string;
      privacy: string;
    };
  };
}

export const copyA: CopyContent = {
  hero: {
    h1: "Récupérez votre caution — sans stress ni refus",
    subheadline: "On analyse vos besoins concrets et on vous trouve LA meilleure entreprise certifiée parmi nos partenaires",
    valueProposition: "Notre algorithme sélectionne l'entreprise parfaite selon votre bien, votre localité et votre urgence",
    cta: "Trouver mon entreprise idéale →",
    microcopy: "✓ Analyse personnalisée · 1 seule entreprise · Sélection automatique",
  },
  problem: {
    title: "Pourquoi chercher seul est une perte de temps",
    subtitle: "Chaque situation est différente. Vous méritez une entreprise PARFAITEMENT adaptée à vos besoins.",
    issues: [
      {
        icon: "Search",
        title: "Comment savoir laquelle est LA bonne ?",
        description: "Un 3.5 pièces à Lausanne n'a pas les mêmes besoins qu'une maison à Sion. Une fin de bail urgente demande une entreprise différente d'un nettoyage régulier. Seule une analyse précise peut trouver le bon match.",
      },
      {
        icon: "Users",
        title: "Les comparateurs vous spamment",
        description: "Ils vendent vos données à 10 entreprises sans analyser vos besoins. Résultat : 10 devis inadaptés et votre téléphone qui sonne non-stop. Nous faisons l'INVERSE : analyse d'abord, 1 seule entreprise parfaite ensuite.",
      },
      {
        icon: "Clock",
        title: "Vous n'avez pas le temps d'analyser",
        description: "Comparer 5-6 entreprises prend 3h minimum. Vérifier si elles connaissent votre canton, si elles acceptent votre urgence, si elles sont équipées pour votre surface... On fait cette analyse pour vous en 2 minutes.",
      },
    ],
  },
  transparency: {
    title: "⚠️ Notre rôle : analyser vos besoins et sélectionner LA meilleure entreprise",
    content: [
      "Nous NE sommes PAS une entreprise de nettoyage. Nous sommes un algorithme intelligent qui ANALYSE vos besoins concrets (surface, type de bien, urgence, localité) pour trouver L'entreprise parfaite parmi nos partenaires certifiés.",
      "Votre demande déclenche une analyse automatique : notre système croise vos critères avec les spécialités, disponibilités et localisations de nos entreprises partenaires. Une seule entreprise reçoit votre dossier : celle qui MATCHE parfaitement.",
      "Notre valeur ? Un matching intelligent au lieu d'une liste aléatoire. Chaque critère compte : un studio à Genève urgent < 7 jours ne sera pas traité par la même entreprise qu'une maison 5 pièces à Fribourg flexible. Taux de satisfaction : 94%.",
    ],
  },
  whyDifferent: {
    title: "Pourquoi 847 locataires suisses nous font confiance ce mois-ci",
    benefits: [
      {
        icon: "Target",
        title: "Matching intelligent, pas liste aléatoire",
        description: "Notre algorithme analyse VOTRE situation précise (surface, bien, localité, urgence, extras) et sélectionne L'entreprise partenaire la plus qualifiée. Pas de hasard, que de la pertinence.",
      },
      {
        icon: "CheckCircle2",
        title: "1 seul contact ultra-ciblé (pas 10 spam)",
        description: "UNE entreprise reçoit votre dossier. Celle qui MATCHE avec vos critères. Fini les 10 appels de commercial qui n'ont même pas lu votre demande. Un seul contact, mais le bon.",
      },
      {
        icon: "Clock",
        title: "Analyse en 2 min, réponse sous 24h",
        description: "Le temps que vous remplissiez le formulaire, notre système analyse déjà quelle entreprise est disponible pour votre date, dans votre canton, pour votre type de bien. Réponse garantie 24h max.",
      },
    ],
  },
  howItWorks: {
    title: "Comment on trouve LA meilleure entreprise pour vous",
    steps: [
      {
        number: 1,
        title: "Vous répondez à nos questions précises",
        description: "Surface exacte ? Type de bien ? Localité ? Urgence ? Prestations extras ? Chaque détail compte pour trouver l'entreprise PARFAITE. Plus vous êtes précis, meilleur sera le match.",
      },
      {
        number: 2,
        title: "Notre algorithme analyse et sélectionne",
        description: "En 2 minutes, notre système croise vos 10+ critères avec notre réseau de partenaires certifiés. Il sélectionne L'entreprise qui coche TOUS vos besoins : région, disponibilité, spécialité, équipement.",
      },
      {
        number: 3,
        title: "L'entreprise parfaite vous contacte sous 24h",
        description: "Elle a déjà votre dossier complet. Son devis sera ultra-personnalisé car elle connaît EXACTEMENT vos besoins. WhatsApp, téléphone ou email : vous choisissez.",
      },
    ],
  },
  whatYouGet: {
    title: "Ce que notre analyse vous apporte (100% gratuit)",
    items: [
      "✓ Une analyse intelligente de vos besoins concrets en 2 minutes (au lieu de 3h de recherche)",
      "✓ L'entreprise PARFAITE pour votre situation : canton, urgence, surface, prestations — tout matche",
      "✓ Un devis ultra-personnalisé : elle connaît déjà TOUS vos critères avant de vous appeler",
      "✓ Zéro spam (1 seule entreprise). Zéro engagement. Zéro frais cachés.",
    ],
  },
  trustBar: {
    items: [
      { icon: "Lock", text: "100% gratuit pour vous" },
      { icon: "Target", text: "1 seule entreprise (pas 10)" },
      { icon: "MapPin", text: "Certifiées Suisse romande" },
      { icon: "Zap", text: "Réponse sous 24h garantie" },
    ],
  },
  faq: {
    title: "Les 7 questions que tout le monde pose",
    items: [
      {
        question: "C'est vraiment gratuit pour moi ?",
        answer:
          "OUI. 100% gratuit. Nous sommes payés par les entreprises partenaires (pas par vous). Vous recevez un devis gratuit, vous décidez si vous acceptez ou pas. Aucune carte bancaire demandée. Aucun frais caché.",
      },
      {
        question: "Combien d'entreprises vont me spammer ?",
        answer:
          "UNE SEULE entreprise vous contacte. On n'est PAS un comparateur qui vend vos coordonnées à 10 entreprises. Une seule entreprise certifiée, adaptée à votre région et votre urgence. Point final.",
      },
      {
        question: "Pourquoi je dois donner mon numéro ?",
        answer:
          "Parce que les deadlines de fin de bail sont serrées. L'entreprise doit pouvoir vous joindre VITE pour le devis + planifier l'intervention. Vous choisissez votre mode de contact préféré : appel, WhatsApp ou email.",
      },
      {
        question: "Est-ce que ça marche vraiment pour récupérer mon dépôt ?",
        answer:
          "Nos entreprises partenaires ont un taux de validation état des lieux de 94%. Elles connaissent EXACTEMENT les exigences des régies suisses (four, frigo, joints, sols, etc.). Pas de nettoyeur amateur qui fait ça 'à peu près'.",
      },
      {
        question: "J'ai ma fin de bail dans 3 jours, c'est trop tard ?",
        answer:
          "NON. On a des partenaires qui acceptent les urgences <7 jours. Cochez 'Urgent' dans le formulaire. L'entreprise qui reçoit votre demande saura qu'elle doit réagir IMMÉDIATEMENT. Réponse garantie sous 24h max.",
      },
      {
        question: "Vous vendez mes données à qui ?",
        answer:
          "À UNE entreprise de nettoyage certifiée. C'est tout. Pas de revente à des courtiers, pas de spam pub, pas de newsletter non sollicitée. Vos données sont transmises uniquement à l'entreprise qui va vous faire le devis. Conforme LPD suisse.",
      },
      {
        question: "Si le devis ne me convient pas, je fais quoi ?",
        answer:
          "Vous refusez. Point. Aucun engagement. L'entreprise vous fait un devis gratuit, vous êtes libre de dire non. Pas de frais d'annulation, pas de pression commerciale. Vous gardez 100% du contrôle.",
      },
    ],
  },
  footer: {
    links: [
      { text: "Confidentialité", href: "#privacy" },
      { text: "Mentions légales", href: "#legal" },
      { text: "Contact", href: "#contact" },
      { text: "Supprimer mes données", href: "#delete" },
    ],
    disclaimer: "Plateforme de mise en relation. Nous ne réalisons aucun nettoyage.",
    copyright: "© 2026 Lead Gen Nettoyage Suisse",
  },
  form: {
    step1Title: "Analysons vos besoins précis",
    step2Title: "Comment vous joindre",
    progressLabel: (step: number) => `${step}/2`,
    nextButton: "Continuer l'analyse",
    backButton: "Retour",
    submitButton: "Lancer l'analyse et trouver mon entreprise",
    modifyButton: "Modifier",
  },
  thankYou: {
    title: "✓ Demande envoyée avec succès",
    subtitle: "Votre demande a été transmise à une entreprise partenaire",
    steps: [
      {
        number: 1,
        title: "Analyse",
        description: "Nous vérifions votre demande (≈ 2h ouvrées)",
      },
      {
        number: 2,
        title: "Transmission",
        description: "Envoi à une entreprise partenaire adaptée",
      },
      {
        number: 3,
        title: "Contact",
        description: "L'entreprise vous contacte selon votre préférence",
      },
    ],
    transparencyBox: {
      title: "Notre rôle d'intermédiaire",
      content:
        "Nous avons transmis votre demande à une entreprise de nettoyage partenaire. Vous serez contacté(e) directement par cette entreprise pour un devis personnalisé.",
    },
    actions: {
      modify: "Modifier ma demande",
      download: "Télécharger mes données",
      privacy: "Confidentialité",
    },
  },
};

export const copyB: CopyContent = {
  ...copyA,
  hero: {
    h1: "Fin de bail dans moins de 30 jours ? Ne perdez pas votre caution.",
    subheadline:
      "Notre algorithme analyse vos besoins et sélectionne L'entreprise parfaite : votre canton, votre urgence, votre type de bien.",
    valueProposition: "Matching intelligent basé sur 10+ critères au lieu d'une liste aléatoire d'entreprises",
    cta: "Lancer l'analyse de mes besoins →",
    microcopy: "✓ Analyse personnalisée · 1 entreprise ciblée · Taux réussite 94%",
  },
};

export function getCopy(variant?: string): CopyContent {
  return variant === "2" || variant === "B" ? copyB : copyA;
}

export const serviceTypeLabels: Record<string, string> = {
  "fin-de-bail": "Nettoyage de fin de bail",
  regulier: "Nettoyage régulier",
  "apres-travaux": "Nettoyage après travaux",
  demenagement: "Nettoyage déménagement",
  bureaux: "Nettoyage de bureaux",
  vitres: "Nettoyage de vitres",
  autre: "Autre type de nettoyage",
};

export const propertyTypeLabels: Record<string, string> = {
  Appartement: "Appartement",
  Maison: "Maison",
  Bureau: "Bureau",
  Commerce: "Commerce",
  Autre: "Autre",
};

export const urgencyLabels: Record<string, string> = {
  "Urgent (<7j)": "Urgent (moins de 7 jours)",
  "Normal (7-30j)": "Normal (7-30 jours)",
  "Flexible (>30j)": "Flexible (plus de 30 jours)",
};
