import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getVariant, trackCTAClick } from "@/lib/tracking";
import { scrollToElement } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const copy = getCopy(getVariant());

  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById("lead-form");
      if (formElement) {
        const formTop = formElement.getBoundingClientRect().top;
        setIsVisible(formTop > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackCTAClick("sticky");
    scrollToElement("lead-form");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg p-4"
        >
          <button
            onClick={handleClick}
            className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
          >
            {copy.hero.cta}
            <ArrowDown className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
