import { z } from "zod";

const disposableDomains = [
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "yopmail.com",
  "mailinator.com",
  "throwaway.email",
  "temp-mail.org",
  "getnada.com",
  "maildrop.cc",
  "trashmail.com",
  "mohmal.com",
  "sharklasers.com",
  "spam4.me",
  "grr.la",
  "discard.email",
  "fakemail.net",
  "throwawaymail.com",
  "tempmail.net",
  "getairmail.com",
  "mytemp.email",
];

const swissCities = [
  "Genève", "Lausanne", "Vevey", "Montreux", "Morges", "Nyon", "Yverdon-les-Bains",
  "Sion", "Sierre", "Martigny", "Monthey", "Brig", "Visp",
  "Fribourg", "Bulle", "Romont",
  "Neuchâtel", "La Chaux-de-Fonds", "Le Locle",
  "Delémont", "Porrentruy",
  "Aigle", "Payerne", "Moutier", "Bienne"
];

export const availableExtras = [
  "Four et plaques",
  "Vitres (intérieur/extérieur)",
  "Balcon/Terrasse",
  "Cave/Grenier",
  "Parking/Garage",
  "Présence animaux",
  "Taches difficiles",
  "Meubles à déplacer",
  "Calcaire/Traces tenaces",
  "Appartement très sale",
  "Nettoyage tapis/moquette",
  "Nettoyage rideaux",
];

export const leadPayloadSchema = z.object({
  // Métadonnées
  leadId: z.string().uuid("ID invalide"),
  createdAt: z.string().datetime("Date invalide"),
  locale: z.literal("fr-CH"),
  region: z.literal("Suisse romande"),
  pagePath: z.string(),
  referrer: z.string().nullable(),
  utm: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    term: z.string().optional(),
    content: z.string().optional(),
  }),

  // Type de service
  serviceType: z.enum([
    "fin-de-bail",
    "regulier",
    "apres-travaux",
    "demenagement",
    "bureaux",
    "vitres",
    "autre",
  ], { errorMap: () => ({ message: "Veuillez sélectionner un type de service" }) }),
  serviceTypeOther: z
    .string()
    .max(100, "Maximum 100 caractères")
    .optional()
    .refine((val) => !val || val.trim().length > 0, "Veuillez préciser le type de service"),

  // Détails du bien
  locality: z
    .string()
    .min(2, "Veuillez indiquer la localité")
    .max(100, "Nom de localité trop long"),
  propertyType: z.enum(["Appartement", "Maison", "Bureau", "Commerce", "Autre"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type de bien" }),
  }),
  rooms: z.enum(["Studio", "2", "3", "4", "5+", "Non applicable"], {
    errorMap: () => ({ message: "Veuillez sélectionner le nombre de pièces" }),
  }),
  approxSurface: z.enum([
    "<40m²",
    "40-70m²",
    "70-100m²",
    "100-150m²",
    "150m²+",
    "Inconnue",
  ], { errorMap: () => ({ message: "Veuillez sélectionner une surface approximative" }) }),

  // Timing
  moveOutDate: z.string().optional(),
  desiredDate: z.string().optional(),
  urgency: z.enum(["Urgent (<7j)", "Normal (7-30j)", "Flexible (>30j)"], {
    errorMap: () => ({ message: "Veuillez sélectionner le niveau d'urgence" }),
  }),

  // Prestations supplémentaires
  extras: z
    .array(z.string())
    .refine(
      (arr) => arr.every((item) => availableExtras.includes(item)),
      "Prestation invalide sélectionnée"
    ),

  // Notes & photos
  accessNotes: z
    .string()
    .max(500, "Maximum 500 caractères")
    .optional(),
  photos: z
    .array(
      z.object({
        name: z.string(),
        type: z.string().regex(/^image\/(jpeg|jpg|png|webp)$/, "Format d'image invalide"),
        size: z.number().max(5 * 1024 * 1024, "Fichier trop volumineux (max 5MB)"),
        dataUrl: z.string(),
      })
    )
    .max(3, "Maximum 3 photos")
    .optional(),

  // Coordonnées client
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(40, "Le prénom ne peut pas dépasser 40 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Le prénom contient des caractères invalides"),
  phone: z
    .string()
    .regex(
      /^(\+41|0041|0)\s?[1-9]\d{1}\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Numéro de téléphone suisse invalide (ex: +41 79 123 45 67 ou 079 123 45 67)"
    ),
  email: z
    .string()
    .email("Adresse email invalide")
    .refine((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return !disposableDomains.some((d) => domain === d || domain?.endsWith(`.${d}`));
    }, "Veuillez utiliser une adresse email permanente"),
  contactPreference: z.enum(["Téléphone", "WhatsApp", "Email"], {
    errorMap: () => ({ message: "Veuillez sélectionner une préférence de contact" }),
  }),
  timeWindow: z.enum([
    "Matin (8h-12h)",
    "Midi (12h-14h)",
    "Après-midi (14h-18h)",
    "Soir (18h-20h)",
    "Peu importe",
  ], { errorMap: () => ({ message: "Veuillez sélectionner une plage horaire" }) }),

  // Consentements
  consentPartnerContact: z.literal(true, {
    errorMap: () => ({
      message: "Vous devez accepter d'être contacté(e) par une entreprise partenaire",
    }),
  }),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({
      message: "Vous devez accepter la politique de confidentialité",
    }),
  }),
  consentMarketing: z.boolean().optional(),

  // Scoring qualité
  leadScore: z.object({
    score: z.number().min(0).max(100),
    tier: z.enum(["A", "B", "C"]),
    tags: z.array(z.string()),
  }),

  // Anti-spam
  antiSpam: z.object({
    honeypot: z.string().max(0, "Champ invalide détecté"),
    timeToSubmitMs: z.number().min(3000, "Veuillez prendre le temps de remplir correctement le formulaire"),
    attemptId: z.string().uuid(),
    rateLimited: z.boolean(),
    duplicateCheck: z.enum(["none", "suspected", "blocked"]),
  }),
}).refine(
  (data) => {
    if (data.serviceType === "fin-de-bail") {
      return !!data.moveOutDate;
    }
    return true;
  },
  {
    message: "La date de fin de bail est requise pour ce type de service",
    path: ["moveOutDate"],
  }
).refine(
  (data) => {
    if (data.serviceType === "autre") {
      return !!data.serviceTypeOther && data.serviceTypeOther.trim().length > 0;
    }
    return true;
  },
  {
    message: "Veuillez préciser le type de service",
    path: ["serviceTypeOther"],
  }
);

export const stepOneSchema = z.object({
  serviceType: z.enum([
    "fin-de-bail",
    "regulier",
    "apres-travaux",
    "demenagement",
    "bureaux",
    "vitres",
    "autre",
  ]),
  serviceTypeOther: z.string().max(100).optional(),
  locality: z.string().min(2, "Veuillez indiquer la localité").max(100),
  propertyType: z.enum(["Appartement", "Maison", "Bureau", "Commerce", "Autre"]),
  rooms: z.enum(["Studio", "2", "3", "4", "5+", "Non applicable"]),
  approxSurface: z.enum([
    "<40m²",
    "40-70m²",
    "70-100m²",
    "100-150m²",
    "150m²+",
    "Inconnue",
  ]),
  moveOutDate: z.string().optional(),
  desiredDate: z.string().optional(),
  urgency: z.enum(["Urgent (<7j)", "Normal (7-30j)", "Flexible (>30j)"]),
  extras: z.array(z.string()).default([]),
});

export const stepTwoSchema = z.object({
  firstName: z.string().min(2).max(40).regex(/^[a-zA-ZÀ-ÿ\s\-']+$/),
  phone: z.string().regex(/^(\+41|0041|0)\s?[1-9]\d{1}\s?\d{3}\s?\d{2}\s?\d{2}$/),
  email: z.string().email().refine((email) => {
    const domain = email.split("@")[1]?.toLowerCase();
    return !disposableDomains.some((d) => domain === d || domain?.endsWith(`.${d}`));
  }),
  contactPreference: z.enum(["Téléphone", "WhatsApp", "Email"]),
  timeWindow: z.enum([
    "Matin (8h-12h)",
    "Midi (12h-14h)",
    "Après-midi (14h-18h)",
    "Soir (18h-20h)",
    "Peu importe",
  ]),
  accessNotes: z.string().max(500).optional(),
  photos: z.array(z.object({
    name: z.string(),
    type: z.string(),
    size: z.number(),
    dataUrl: z.string(),
  })).max(3).optional(),
  consentPartnerContact: z.literal(true),
  consentPrivacy: z.literal(true),
  consentMarketing: z.boolean().optional(),
});

export type LeadPayloadInput = z.infer<typeof leadPayloadSchema>;
export type StepOneInput = z.infer<typeof stepOneSchema>;
export type StepTwoInput = z.infer<typeof stepTwoSchema>;

export { swissCities };
