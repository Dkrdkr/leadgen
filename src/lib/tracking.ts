import { addEvent } from "./storage";
import { getUTMParams } from "./utils";

export type EventName =
  | "page_view"
  | "cta_click"
  | "form_start"
  | "step1_complete"
  | "step2_complete"
  | "draft_saved"
  | "draft_resumed"
  | "upload_photo"
  | "consent_checked"
  | "recap_viewed"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "duplicate_blocked"
  | "rate_limited"
  | "spam_detected"
  | "ab_variant_view";

interface TrackOptions {
  leadId?: string;
  variant?: string;
  tier?: string;
  score?: number;
  source?: string;
  field?: string;
  reason?: string;
  count?: number;
  type?: string;
  [key: string]: unknown;
}

export function track(eventName: EventName, options: TrackOptions = {}): void {
  const event = {
    eventName,
    timestamp: new Date().toISOString(),
    leadId: options.leadId,
    payload: options,
    utm: getUTMParams(),
    variant: getVariant(),
  };

  if (import.meta.env.DEV) {
    console.log("[TRACK]", eventName, options);
  }

  addEvent(event);
}

export function getVariant(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("v") === "2" ? "B" : "A";
}

export function isDebugMode(): boolean {
  return new URLSearchParams(window.location.search).get("debug") === "1";
}

export function trackPageView(): void {
  track("page_view", {
    path: window.location.pathname,
    search: window.location.search,
  });
}

export function trackCTAClick(source: string): void {
  track("cta_click", { source });
}

export function trackFormStart(): void {
  track("form_start");
}

export function trackStepComplete(step: number): void {
  if (step === 1) {
    track("step1_complete");
  } else if (step === 2) {
    track("step2_complete");
  }
}

export function trackDraftSaved(): void {
  track("draft_saved");
}

export function trackDraftResumed(): void {
  track("draft_resumed");
}

export function trackPhotoUpload(count: number): void {
  track("upload_photo", { count });
}

export function trackConsentChecked(type: string): void {
  track("consent_checked", { type });
}

export function trackRecapViewed(): void {
  track("recap_viewed");
}

export function trackFormSubmit(): void {
  track("form_submit");
}

export function trackFormSuccess(leadId: string, tier: string, score: number): void {
  track("form_success", { leadId, tier, score });
}

export function trackFormError(field: string, reason: string): void {
  track("form_error", { field, reason });
}

export function trackDuplicateBlocked(hash: string): void {
  track("duplicate_blocked", { hash });
}

export function trackRateLimited(count: number): void {
  track("rate_limited", { count });
}

export function trackSpamDetected(type: string, reason: string): void {
  track("spam_detected", { type, reason });
}

export function trackABVariantView(variant: string): void {
  track("ab_variant_view", { variant });
}
