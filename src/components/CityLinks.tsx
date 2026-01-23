import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { cities } from "@/lib/cityContent";

export function CityLinks() {
  const cityList = Object.values(cities);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="gradient-text">Trouvez votre entreprise locale</span>
          </h2>
          <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto">
            Sélectionnez votre ville ou canton pour accéder aux entreprises partenaires certifiées dans votre région
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cityList.map((city, index) => (
            <motion.a
              key={city.slug}
              href={`/${city.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass rounded-2xl p-6 hover:shadow-premium transition-all group block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-xs text-gray-600">Canton de {city.canton}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>

              <p className="text-sm text-gray-700 line-clamp-2">
                Entreprises certifiées spécialisées {city.name}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Disponible 24h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Certifié</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* SEO text section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Nettoyage fin de bail dans toute la Suisse romande
          </h3>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p>
              Notre plateforme vous met en relation avec les <strong>meilleures entreprises de nettoyage de fin de bail</strong> dans votre région.
              Que vous soyez à <strong>Genève</strong>, <strong>Lausanne</strong>, dans le <strong>canton de Vaud</strong>, en <strong>Valais</strong>,
              à <strong>Fribourg</strong> ou à <strong>Neuchâtel</strong>, notre algorithme intelligent sélectionne automatiquement l'entreprise
              la plus adaptée à vos besoins spécifiques.
            </p>
            <p>
              Chaque <strong>nettoyage de fin de bail</strong> est unique : surface du logement, type de bien (appartement, maison, studio),
              urgence du délai, prestations spéciales nécessaires (four, vitres, tapis). Notre système analyse tous ces critères pour vous
              proposer <strong>UNE seule entreprise certifiée</strong> qui correspond parfaitement à votre situation.
            </p>
            <p>
              Les entreprises partenaires de notre réseau connaissent les exigences strictes des régies immobilières suisses et garantissent
              un travail conforme aux standards. <strong>100% de validation garantie par la Régie</strong> avec re-passage gratuit si nécessaire
              jusqu'à validation complète de votre état des lieux.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
