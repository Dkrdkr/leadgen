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
    h1: "État des lieux validé du 1er coup — Garanti par Nettooyage",
    subheadline: "Votre régie trouve une trace ? Des joints pas nets ? Avec Nettooyage, l'entreprise DOIT repasser gratuitement jusqu'à validation complète. Fini les galères avec les nettoyeurs qui bâclent et disparaissent.",
    valueProposition: "On sélectionne L'entreprise qui accepte de refaire GRATUITEMENT jusqu'à ce que votre régie valide. Pas de frais cachés, pas de 2ème facture.",
    cta: "Trouver mon entreprise avec garantie →",
    microcopy: "✓ Garantie re-passage gratuit · 1 seule entreprise certifiée · 100% de validation garantie",
  },
  problem: {
    title: "Les 3 cauchemars qui coûtent cher en fin de bail",
    subtitle: "État des lieux refusé = factures supplémentaires. Voici ce qui arrive avec les mauvaises entreprises...",
    issues: [
      {
        icon: "Search",
        title: "L'entreprise bâcle → votre régie refuse l'état des lieux",
        description: "Résultat : CHF 800-2000 de frais de nettoyage supplémentaires facturés par la régie. Traces de calcaire, joints mal nettoyés, four pas dégraissé... La régie fait venir SA société et VOUS facture. L'entreprise ne répond plus.",
      },
      {
        icon: "Users",
        title: "Ils prennent votre argent — puis disparaissent",
        description: "Le classique : nettoyage bâclé en 2h au lieu de 6h, entreprise injoignable après. La régie refuse de valider. Vous devez RE-payer une autre entreprise en urgence + les frais de la régie. Double voire triple facture.",
      },
      {
        icon: "Clock",
        title: "L'entreprise refuse de repasser — VOUS payez",
        description: "Même si c'est leur faute. Ils vous ghostent ou exigent un 2ème paiement. Pendant ce temps, la régie engage SA société et vous envoie la facture majorée. Vous perdez des centaines de CHF sur un travail déjà payé.",
      },
    ],
  },
  transparency: {
    title: "🛡️ Nettooyage = Votre bouclier anti-factures cachées",
    content: [
      "On SÉLECTIONNE uniquement les entreprises qui acceptent notre garantie béton : re-passage GRATUIT jusqu'à validation 100% de votre régie. Si la régie trouve une trace, un oubli, un problème — l'entreprise DOIT revenir sans facturer un centime de plus. C'est dans le contrat.",
      "Notre rôle ? Garantir le résultat final. Si l'entreprise fait mal son job, on la vire du réseau. Simple. Chaque partenaire sait qu'une seule prestation refusée = exclusion définitive. Votre tranquillité > leur ego.",
      "847 locataires ont validé leur état des lieux ce mois via Nettooyage. 100% de validation finale. Comment ? Si la régie refuse, l'entreprise repasse jusqu'à validation — sans frais supplémentaires. ZÉRO client n'a dû payer 2 fois. C'est notre promesse.",
    ],
  },
  whyDifferent: {
    title: "La SEULE plateforme qui garantit la validation — pas juste un devis",
    benefits: [
      {
        icon: "CheckCircle2",
        title: "Garantie re-passage GRATUIT jusqu'à validation 100%",
        description: "Votre régie trouve un problème ? L'entreprise DOIT repasser sans facturer. C'est écrit noir sur blanc dans notre contrat partenaire. Vous ne payez JAMAIS 2 fois pour le même nettoyage. JAMAIS.",
      },
      {
        icon: "Target",
        title: "On vire les entreprises qui font mal leur travail",
        description: "Une seule prestation refusée = exclusion définitive du réseau Nettooyage. Les entreprises le savent. Résultat ? Elles font le job à 200% du premier coup pour rester dans notre réseau. Votre argent > leur ego.",
      },
      {
        icon: "Target",
        title: "1 seule entreprise triée sur le volet (pas 10 cowboys)",
        description: "On analyse 10+ critères (canton, urgence, surface, spécialité) pour trouver L'entreprise qui MATCHE. UNE seule vous contacte. Celle qui a prouvé qu'elle valide les états des lieux. Pas un annuaire de nettoyeurs amateurs.",
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
      "✓ GARANTIE BÉTON : Votre régie refuse l'état des lieux ? Envoyez-nous UNE photo → on FORCE l'entreprise à repasser GRATUITEMENT jusqu'à validation 100%. Vous ne payez JAMAIS 2 fois. C'est écrit dans le contrat.",
      "✓ ZÉRO RISQUE pour vous : Si l'entreprise bâcle ou disparaît, ON prend le relais. On trouve une nouvelle entreprise, on gère le conflit, on assume les frais. Votre seul job ? Valider l'état des lieux. Le reste = notre problème.",
      "✓ UNIQUE EN SUISSE ROMANDE : Première plateforme qui GARANTIT la validation par la Régie (pas juste un devis). Les autres vous mettent en contact. Nous, on garantit le RÉSULTAT final. Aucun concurrent n'offre ça en Valais.",
      "✓ L'entreprise PARFAITE en 2 minutes : Notre algorithme analyse 10+ critères (canton, urgence, surface, spécialités) et sélectionne LA meilleure entreprise certifiée. 1 seule vous contacte. Pas 10 cowboys qui spamment.",
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
        question: "J'ai déjà perdu CHF 1200 avec une entreprise qui a bâclé... Comment vous êtes différents ?",
        answer:
          "EXACTEMENT le problème qu'on résout. Nos entreprises signent un contrat BÉTON : re-passage GRATUIT jusqu'à validation 100% par votre régie. Si elles bâclent, elles repassent sans vous facturer un centime. Si elles refusent ou disparaissent, ON prend le relais et on trouve une nouvelle entreprise à NOS frais. Vous ne payez JAMAIS 2 fois. 847 locataires ce mois : 100% de validation finale. ZÉRO double facture.",
      },
      {
        question: "Pourquoi ma régie refuse toujours l'état des lieux avec les nettoyeurs normaux ?",
        answer:
          "Parce que 90% des nettoyeurs sont des amateurs qui ne connaissent PAS les exigences suisses : four dégraissé à fond, joints blanchis, traces de calcaire éliminées, sols sans film gras... Nos partenaires travaillent QUE pour les fins de bail. Ils connaissent les listes de contrôle exactes des régies de votre canton. Résultat : validation du premier coup ou re-passage gratuit inclus. Pas de 'à peu près', pas de 'ça devrait aller'.",
      },
      {
        question: "L'entreprise va me spammer avec 10 appels par jour comme la dernière fois ?",
        answer:
          "NON. UNE SEULE entreprise certifiée vous contacte. On n'est PAS un comparateur pourri qui vend vos données à 15 cowboys. Notre algorithme sélectionne LA meilleure pour votre canton + urgence + type de bien. Elle vous contacte COMMENT vous voulez (WhatsApp, appel, email). Si elle spam, elle est virée du réseau. Point final.",
      },
      {
        question: "Ma régie est ultra-stricte (Livit, Régie du Rhône, etc.)... Ça va marcher quand même ?",
        answer:
          "OUI. Nos entreprises bossent JUSTEMENT avec les régies les plus difficiles de Suisse romande. Elles connaissent leurs exigences par cœur : Livit veut les joints ultra-blancs, Régie du Rhône vérifie le four au détail, etc. Si votre régie refuse quand même, l'entreprise repasse jusqu'à validation. GARANTI. On a 100% de validation finale sur 847 dossiers ce mois. Votre régie stricte ? C'est leur quotidien.",
      },
      {
        question: "J'ai ma fin de bail dans 5 jours... C'est trop tard non ?",
        answer:
          "NON. On a des partenaires qui acceptent les urgences <7 jours. Le problème ? Si vous prenez un nettoyeur random sur Google, il va bâcler en 2h, votre régie refuse, vous devez RE-payer en urgence + frais de la régie. Avec nous, cochez 'Urgent' dans le formulaire. L'entreprise sait qu'elle doit réagir IMMÉDIATEMENT. Réponse sous 24h garantie. Et si elle rate, elle repasse gratuitement même si c'est dans 2 jours.",
      },
      {
        question: "C'est vraiment gratuit ? Où est l'arnaque ?",
        answer:
          "Zéro arnaque. 100% gratuit pour vous. On est payés par les entreprises partenaires (pas par vous). Vous recevez un devis gratuit, vous décidez d'accepter ou pas. Aucune carte bancaire demandée. Aucun engagement. Aucun frais caché. Si le devis ne vous convient pas, vous refusez. Point. Vous gardez 100% du contrôle. On gagne de l'argent QUE si vous êtes satisfait du service.",
      },
      {
        question: "Si la régie refuse quand même l'état des lieux, je fais quoi ?",
        answer:
          "Vous envoyez UNE photo des points refusés par la régie (joints, traces, four, etc.). On contacte l'entreprise qui DOIT repasser gratuitement. C'est dans le contrat. Si elle refuse ou disparaît, ON prend le relais : on trouve une nouvelle entreprise certifiée et on assume les frais. Votre seul job ? Envoyer la photo. Le reste = notre problème. 100% de validation finale garantie.",
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
    copyright: "© 2026 Nettooyage.ch — Validation garantie ou re-passage gratuit",
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
    microcopy: "✓ Analyse personnalisée · 1 entreprise ciblée · 100% de validation garantie",
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
