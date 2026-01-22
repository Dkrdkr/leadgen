import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, AlertCircle, Shield, Eye, EyeOff } from "lucide-react";
import { authenticateAdmin, checkLoginAttempts, recordLoginAttempt } from "@/lib/auth";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check rate limiting
    const attemptCheck = checkLoginAttempts();

    if (!attemptCheck.allowed) {
      const remainingMinutes = Math.ceil(
        ((attemptCheck.lockoutTime || 0) - Date.now()) / (60 * 1000)
      );
      setError(
        `Trop de tentatives échouées. Réessayez dans ${remainingMinutes} minute${
          remainingMinutes > 1 ? "s" : ""
        }.`
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate async delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = authenticateAdmin(code);

    if (success) {
      recordLoginAttempt(true);
      onSuccess();
    } else {
      recordLoginAttempt(false);
      const remaining = attemptCheck.remaining - 1;

      if (remaining > 0) {
        setError(`Code incorrect. ${remaining} tentative${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}.`);
      } else {
        setError("Code incorrect. Compte bloqué pour 15 minutes.");
      }

      setCode("");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-glow"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black text-white mb-2">Administration</h1>
          <p className="text-gray-400 text-sm">Accès sécurisé à la gestion des leads</p>
        </div>

        {/* Login form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-bold text-gray-200 mb-2">
                Code d'accès
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="code"
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Entrez votre code"
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors disabled:opacity-50"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}

            <motion.button
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              type="submit"
              disabled={isSubmitting || !code.trim()}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isSubmitting && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
              <span className="relative z-10">
                {isSubmitting ? "Vérification..." : "Se connecter"}
              </span>
            </motion.button>
          </form>

          {/* Security notice */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Cet espace est protégé. Vos tentatives de connexion sont enregistrées. Après 5 tentatives échouées, l'accès sera bloqué pendant 15 minutes.
            </p>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Retour au site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
