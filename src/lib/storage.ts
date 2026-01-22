import { LeadPayload, Event, DraftData } from "./types";

const STORAGE_KEYS = {
  LEADS: "lead_gen_leads",
  EVENTS: "lead_gen_events",
  DRAFT: "lead_gen_draft",
  HASHES: "lead_gen_hashes",
  SUBMIT_TRACKING: "lead_gen_submit_tracking",
} as const;

const MAX_LEADS = 100;
const MAX_EVENTS = 200;
const HASH_RETENTION_MS = 48 * 60 * 60 * 1000; // 48 hours

interface HashEntry {
  hash: string;
  timestamp: number;
}

interface SubmitTracking {
  count: number;
  firstSubmit: number;
  fingerprint: string;
}

export function getLeads(): LeadPayload[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addLead(lead: LeadPayload): void {
  const leads = getLeads();
  leads.unshift(lead);

  if (leads.length > MAX_LEADS) {
    leads.splice(MAX_LEADS);
  }

  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
}

export function deleteLead(leadId: string): void {
  const leads = getLeads().filter((l) => l.leadId !== leadId);
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
}

export function clearLeads(): void {
  localStorage.removeItem(STORAGE_KEYS.LEADS);
}

export function getEvents(): Event[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addEvent(event: Event): void {
  const events = getEvents();
  events.unshift(event);

  if (events.length > MAX_EVENTS) {
    events.splice(MAX_EVENTS);
  }

  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
}

export function clearEvents(): void {
  localStorage.removeItem(STORAGE_KEYS.EVENTS);
}

export function getDraft(): DraftData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DRAFT);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setDraft(draft: DraftData): void {
  const draftWithTimestamp = {
    ...draft,
    lastSaved: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draftWithTimestamp));
}

export function clearDraft(): void {
  localStorage.removeItem(STORAGE_KEYS.DRAFT);
}

export function getRecentHashes(): HashEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HASHES);
    const hashes: HashEntry[] = data ? JSON.parse(data) : [];

    const now = Date.now();
    const validHashes = hashes.filter(
      (entry) => now - entry.timestamp < HASH_RETENTION_MS
    );

    if (validHashes.length !== hashes.length) {
      localStorage.setItem(STORAGE_KEYS.HASHES, JSON.stringify(validHashes));
    }

    return validHashes;
  } catch {
    return [];
  }
}

export function addHash(hash: string): void {
  const hashes = getRecentHashes();
  hashes.push({
    hash,
    timestamp: Date.now(),
  });

  localStorage.setItem(STORAGE_KEYS.HASHES, JSON.stringify(hashes));
}

export function checkDuplicate(hash: string): boolean {
  const hashes = getRecentHashes();
  return hashes.some((entry) => entry.hash === hash);
}

export function getSubmitTracking(fingerprint: string): SubmitTracking | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBMIT_TRACKING);
    if (!data) return null;

    const tracking: SubmitTracking = JSON.parse(data);

    if (tracking.fingerprint !== fingerprint) {
      return null;
    }

    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    if (tracking.firstSubmit < tenMinutesAgo) {
      localStorage.removeItem(STORAGE_KEYS.SUBMIT_TRACKING);
      return null;
    }

    return tracking;
  } catch {
    return null;
  }
}

export function incrementSubmitCount(fingerprint: string): number {
  const existing = getSubmitTracking(fingerprint);

  const tracking: SubmitTracking = existing
    ? { ...existing, count: existing.count + 1 }
    : { count: 1, firstSubmit: Date.now(), fingerprint };

  localStorage.setItem(STORAGE_KEYS.SUBMIT_TRACKING, JSON.stringify(tracking));

  return tracking.count;
}

export function resetSubmitCount(): void {
  localStorage.removeItem(STORAGE_KEYS.SUBMIT_TRACKING);
}

export function exportAllData(): unknown {
  return {
    leads: getLeads(),
    events: getEvents(),
    draft: getDraft(),
    exportedAt: new Date().toISOString(),
  };
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
