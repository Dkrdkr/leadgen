import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { getCityBySlug, getCityMeta } from "@/lib/cityContent";
import { getCopy } from "@/lib/copy";
import { getVariant } from "@/lib/tracking";
import { HeroSection } from "@/components/Sections";
import { LeadFunnel } from "@/components/LeadFunnel";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";

interface CityLandingProps {
  citySlug: string;
}

export function CityLanding({ citySlug }: CityLandingProps) {
  const city = getCityBySlug(citySlug);
  const meta = getCityMeta(citySlug);
  const copy = getCopy(getVariant());

  if (!city || !meta) {
    return null;
  }

  // Schema.org LocalBusiness + FAQPage markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://nettoyage-suisse.ch/${city.slug}#business`,
        name: `Nettoyage fin de bail ${city.name}`,
        description: meta.description,
        url: `https://nettoyage-suisse.ch/${city.slug}`,
        telephone: "+41 XX XXX XX XX",
        priceRange: "CHF 150-800",
        address: {
          "@type": "PostalAddress",
          addressLocality: city.schema.addressLocality,
          addressRegion: city.schema.addressRegion,
          postalCode: city.schema.postalCode || "",
          addressCountry: "CH",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "46.5",
          longitude: "6.6",
        },
        areaServed: {
          "@type": "City",
          name: city.name,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "127",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `https://nettoyage-suisse.ch/${city.slug}#faq`,
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "Service",
        "@id": `https://nettoyage-suisse.ch/${city.slug}#service`,
        serviceType: "Nettoyage de fin de bail",
        provider: {
          "@id": `https://nettoyage-suisse.ch/${city.slug}#business`,
        },
        areaServed: {
          "@type": "City",
          name: city.name,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services de nettoyage",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Nettoyage fin de bail complet",
                description: "Nettoyage complet pour récupérer votre caution",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Nettoyage cuisine et four",
                description: "Dégraissage complet cuisine et four décapé",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Nettoyage vitres",
                description: "Vitres intérieures et extérieures sans traces",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={meta.canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_CH" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle} />
        <meta name="twitter:description" content={meta.ogDescription} />

        {/* Local SEO */}
        <meta name="geo.region" content={`CH-${city.schema.addressRegion}`} />
        <meta name="geo.placename" content={city.name} />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        {/* City-specific Hero */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-gray-600 mb-6"
            >
              <a href="/" className="hover:text-indigo-600 transition-colors">
                Accueil
              </a>
              <span>/</span>
              <span className="text-gray-900 font-medium">{city.name}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-10"
            >
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-gray-900">
                  Service spécialisé {city.name} · Canton de {city.canton}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                {city.h1}
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 font-semibold max-w-4xl mx-auto mb-8 leading-relaxed">
                {city.localContent.intro}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Entreprises certifiées {city.canton}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">4.8/5 sur 127 avis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Réponse sous 24h</span>
                </div>
              </div>

              <a href="#lead-form" className="inline-flex">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-10 py-5 gradient-primary text-white font-bold rounded-2xl shadow-glow text-lg flex items-center gap-3"
                >
                  Trouver mon entreprise à {city.name}
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl font-black gradient-text mb-2">94%</div>
                <div className="text-sm text-gray-700 font-medium">
                  Taux de validation état des lieux à {city.name}
                </div>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl font-black gradient-text mb-2">&lt;24h</div>
                <div className="text-sm text-gray-700 font-medium">
                  Délai de réponse garanti
                </div>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl font-black gradient-text mb-2">1</div>
                <div className="text-sm text-gray-700 font-medium">
                  Seule entreprise vous contacte (pas 10)
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <TrustBar />

        {/* Why local section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 md:p-12 shadow-premium"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                <span className="gradient-text">
                  Pourquoi choisir une entreprise spécialisée {city.name} ?
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {city.localContent.whyLocal}
              </p>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Zones couvertes à {city.name} :
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {city.localContent.coverage.map((zone, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{zone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lead form */}
        <LeadFunnel />

        {/* FAQ */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
