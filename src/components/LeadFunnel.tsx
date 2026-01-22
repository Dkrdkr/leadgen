import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StepOneInput,
  StepTwoInput,
  stepOneSchema,
  stepTwoSchema,
  leadPayloadSchema,
} from "@/lib/validation";
import { LeadPayload } from "@/lib/types";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { LeadRecap } from "./LeadRecap";
import { useToast } from "./ToastProvider";
import { getCopy } from "@/lib/copy";
import { getVariant, track, trackFormStart, trackStepComplete, trackRecapViewed, trackFormSubmit, trackFormSuccess, trackFormError, trackDraftSaved, trackDraftResumed, trackDuplicateBlocked, trackRateLimited, trackSpamDetected } from "@/lib/tracking";
import { addLead, getDraft, setDraft, clearDraft, checkDuplicate, addHash, incrementSubmitCount, getSubmitTracking } from "@/lib/storage";
import { calculateLeadScore } from "@/lib/scoring";
import { normalizePhone, getUTMParams, debounce, generateFingerprint, scrollToElement } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LeadFunnel() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [showRecap, setShowRecap] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartTime] = useState(Date.now());
  const [attemptId] = useState(uuidv4());
  const [hasStarted, setHasStarted] = useState(false);
  const { showToast } = useToast();
  const copy = getCopy(getVariant());

  const stepOneForm = useForm<StepOneInput>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      extras: [],
    },
  });

  const stepTwoForm = useForm<StepTwoInput>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      photos: [],
      consentMarketing: false,
    },
  });

  useEffect(() => {
    const draft = getDraft();
    if (draft) {
      if (draft.serviceType) {
        stepOneForm.reset(draft as any);
      }
      if (draft.firstName) {
        stepTwoForm.reset(draft as any);
      }
      if (draft.currentStep) {
        setCurrentStep(draft.currentStep as 1 | 2 | 3);
      }
    }
  }, []);

  useEffect(() => {
    const saveDraft = debounce(() => {
      const data = {
        ...stepOneForm.getValues(),
        ...stepTwoForm.getValues(),
        currentStep,
      };
      setDraft(data);
      trackDraftSaved();
    }, 500);

    const sub1 = stepOneForm.watch(() => saveDraft());
    const sub2 = stepTwoForm.watch(() => saveDraft());

    return () => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    };
  }, [currentStep]);

  const handleResumeDraft = () => {
    const draft = getDraft();
    if (draft) {
      trackDraftResumed();
      scrollToElement("lead-form");
    }
  };

  const handleStep1Next = async () => {
    const isValid = await stepOneForm.trigger();
    if (isValid) {
      if (!hasStarted) {
        trackFormStart();
        setHasStarted(true);
      }
      trackStepComplete(1);
      setCurrentStep(2);
      scrollToElement("lead-form");
    } else {
      const errors = stepOneForm.formState.errors;
      const errorMessages = Object.entries(errors)
        .map(([field, error]: [string, any]) => {
          const fieldNames: Record<string, string> = {
            serviceType: "Type de nettoyage",
            locality: "Ville",
            propertyType: "Type de bien",
            rooms: "Nombre de pièces",
            approxSurface: "Surface",
            urgency: "Urgence",
          };
          return `• ${fieldNames[field] || field}`;
        })
        .join("\n");

      showToast("error", `Champs manquants:\n${errorMessages}`);

      const firstError = Object.keys(errors)[0];
      setTimeout(() => {
        document.getElementById(firstError)?.scrollIntoView({ behavior: "smooth", block: "center" });
        document.getElementById(firstError)?.focus();
      }, 100);
    }
  };

  const handleStep2Next = async () => {
    const isValid = await stepTwoForm.trigger();
    if (isValid) {
      trackStepComplete(2);
      setShowRecap(true);
      trackRecapViewed();
      scrollToElement("lead-form");
    } else {
      const firstError = Object.keys(stepTwoForm.formState.errors)[0];
      document.getElementById(firstError)?.focus();
      showToast("error", "Veuillez corriger les erreurs du formulaire");
    }
  };

  const handleBack = () => {
    if (showRecap) {
      setShowRecap(false);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
    scrollToElement("lead-form");
  };

  const validateAntiSpam = (): { valid: boolean; error?: string } => {
    const timeToSubmit = Date.now() - formStartTime;

    if (timeToSubmit < 3000) {
      trackSpamDetected("timing", "Too fast");
      return {
        valid: false,
        error: "Veuillez prendre le temps de remplir correctement le formulaire",
      };
    }

    const fingerprint = generateFingerprint();
    const tracking = getSubmitTracking(fingerprint);
    const count = incrementSubmitCount(fingerprint);

    if (count > 3) {
      trackRateLimited(count);
      return {
        valid: false,
        error: "Trop de tentatives. Veuillez réessayer dans quelques minutes.",
      };
    }

    return { valid: true };
  };

  const checkForDuplicate = (lead: Partial<LeadPayload>): boolean => {
    const phone = normalizePhone(lead.phone || "");
    const email = lead.email?.toLowerCase() || "";
    const locality = lead.locality?.toLowerCase() || "";
    const date = lead.moveOutDate || lead.desiredDate || "";

    const hash = `${phone}|${email}|${locality}|${date}`;

    if (checkDuplicate(hash)) {
      trackDuplicateBlocked(hash);
      const confirmed = window.confirm(
        "⚠️ Une demande similaire a déjà été envoyée récemment.\n\nVoulez-vous vraiment soumettre une nouvelle demande ?"
      );

      if (!confirmed) {
        return true;
      }
    }

    addHash(hash);
    return false;
  };

  const handleSubmit = async () => {
    trackFormSubmit();
    setIsSubmitting(true);

    try {
      const antiSpamCheck = validateAntiSpam();
      if (!antiSpamCheck.valid) {
        showToast("error", antiSpamCheck.error!);
        setIsSubmitting(false);
        return;
      }

      const step1Data = stepOneForm.getValues();
      const step2Data = stepTwoForm.getValues();

      const combinedData = {
        ...step1Data,
        ...step2Data,
        honeypot: "",
      };

      const partialLead: Partial<LeadPayload> = {
        ...combinedData,
        leadId: uuidv4(),
        createdAt: new Date().toISOString(),
        locale: "fr-CH",
        region: "Suisse romande",
        pagePath: window.location.pathname,
        referrer: document.referrer || null,
        utm: getUTMParams(),
        phone: normalizePhone(combinedData.phone),
      };

      if (checkForDuplicate(partialLead)) {
        setIsSubmitting(false);
        return;
      }

      const leadScore = calculateLeadScore(partialLead);

      const fullLead: LeadPayload = {
        ...partialLead,
        leadScore,
        antiSpam: {
          honeypot: "",
          timeToSubmitMs: Date.now() - formStartTime,
          attemptId,
          rateLimited: false,
          duplicateCheck: "none",
        },
      } as LeadPayload;

      const validated = leadPayloadSchema.parse(fullLead);

      addLead(validated);
      clearDraft();

      trackFormSuccess(validated.leadId, validated.leadScore.tier, validated.leadScore.score);

      window.location.search = "?thankyou=1&leadId=" + validated.leadId;
    } catch (error: any) {
      console.error("Form submission error:", error);
      trackFormError("submission", error.message || "Unknown error");
      showToast("error", "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const draft = getDraft();

  return (
    <section id="lead-form" className="py-24 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Notre algorithme trouve L'entreprise parfaite pour vous</span>
          </h2>
          <p className="text-lg font-semibold text-gray-700 max-w-2xl mx-auto mb-3">
            Répondez à ces questions précises. Notre système analyse vos besoins et sélectionne LA meilleure entreprise parmi nos partenaires.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-bold">✓</span>
              <span>Analyse intelligente</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-bold">✓</span>
              <span>1 seule entreprise</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-bold">✓</span>
              <span>Match parfait</span>
            </div>
          </div>
        </motion.div>

        {draft && !hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass rounded-2xl p-6 flex items-center justify-between shadow-premium"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <span className="text-xl">💾</span>
              </div>
              <p className="text-sm font-medium text-gray-700">
                Vous avez un brouillon en cours
              </p>
            </div>
            <button
              onClick={handleResumeDraft}
              className="gradient-primary text-white font-medium text-sm px-6 py-2.5 rounded-xl hover:shadow-lg transition-all"
            >
              Reprendre
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl shadow-premium p-8 md:p-12"
        >
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {showRecap
                  ? "✓ Récapitulatif"
                  : currentStep === 1
                  ? `1️⃣ ${copy.form.step1Title}`
                  : `2️⃣ ${copy.form.step2Title}`}
              </h3>
              {!showRecap && (
                <span className="px-4 py-2 rounded-full glass text-sm font-bold text-indigo-600">
                  Étape {copy.form.progressLabel(currentStep)}
                </span>
              )}
            </div>

            {!showRecap && (
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep / 2) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full gradient-primary rounded-full"
                />
                {/* Progress glow effect */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep / 2) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 h-full gradient-primary blur-md opacity-50"
                />
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!showRecap && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 1 && <StepOne form={stepOneForm} />}
                {currentStep === 2 && <StepTwo form={stepTwoForm} />}
              </motion.div>
            )}

            {showRecap && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <LeadRecap
                  lead={{
                    ...stepOneForm.getValues(),
                    ...stepTwoForm.getValues(),
                  }}
                  onModify={() => setShowRecap(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-4">
            {(currentStep === 2 || showRecap) && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-4 text-gray-700 font-bold hover:bg-gray-100 border-2 border-gray-300 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                {copy.form.backButton}
              </motion.button>
            )}

            {currentStep === 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStep1Next}
                className="ml-auto flex items-center gap-3 px-10 py-4 gradient-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-glow transition-all text-lg"
              >
                {copy.form.nextButton}
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            )}

            {currentStep === 2 && !showRecap && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStep2Next}
                className="ml-auto flex items-center gap-3 px-10 py-4 gradient-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-glow transition-all text-lg"
              >
                {copy.form.nextButton}
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            )}

            {showRecap && (
              <motion.button
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={cn(
                  "ml-auto flex items-center gap-3 px-10 py-4 gradient-accent text-white font-bold rounded-2xl shadow-glow transition-all text-lg relative overflow-hidden",
                  isSubmitting && "opacity-75 cursor-not-allowed"
                )}
              >
                {isSubmitting && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
                <span className="relative z-10">
                  {isSubmitting ? "⏳ Envoi en cours..." : `✨ ${copy.form.submitButton}`}
                </span>
                <Send className="w-6 h-6 relative z-10" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
