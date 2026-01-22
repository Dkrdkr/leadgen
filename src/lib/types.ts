export type ServiceType =
  | "fin-de-bail"
  | "regulier"
  | "apres-travaux"
  | "demenagement"
  | "bureaux"
  | "vitres"
  | "autre";

export type PropertyType = "Appartement" | "Maison" | "Bureau" | "Commerce" | "Autre";

export type Rooms = "Studio" | "2" | "3" | "4" | "5+" | "Non applicable";

export type ApproxSurface =
  | "<40m²"
  | "40-70m²"
  | "70-100m²"
  | "100-150m²"
  | "150m²+"
  | "Inconnue";

export type Urgency = "Urgent (<7j)" | "Normal (7-30j)" | "Flexible (>30j)";

export type ContactPreference = "Téléphone" | "WhatsApp" | "Email";

export type TimeWindow =
  | "Matin (8h-12h)"
  | "Midi (12h-14h)"
  | "Après-midi (14h-18h)"
  | "Soir (18h-20h)"
  | "Peu importe";

export type LeadTier = "A" | "B" | "C";

export interface PhotoData {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface LeadScore {
  score: number;
  tier: LeadTier;
  tags: string[];
}

export interface AntiSpam {
  honeypot: string;
  timeToSubmitMs: number;
  attemptId: string;
  rateLimited: boolean;
  duplicateCheck: "none" | "suspected" | "blocked";
}

export interface LeadPayload {
  // Métadonnées
  leadId: string;
  createdAt: string;
  locale: "fr-CH";
  region: "Suisse romande";
  pagePath: string;
  referrer: string | null;
  utm: UTMParams;

  // Type de service
  serviceType: ServiceType;
  serviceTypeOther?: string;

  // Détails du bien
  locality: string;
  propertyType: PropertyType;
  rooms: Rooms;
  approxSurface: ApproxSurface;

  // Timing
  moveOutDate?: string;
  desiredDate?: string;
  urgency: Urgency;

  // Prestations supplémentaires
  extras: string[];

  // Notes & photos
  accessNotes?: string;
  photos?: PhotoData[];

  // Coordonnées client
  firstName: string;
  phone: string;
  email: string;
  contactPreference: ContactPreference;
  timeWindow: TimeWindow;

  // Consentements
  consentPartnerContact: true;
  consentPrivacy: true;
  consentMarketing?: boolean;

  // Scoring qualité
  leadScore: LeadScore;

  // Anti-spam & qualité
  antiSpam: AntiSpam;
}

export interface Event {
  eventName: string;
  timestamp: string;
  leadId?: string;
  payload?: Record<string, unknown>;
  utm?: UTMParams;
  variant?: string;
}

export interface DraftData extends Partial<LeadPayload> {
  currentStep?: number;
  lastSaved?: string;
}
