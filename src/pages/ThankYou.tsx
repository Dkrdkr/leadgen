import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Download, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCopy } from "@/lib/copy";
import { getVariant, trackPageView } from "@/lib/tracking";
import { getLeads } from "@/lib/storage";
import { LeadPayload } from "@/lib/types";
import { thankYouSEO } from "@/lib/seo";
import { downloadJSON, maskEmail, maskPhone, formatDate } from "@/lib/utils";
import { serviceTypeLabels } from "@/lib/copy";

export function ThankYou() {
  const [lead, setLead] = useState<LeadPayload | null>(null);
  const copy = getCopy(getVariant());

  useEffect(() => {
    trackPageView();

    const params = new URLSearchParams(window.location.search);
    const leadId = params.get("leadId");

    if (leadId) {
      const leads = getLeads();
      const foundLead = leads.find((l) => l.leadId === leadId);
      if (foundLead) {
        setLead(foundLead);
      }
    }
  }, []);

  const handleDownload = () => {
    if (lead) {
      downloadJSON(lead, `lead-${lead.leadId}.json`);
    }
  };

  const handleModify = () => {
    window.location.search = "";
  };

  return (
    <>
      <Helmet>
        <title>{thankYouSEO.title}</title>
        <meta name="description" content={thankYouSEO.description} />
        <link rel="canonical" href={thankYouSEO.canonical} />
        <meta property="og:title" content={thankYouSEO.ogTitle} />
        <meta property="og:type" content={thankYouSEO.ogType} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {copy.thankYou.title}
              </h1>
              <p className="text-lg text-gray-600">{copy.thankYou.subtitle}</p>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Prochaines étapes
              </h2>
              <div className="space-y-6">
                {copy.thankYou.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-blue-900 mb-2">
                {copy.thankYou.transparencyBox.title}
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                {copy.thankYou.transparencyBox.content}
              </p>
            </div>

            {lead && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">
                  Résumé de votre demande
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Service :</dt>
                    <dd className="font-medium text-gray-900">
                      {serviceTypeLabels[lead.serviceType]}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Localité :</dt>
                    <dd className="font-medium text-gray-900">
                      {lead.locality}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Date souhaitée :</dt>
                    <dd className="font-medium text-gray-900">
                      {lead.moveOutDate
                        ? formatDate(lead.moveOutDate)
                        : lead.desiredDate
                        ? formatDate(lead.desiredDate)
                        : "Non précisée"}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <dt className="text-gray-600 mb-2">Contact :</dt>
                    <dd className="font-medium text-gray-900">
                      {lead.firstName}
                      <br />
                      {maskPhone(lead.phone)}
                      <br />
                      {maskEmail(lead.email)}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleModify}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {copy.thankYou.actions.modify}
              </button>
              {lead && (
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  {copy.thankYou.actions.download}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
