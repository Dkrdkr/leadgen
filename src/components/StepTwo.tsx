import { UseFormReturn } from "react-hook-form";
import { StepTwoInput } from "@/lib/validation";
import { PhotoUpload } from "./PhotoUpload";
import { trackConsentChecked } from "@/lib/tracking";
import { PhotoData } from "@/lib/types";

interface StepTwoProps {
  form: UseFormReturn<StepTwoInput>;
}

export function StepTwo({ form }: StepTwoProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const photos = watch("photos") || [];

  const handlePhotosChange = (newPhotos: PhotoData[]) => {
    setValue("photos", newPhotos);
  };

  const handleConsentChange = (type: string, checked: boolean) => {
    if (checked) {
      trackConsentChecked(type);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 border-2 border-green-200 bg-green-50/50">
        <p className="text-base font-bold text-gray-900 mb-2">
          ✅ Dernière étape : comment vous contacter ?
        </p>
        <p className="text-sm text-gray-600">
          L'entreprise a besoin de vos coordonnées pour vous envoyer un devis personnalisé. <span className="font-bold text-gray-900">Ces infos sont transmises à UNE SEULE entreprise.</span> Pas de revente, pas de spam.
        </p>
      </div>

      <div>
        <label
          htmlFor="firstName"
          className="block text-base font-bold text-gray-900 mb-2"
        >
          Comment vous appelez-vous ?
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
          placeholder="Votre prénom (ex: Marie, Thomas...)"
        />
        <p className="mt-1 text-xs text-gray-500">
          Juste votre prénom suffit
        </p>
        {errors.firstName && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.firstName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-base font-bold text-gray-900 mb-2"
          >
            Votre numéro de téléphone
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
            placeholder="+41 79 123 45 67"
          />
          <p className="mt-1 text-xs text-gray-500">
            Pour que l'entreprise puisse vous appeler rapidement
          </p>
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-base font-bold text-gray-900 mb-2"
          >
            Votre email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
            placeholder="votre@email.ch"
          />
          <p className="mt-1 text-xs text-gray-500">
            Pour recevoir la confirmation par écrit
          </p>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contactPreference"
            className="block text-base font-bold text-gray-900 mb-2"
          >
            Comment préférez-vous être contacté ?
          </label>
          <select
            id="contactPreference"
            {...register("contactPreference")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base"
          >
            <option value="">Choisir un mode de contact</option>
            <option value="Téléphone">📞 Appel téléphonique</option>
            <option value="WhatsApp">💬 WhatsApp</option>
            <option value="Email">📧 Email uniquement</option>
          </select>
          {errors.contactPreference && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.contactPreference.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="timeWindow"
            className="block text-base font-bold text-gray-900 mb-2"
          >
            Quand êtes-vous disponible ?
          </label>
          <select
            id="timeWindow"
            {...register("timeWindow")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base"
          >
            <option value="">Choisir un créneau</option>
            <option value="Matin (8h-12h)">🌅 Matin (8h-12h)</option>
            <option value="Midi (12h-14h)">🍽️ Midi (12h-14h)</option>
            <option value="Après-midi (14h-18h)">☀️ Après-midi (14h-18h)</option>
            <option value="Soir (18h-20h)">🌆 Soir (18h-20h)</option>
            <option value="Peu importe">⏰ Peu importe</option>
          </select>
          {errors.timeWindow && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.timeWindow.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="accessNotes"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Notes complémentaires (optionnel)
        </label>
        <textarea
          id="accessNotes"
          {...register("accessNotes")}
          rows={4}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary-200 focus:outline-none resize-none"
          placeholder="Ex: Code d'accès, étage, état particulier du bien, difficultés d'accès..."
          maxLength={500}
        />
        <div className="flex justify-between mt-1">
          <div>
            {errors.accessNotes && (
              <p className="text-sm text-red-600">{errors.accessNotes.message}</p>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {watch("accessNotes")?.length || 0}/500
          </span>
        </div>
      </div>

      <PhotoUpload photos={photos} onChange={handlePhotosChange} />

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consentPartnerContact"
            {...register("consentPartnerContact", {
              onChange: (e) =>
                handleConsentChange("partner", e.target.checked),
            })}
            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label
            htmlFor="consentPartnerContact"
            className="text-sm text-gray-700 leading-relaxed"
          >
            J'accepte d'être contacté(e) par une entreprise partenaire pour
            répondre à ma demande de nettoyage. *
          </label>
        </div>
        {errors.consentPartnerContact && (
          <p className="text-sm text-red-600 ml-7">
            {errors.consentPartnerContact.message}
          </p>
        )}

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consentPrivacy"
            {...register("consentPrivacy", {
              onChange: (e) => handleConsentChange("privacy", e.target.checked),
            })}
            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label
            htmlFor="consentPrivacy"
            className="text-sm text-gray-700 leading-relaxed"
          >
            J'ai lu et j'accepte la{" "}
            <a href="#privacy" className="text-primary hover:underline">
              politique de confidentialité
            </a>{" "}
            et le traitement de mes données personnelles conformément à la LPD.
            *
          </label>
        </div>
        {errors.consentPrivacy && (
          <p className="text-sm text-red-600 ml-7">
            {errors.consentPrivacy.message}
          </p>
        )}

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consentMarketing"
            {...register("consentMarketing", {
              onChange: (e) =>
                handleConsentChange("marketing", e.target.checked),
            })}
            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label
            htmlFor="consentMarketing"
            className="text-sm text-gray-700 leading-relaxed"
          >
            J'accepte de recevoir des offres et actualités par email (optionnel)
          </label>
        </div>
      </div>

      <input
        type="text"
        {...register("honeypot" as any)}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none", position: "absolute", left: "-9999px" }}
        aria-hidden="true"
      />
    </div>
  );
}
