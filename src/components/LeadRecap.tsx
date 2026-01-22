import { LeadPayload } from "@/lib/types";
import { maskEmail, maskPhone, formatDate } from "@/lib/utils";
import {
  serviceTypeLabels,
  propertyTypeLabels,
  urgencyLabels,
} from "@/lib/copy";
import { Edit2 } from "lucide-react";

interface LeadRecapProps {
  lead: Partial<LeadPayload>;
  onModify: () => void;
}

export function LeadRecap({ lead, onModify }: LeadRecapProps) {
  const renderDate = () => {
    if (lead.moveOutDate) {
      return formatDate(lead.moveOutDate);
    }
    if (lead.desiredDate) {
      return formatDate(lead.desiredDate);
    }
    return "Non précisée";
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          Récapitulatif de votre demande
        </h3>
        <button
          type="button"
          onClick={onModify}
          className="text-primary hover:text-primary-700 flex items-center gap-2 text-sm font-medium"
        >
          <Edit2 className="w-4 h-4" />
          Modifier
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
              Service
            </div>
            <div className="text-sm text-gray-900">
              {serviceTypeLabels[lead.serviceType || ""]}
              {lead.serviceTypeOther && ` - ${lead.serviceTypeOther}`}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
              Localité
            </div>
            <div className="text-sm text-gray-900">{lead.locality}</div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
              Type de bien
            </div>
            <div className="text-sm text-gray-900">
              {propertyTypeLabels[lead.propertyType || ""]} -{" "}
              {lead.rooms === "Non applicable"
                ? lead.rooms
                : `${lead.rooms} pièces`}{" "}
              - {lead.approxSurface}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
              Date souhaitée
            </div>
            <div className="text-sm text-gray-900">{renderDate()}</div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
              Urgence
            </div>
            <div className="text-sm text-gray-900">
              {urgencyLabels[lead.urgency || ""]}
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-gray-500 uppercase mb-2">
            Prestations sélectionnées ({lead.extras?.length || 0})
          </div>
          <div className="flex flex-wrap gap-2">
            {lead.extras?.map((extra) => (
              <span
                key={extra}
                className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
              >
                {extra}
              </span>
            ))}
          </div>
        </div>

        {lead.accessNotes && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
              Notes complémentaires
            </div>
            <div className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
              {lead.accessNotes}
            </div>
          </div>
        )}

        {lead.photos && lead.photos.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-2">
              Photos jointes ({lead.photos.length})
            </div>
            <div className="flex gap-2">
              {lead.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.dataUrl}
                  alt={photo.name}
                  className="w-20 h-20 object-cover rounded border border-gray-200"
                />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase mb-2">
            Vos coordonnées
          </div>
          <div className="space-y-2 text-sm text-gray-900">
            <div>
              <span className="font-medium">Prénom:</span> {lead.firstName}
            </div>
            <div>
              <span className="font-medium">Téléphone:</span>{" "}
              {lead.phone ? maskPhone(lead.phone) : ""}
            </div>
            <div>
              <span className="font-medium">Email:</span>{" "}
              {lead.email ? maskEmail(lead.email) : ""}
            </div>
            <div>
              <span className="font-medium">Contact préféré:</span>{" "}
              {lead.contactPreference}
            </div>
            <div>
              <span className="font-medium">Créneau:</span> {lead.timeWindow}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🔒</span>
          </div>
          <div>
            <p className="text-base font-black text-gray-900 mb-2">
              ✅ Dernière étape — Envoyez votre demande
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              En cliquant sur "Envoyer ma demande", vos informations seront transmises à <span className="font-bold">UNE SEULE entreprise certifiée</span> de votre canton. Vous serez contacté sous 24h maximum.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="px-3 py-1 bg-white rounded-full border border-green-300">
                <span className="font-bold text-green-700">✓ 100% gratuit</span>
              </div>
              <div className="px-3 py-1 bg-white rounded-full border border-green-300">
                <span className="font-bold text-green-700">✓ Sans engagement</span>
              </div>
              <div className="px-3 py-1 bg-white rounded-full border border-green-300">
                <span className="font-bold text-green-700">✓ Données sécurisées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
