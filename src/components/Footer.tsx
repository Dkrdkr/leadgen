import { Sparkles, Mail, Shield } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getVariant } from "@/lib/tracking";

export function Footer() {
  const copy = getCopy(getVariant());

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-xl text-white">Nettoyage Pro</h3>
                <p className="text-xs text-indigo-300">Suisse romande</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {copy.footer.disclaimer}
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-300">
              <Shield className="w-4 h-4" />
              <span>Données sécurisées selon LPD</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Liens utiles
            </h4>
            <ul className="space-y-3">
              {copy.footer.links.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:bg-white transition-colors" />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact/Info */}
          <div>
            <h4 className="font-bold text-white mb-4">Régions couvertes</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>🇨🇭 Genève, Vaud, Valais</p>
              <p>🇨🇭 Fribourg, Neuchâtel, Jura</p>
              <p className="pt-4 text-xs text-indigo-300">
                Plateforme de mise en relation digitale pour services de nettoyage professionnels en Suisse romande
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            {copy.footer.copyright}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Fait avec</span>
            <span className="text-red-400">♥</span>
            <span>en Suisse</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
