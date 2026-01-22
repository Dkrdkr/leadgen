import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getVariant } from "@/lib/tracking";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function FAQ() {
  const copy = getCopy(getVariant());
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Questions fréquentes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="gradient-text">{copy.faq.title}</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {copy.faq.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-2xl overflow-hidden shadow-premium hover:shadow-glow transition-shadow"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors group"
              >
                <span className="font-bold text-gray-900 pr-4 text-lg group-hover:text-indigo-600 transition-colors">
                  {item.question}
                </span>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                  openIndex === index ? "bg-indigo-600 rotate-180" : "bg-gray-100 group-hover:bg-indigo-100"
                )}>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-colors",
                      openIndex === index ? "text-white" : "text-gray-600 group-hover:text-indigo-600"
                    )}
                  />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 pt-2 text-gray-600 leading-relaxed text-lg border-t border-gray-200/50 mt-2">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
