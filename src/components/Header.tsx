import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToElement } from "@/lib/utils";

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass sticky top-0 z-50 border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-black text-lg gradient-text block leading-none">
              Nettoyage Pro
            </span>
            <span className="text-xs text-gray-500 font-medium">Suisse romande</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToElement("comment-ca-marche")}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Comment ça marche
          </button>
          <button
            onClick={() => scrollToElement("faq")}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollToElement("lead-form")}
            className="text-sm font-bold gradient-primary text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all"
          >
            Obtenir un contact
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
