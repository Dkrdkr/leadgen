import { Lock, Target, MapPin, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { getCopy } from "@/lib/copy";
import { getVariant } from "@/lib/tracking";

const iconMap = {
  Lock,
  Target,
  MapPin,
  Zap,
};

export function TrustBar() {
  const copy = getCopy(getVariant());

  return (
    <div className="relative py-12 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {copy.trustBar.items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-center gap-3 justify-center group"
              >
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shadow-lg group-hover:shadow-glow group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm font-bold text-gray-700 text-center md:text-left group-hover:text-indigo-600 transition-colors">
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
