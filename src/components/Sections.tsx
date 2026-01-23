import { ArrowRight, CheckCircle2, Target, Clock, Info, Sparkles, Shield, Zap, Search, Users, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { getCopy } from "@/lib/copy";
import { getVariant, trackCTAClick } from "@/lib/tracking";
import { scrollToElement } from "@/lib/utils";

const iconMap = {
  CheckCircle2,
  Target,
  Clock,
  Search,
  Users,
};

const problemIconMap = {
  Search,
  Users,
  Clock,
};

export function HeroSection() {
  const copy = getCopy(getVariant());

  const handleCTAClick = () => {
    trackCTAClick("hero");
    scrollToElement("lead-form");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-aurora opacity-20" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge avec preuve sociale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 shadow-premium border-2 border-green-500/20"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-gray-800">
              <span className="text-green-600">847 locataires</span> ont trouvé leur entreprise ce mois-ci
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]">
            <span className="gradient-text">
              {copy.hero.h1}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6 font-medium max-w-3xl mx-auto leading-relaxed">
            {copy.hero.subheadline}
          </p>

          {/* Value Proposition */}
          <p className="text-base md:text-lg text-indigo-600 font-semibold mb-12 max-w-2xl mx-auto">
            {copy.hero.valueProposition}
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCTAClick}
            className="inline-flex items-center gap-3 gradient-primary text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
          >
            {copy.hero.cta}
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            {copy.hero.microcopy}
          </motion.p>

          {/* Social proof / trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { icon: Shield, label: "Données sécurisées" },
              { icon: Zap, label: "Réponse rapide" },
              { icon: Target, label: "Ciblage précis" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-xs font-medium text-gray-600">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function TransparencySection() {
  const copy = getCopy(getVariant());

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Urgency bar - personnes actives */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-orange-50 border-2 border-orange-200">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 border-2 border-white" />
            </div>
            <span className="text-sm font-bold text-orange-900">
              <span className="text-orange-600">23 personnes</span> sont en train de remplir le formulaire maintenant
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 shadow-premium relative overflow-hidden border-2 border-orange-200"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl" />

          <div className="relative flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Info className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                {copy.transparency.title}
              </h3>
              <div className="space-y-3 text-gray-700 leading-relaxed font-medium">
                {copy.transparency.content.map((line, index) => (
                  <p key={index} className="flex items-start gap-2 text-base">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function WhyDifferentSection() {
  const copy = getCopy(getVariant());

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">{copy.whyDifferent.title}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {copy.whyDifferent.benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-8 shadow-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden group"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-all duration-300" />

                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const copy = getCopy(getVariant());

  return (
    <section id="comment-ca-marche" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">{copy.howItWorks.title}</span>
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 -translate-y-1/2 rounded-full" />

          <div className="grid md:grid-cols-3 gap-12 relative">
            {copy.howItWorks.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass rounded-3xl p-8 shadow-premium hover:shadow-glow transition-all duration-300 relative z-10">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-3xl font-black text-white mb-6 mx-auto shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center text-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatYouGetSection() {
  const copy = getCopy(getVariant());

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">{copy.whatYouGet.title}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-10 md:p-14 shadow-premium"
        >
          <ul className="space-y-6">
            {copy.whatYouGet.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg md:text-xl text-gray-700 font-medium">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  const copy = getCopy(getVariant());

  return (
    <section className="py-24 md:py-32 relative bg-gradient-to-b from-red-50/50 to-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 font-bold text-sm mb-6">
            <AlertTriangle className="w-4 h-4" />
            Le problème
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
            {copy.problem.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
            {copy.problem.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.problem.issues.map((issue, index) => {
            const Icon = problemIconMap[issue.icon as keyof typeof problemIconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass rounded-3xl p-8 shadow-premium hover:shadow-glow transition-all duration-300 border-2 border-red-200/50"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {issue.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {issue.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Solution teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl glass border-2 border-green-500/30 shadow-premium max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-xl font-black text-gray-900">
                Notre solution : Un algorithme fait l'analyse pour vous
              </span>
            </div>
            <p className="text-base text-gray-700 font-medium">
              Vous répondez à 10 questions précises, notre système croise vos critères avec notre réseau et trouve <span className="text-green-600 font-bold">L'entreprise qui matche à 100%</span>. En 2 minutes au lieu de 3h.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
