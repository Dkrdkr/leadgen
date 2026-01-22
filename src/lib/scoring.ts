import { LeadPayload, LeadScore } from "./types";

export function calculateLeadScore(lead: Partial<LeadPayload>): LeadScore {
  let score = 0;
  const tags: string[] = [];

  // 1. URGENCE (+0 à +25 points)
  if (lead.urgency === "Urgent (<7j)") {
    score += 25;
    tags.push("URGENT");
  } else if (lead.urgency === "Normal (7-30j)") {
    score += 15;
  } else if (lead.urgency === "Flexible (>30j)") {
    score += 5;
  }

  // 2. TYPE DE SERVICE (+0 à +15 points)
  if (lead.serviceType === "fin-de-bail") {
    score += 15;
    tags.push("FIN_BAIL");
  } else if (["bureaux", "apres-travaux"].includes(lead.serviceType || "")) {
    score += 12;
    tags.push("RECURRENT_POTENTIAL");
  } else {
    score += 8;
  }

  // 3. SURFACE (+0 à +15 points)
  if (["100-150m²", "150m²+"].includes(lead.approxSurface || "")) {
    score += 15;
    tags.push("GRAND_LOGEMENT");
  } else if (lead.approxSurface === "70-100m²") {
    score += 10;
  } else {
    score += 5;
  }

  // 4. EXTRAS (+1 à +20 points)
  const complexExtras = [
    "Taches difficiles",
    "Meubles à déplacer",
    "Appartement très sale",
    "Calcaire/Traces tenaces",
  ];

  const extraCount = lead.extras?.length || 0;
  const complexCount =
    lead.extras?.filter((e) => complexExtras.includes(e)).length || 0;

  score += Math.min(extraCount * 2, 10);
  score += complexCount * 5;

  if (complexCount > 0) tags.push("COMPLEXE");
  if (extraCount >= 5) tags.push("MULTI_SERVICES");

  // 5. PHOTOS (+0 à +15 points)
  const photoCount = lead.photos?.length || 0;
  if (photoCount >= 3) {
    score += 15;
    tags.push("PHOTOS_COMPLETE");
  } else if (photoCount >= 1) {
    score += 10;
    tags.push("PHOTOS");
  }

  // 6. NOTES DÉTAILLÉES (+0 à +10 points)
  const notesLength = lead.accessNotes?.length || 0;
  if (notesLength > 100) {
    score += 10;
    tags.push("DETAILS");
  } else if (notesLength > 20) {
    score += 5;
  }

  // 7. PRÉFÉRENCE CONTACT (+0 à +10 points)
  if (lead.contactPreference === "WhatsApp") {
    score += 10;
    tags.push("WHATSAPP");
  } else if (lead.contactPreference === "Téléphone") {
    score += 8;
  } else {
    score += 3;
  }

  // Tier final
  const tier = score >= 80 ? "A" : score >= 50 ? "B" : "C";

  return { score, tier, tags };
}

export function getTierColor(tier: "A" | "B" | "C"): string {
  switch (tier) {
    case "A":
      return "bg-green-100 text-green-800 border-green-200";
    case "B":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "C":
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getTierLabel(tier: "A" | "B" | "C"): string {
  switch (tier) {
    case "A":
      return "Premium";
    case "B":
      return "Standard";
    case "C":
      return "Basique";
  }
}

export function sortLeadsByQuality(leads: LeadPayload[]): LeadPayload[] {
  return [...leads].sort((a, b) => {
    const tierOrder = { A: 3, B: 2, C: 1 };
    const tierDiff = tierOrder[a.leadScore.tier] - tierOrder[b.leadScore.tier];

    if (tierDiff !== 0) return tierDiff * -1;

    const scoreDiff = b.leadScore.score - a.leadScore.score;
    if (scoreDiff !== 0) return scoreDiff;

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
