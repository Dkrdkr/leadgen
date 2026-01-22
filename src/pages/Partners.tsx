import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle2,
  TrendingUp,
  Users,
  Target,
  Zap,
  Euro,
  BarChart3,
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { trackPageView } from "@/lib/tracking";

export function Partners() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <Helmet>
        <title>Devenir Partenaire | NetPro Suisse - Leads Qualifiés Nettoyage</title>
        <meta
          name="description"
          content="Recevez des leads ultra-qualifiés de clients recherchant des services de nettoyage en Suisse romande. Pricing transparent, ROI garanti."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 gradient-aurora opacity-20" />
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 shadow-premium">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">
                  Programme Partenaires B2B
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]">
                <span className="gradient-text">
                  Développez votre activité avec des leads qualifiés
                </span>
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
                Recevez uniquement des demandes ultra-qualifiées de clients prêts à payer pour vos services de nettoyage
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:contact@netpro-suisse.ch?subject=Devenir Partenaire"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 gradient-primary text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-glow hover:shadow-glow-lg transition-all"
                >
                  Devenir Partenaire
                  <ArrowRight className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 glass text-gray-700 font-bold text-lg px-10 py-5 rounded-2xl shadow-premium hover:shadow-glow transition-all"
                >
                  Voir les tarifs
                  <Euro className="w-6 h-6" />
                </motion.a>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Paiement au lead</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>ROI garanti</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, value: "92%", label: "Taux de conversion moyen" },
                { icon: Users, value: "500+", label: "Leads générés/mois" },
                { icon: Target, value: "85%", label: "Leads Tier A ou B" },
                { icon: Zap, value: "<2h", label: "Délai de transmission" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl p-8 text-center shadow-premium hover:shadow-glow transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="gradient-text">Pourquoi nous rejoindre ?</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Leads ultra-qualifiés",
                  description: "Système de scoring automatique. Vous recevez uniquement des leads avec score élevé et besoin réel.",
                  features: ["Score 0-100", "Tier A/B/C", "Photos incluses", "Notes détaillées"]
                },
                {
                  icon: Shield,
                  title: "Anti-spam robuste",
                  description: "Honeypot, rate limiting, déduplication. Zéro spam, zéro perte de temps.",
                  features: ["Honeypot", "Rate limiting", "Déduplication 48h", "Emails jetables bloqués"]
                },
                {
                  icon: BarChart3,
                  title: "Dashboard en temps réel",
                  description: "Suivez vos leads, stats de conversion, et ROI en temps réel via votre interface dédiée.",
                  features: ["Stats live", "Export CSV/JSON", "Filtres avancés", "Timeline événements"]
                },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl p-8 shadow-premium hover:shadow-glow transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{benefit.description}</p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 md:py-32 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="gradient-text">Tarification Simple & Transparente</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Payez uniquement pour les leads reçus. Aucun frais caché, aucun engagement.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  tier: "C",
                  name: "Basique",
                  price: "15",
                  color: "gray",
                  features: [
                    "Score < 50 points",
                    "Informations complètes",
                    "Photos possibles",
                    "Support email",
                  ]
                },
                {
                  tier: "B",
                  name: "Standard",
                  price: "35",
                  color: "orange",
                  popular: true,
                  features: [
                    "Score 50-79 points",
                    "Tout du Basique +",
                    "Photos fréquentes",
                    "Priorité moyenne",
                    "Support prioritaire",
                  ]
                },
                {
                  tier: "A",
                  name: "Premium",
                  price: "75",
                  color: "green",
                  features: [
                    "Score 80-100 points",
                    "Tout du Standard +",
                    "Photos garanties",
                    "Clients urgents",
                    "Priorité maximale",
                    "Support dédié",
                  ]
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass rounded-3xl p-8 shadow-premium hover:shadow-glow transition-all relative ${
                    plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-primary text-white text-xs font-bold rounded-full">
                      LE PLUS POPULAIRE
                    </div>
                  )}

                  <div className={`w-16 h-16 rounded-2xl bg-${plan.color}-100 flex items-center justify-center mb-6 text-2xl font-black text-${plan.color}-600`}>
                    {plan.tier}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-black gradient-text">{plan.price} CHF</span>
                    <span className="text-gray-600"> / lead</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-5 h-5 text-${plan.color}-500 flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="mailto:contact@netpro-suisse.ch?subject=Tarif Lead Tier ${plan.tier}"
                    className={`block text-center font-bold py-4 rounded-2xl transition-all ${
                      plan.popular
                        ? 'gradient-primary text-white shadow-lg hover:shadow-glow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Commencer
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
                <h4 className="text-xl font-bold text-gray-900 mb-4">💰 Volume Discounts</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-bold text-indigo-600 mb-1">10-50 leads/mois</div>
                    <div className="text-gray-600">-10% de réduction</div>
                  </div>
                  <div>
                    <div className="font-bold text-indigo-600 mb-1">51-100 leads/mois</div>
                    <div className="text-gray-600">-15% de réduction</div>
                  </div>
                  <div>
                    <div className="font-bold text-indigo-600 mb-1">100+ leads/mois</div>
                    <div className="text-gray-600">-20% de réduction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 gradient-aurora opacity-20" />

          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-12 md:p-16 text-center shadow-premium"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="gradient-text">Prêt à développer votre activité ?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Rejoignez les entreprises partenaires qui font confiance à NetPro Suisse pour leur génération de leads.
              </p>

              <a
                href="mailto:contact@netpro-suisse.ch?subject=Devenir Partenaire NetPro"
                className="inline-flex items-center gap-3 gradient-primary text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-glow hover:shadow-glow-lg transition-all"
              >
                Contactez-nous
                <ArrowRight className="w-6 h-6" />
              </a>

              <p className="mt-6 text-sm text-gray-500">
                Réponse sous 24h • Sans engagement • Support dédié
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
