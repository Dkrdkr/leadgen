import { UseFormReturn } from "react-hook-form";
import { Calendar } from "lucide-react";
import { StepOneInput, availableExtras, swissCities } from "@/lib/validation";
import { serviceTypeLabels } from "@/lib/copy";
import { cn } from "@/lib/utils";

interface StepOneProps {
  form: UseFormReturn<StepOneInput>;
}

export function StepOne({ form }: StepOneProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const serviceType = watch("serviceType");
  const isFinDeBail = serviceType === "fin-de-bail";

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-bold text-gray-900 mb-2">
          1️⃣ Décrivez votre besoin en nettoyage
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Cette information nous permet de sélectionner les entreprises spécialisées dans ce type de prestation
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(serviceTypeLabels).map(([value, label]) => (
            <label
              key={value}
              className={cn(
                "border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-primary",
                watch("serviceType") === value
                  ? "border-primary bg-primary-50"
                  : "border-gray-200"
              )}
            >
              <input
                type="radio"
                value={value}
                {...register("serviceType")}
                className="sr-only"
              />
              <div className="font-medium text-gray-900">{label}</div>
            </label>
          ))}
        </div>
        {errors.serviceType && (
          <p className="mt-2 text-sm text-red-600">
            {errors.serviceType.message}
          </p>
        )}
      </div>

      {serviceType === "autre" && (
        <div>
          <label
            htmlFor="serviceTypeOther"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Précisez le type de service *
          </label>
          <input
            id="serviceTypeOther"
            type="text"
            {...register("serviceTypeOther")}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary-200 focus:outline-none"
            placeholder="Ex: Nettoyage de chantier"
          />
          {errors.serviceTypeOther && (
            <p className="mt-2 text-sm text-red-600">
              {errors.serviceTypeOther.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor="locality"
          className="block text-base font-bold text-gray-900 mb-2"
        >
          2️⃣ Localisation précise du bien à nettoyer
        </label>
        <input
          id="locality"
          type="text"
          {...register("locality")}
          list="swiss-cities"
          className={cn(
            "w-full px-4 py-3 text-lg border-2 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all",
            errors.locality ? "border-red-500 bg-red-50" : "border-gray-300"
          )}
          placeholder="Tapez votre ville (ex: Lausanne, Genève, Sion...)"
        />
        <p className="mt-1 text-xs text-gray-500">
          Notre algorithme sélectionnera une entreprise certifiée dans votre canton
        </p>
        <datalist id="swiss-cities">
          {swissCities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
        {errors.locality && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.locality.message}</p>
        )}
      </div>

      <div>
        <label className="block text-base font-bold text-gray-900 mb-3">
          3️⃣ Caractéristiques du bien (pour estimer l'équipement nécessaire)
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Ces détails permettent de sélectionner une entreprise équipée pour votre surface et type de bien
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <select
              id="propertyType"
              {...register("propertyType")}
              className={cn(
                "w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base",
                errors.propertyType ? "border-red-500 bg-red-50" : "border-gray-300"
              )}
            >
              <option value="">Type de bien *</option>
              <option value="Appartement">🏢 Appartement</option>
              <option value="Maison">🏠 Maison</option>
              <option value="Bureau">💼 Bureau</option>
              <option value="Commerce">🏪 Commerce</option>
              <option value="Autre">➕ Autre</option>
            </select>
            {errors.propertyType && (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {errors.propertyType.message}
              </p>
            )}
          </div>

          <div>
            <select
              id="rooms"
              {...register("rooms")}
              className={cn(
                "w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base",
                errors.rooms ? "border-red-500 bg-red-50" : "border-gray-300"
              )}
            >
              <option value="">Nb. de pièces *</option>
              <option value="Studio">Studio</option>
              <option value="2">2 pièces</option>
              <option value="3">3 pièces</option>
              <option value="4">4 pièces</option>
              <option value="5+">5+ pièces</option>
              <option value="Non applicable">Non applicable</option>
            </select>
            {errors.rooms && (
              <p className="mt-1 text-sm text-red-600 font-medium">{errors.rooms.message}</p>
            )}
          </div>

          <div>
            <select
              id="approxSurface"
              {...register("approxSurface")}
              className={cn(
                "w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base",
                errors.approxSurface ? "border-red-500 bg-red-50" : "border-gray-300"
              )}
            >
            <option value="">Surface *</option>
            <option value="<40m²">&lt; 40m²</option>
            <option value="40-70m²">40-70m²</option>
            <option value="70-100m²">70-100m²</option>
            <option value="100-150m²">100-150m²</option>
            <option value="150m²+">150m²+</option>
            <option value="Inconnue">Inconnue</option>
          </select>
          {errors.approxSurface && (
            <p className="mt-2 text-sm text-red-600">
              {errors.approxSurface.message}
            </p>
          )}
        </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isFinDeBail && (
          <div>
            <label
              htmlFor="moveOutDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date de fin de bail *
            </label>
            <div className="relative">
              <input
                id="moveOutDate"
                type="date"
                {...register("moveOutDate")}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary-200 focus:outline-none"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.moveOutDate && (
              <p className="mt-2 text-sm text-red-600">
                {errors.moveOutDate.message}
              </p>
            )}
          </div>
        )}

        {!isFinDeBail && (
          <div>
            <label
              htmlFor="desiredDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date souhaitée
            </label>
            <div className="relative">
              <input
                id="desiredDate"
                type="date"
                {...register("desiredDate")}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary-200 focus:outline-none"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.desiredDate && (
              <p className="mt-2 text-sm text-red-600">
                {errors.desiredDate.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="urgency"
            className="block text-base font-bold text-gray-900 mb-2"
          >
            4️⃣ Votre délai (critère de sélection prioritaire)
          </label>
          <select
            id="urgency"
            {...register("urgency")}
            className={cn(
              "w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base",
              errors.urgency ? "border-red-500 bg-red-50" : "border-gray-300"
            )}
          >
            <option value="">Sélectionner l'urgence *</option>
            <option value="Urgent (<7j)">🔴 URGENT (moins de 7 jours)</option>
            <option value="Normal (7-30j)">🟡 Normal (7-30 jours)</option>
            <option value="Flexible (>30j)">🟢 Flexible (plus de 30 jours)</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Seules les entreprises disponibles dans ce délai seront sélectionnées
          </p>
          {errors.urgency && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.urgency.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-base font-bold text-gray-900 mb-2">
          5️⃣ Prestations spéciales nécessaires <span className="text-gray-500 font-normal text-sm">(optionnel mais recommandé)</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Ces extras aident notre algorithme à trouver une entreprise équipée pour vos besoins spécifiques
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableExtras.map((extra) => (
            <label
              key={extra}
              className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition-all group"
            >
              <input
                type="checkbox"
                value={extra}
                {...register("extras")}
                className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
              />
              <span className="text-base text-gray-700 group-hover:text-gray-900 group-hover:font-medium">{extra}</span>
            </label>
          ))}
        </div>
        {errors.extras && (
          <p className="mt-2 text-sm text-red-600">{errors.extras.message}</p>
        )}
      </div>
    </div>
  );
}
