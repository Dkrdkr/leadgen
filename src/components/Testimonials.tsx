import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sophie M.",
    location: "Lausanne",
    rating: 5,
    text: "J'ai eu ma fin de bail dans 4 jours et je paniquais. L'entreprise recommandée m'a appelée en 2h, devis en 30 min, nettoyage fait le lendemain. État des lieux validé ! Merci !",
    verified: true,
  },
  {
    name: "Marc D.",
    location: "Genève",
    rating: 5,
    text: "Enfin un service qui ne te spam pas avec 10 entreprises ! Une seule m'a contacté, super pro, prix correct. Mon dépôt récupéré intégralement. Top !",
    verified: true,
  },
  {
    name: "Amélie R.",
    location: "Sion",
    rating: 5,
    text: "La régie était exigeante (four, frigo, joints...). L'entreprise connaissait exactement les standards. Nettoyage impeccable, zéro remarque sur l'état des lieux. Je recommande à 200% !",
    verified: true,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Note moyenne : 4.9/5</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Ils ont récupéré leur dépôt</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des centaines de locataires suisses ont utilisé ce service pour trouver une entreprise certifiée
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 shadow-premium hover:shadow-glow transition-all relative"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="w-12 h-12 text-indigo-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                {testimonial.verified && (
                  <div className="px-3 py-1 rounded-full bg-green-100 border border-green-300">
                    <span className="text-xs font-bold text-green-700">✓ Vérifié</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 glass px-8 py-4 rounded-2xl shadow-premium">
            <div>
              <p className="text-3xl font-black gradient-text">847</p>
              <p className="text-sm text-gray-600">Leads ce mois-ci</p>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div>
              <p className="text-3xl font-black gradient-text">94%</p>
              <p className="text-sm text-gray-600">Dépôts récupérés</p>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div>
              <p className="text-3xl font-black gradient-text">24h</p>
              <p className="text-sm text-gray-600">Réponse moyenne</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
