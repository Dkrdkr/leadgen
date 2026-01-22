import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Download,
  Trash2,
  Copy,
  Eye,
  X,
  AlertTriangle,
  ArrowLeft,
  LogOut,
  FileSpreadsheet,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { LeadPayload, LeadTier } from "@/lib/types";
import { getLeads, deleteLead, clearLeads } from "@/lib/storage";
import {
  getTierColor,
  getTierLabel,
  sortLeadsByQuality,
} from "@/lib/scoring";
import { adminSEO } from "@/lib/seo";
import {
  downloadJSON,
  downloadCSV,
  copyToClipboard,
  formatDateTime,
} from "@/lib/utils";
import { serviceTypeLabels } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { checkAdminAuth, logoutAdmin } from "@/lib/auth";
import { AdminLogin } from "@/components/AdminLogin";

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAdminAuth());
  const [leads, setLeads] = useState<LeadPayload[]>(getLeads());
  const [selectedLead, setSelectedLead] = useState<LeadPayload | null>(null);
  const [tierFilter, setTierFilter] = useState<LeadTier | "all">("all");
  const [sortBy, setSortBy] = useState<"quality" | "date">("quality");

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logoutAdmin();
      setIsAuthenticated(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    refreshLeads();
  };

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  const refreshLeads = () => {
    setLeads(getLeads());
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce lead ?")) {
      deleteLead(leadId);
      refreshLeads();
      if (selectedLead?.leadId === leadId) {
        setSelectedLead(null);
      }
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer tous les leads (${leads.length}) ?\n\nCette action est irréversible.`
      )
    ) {
      clearLeads();
      refreshLeads();
      setSelectedLead(null);
    }
  };

  const handleExportJSON = () => {
    downloadJSON(leads, `leads-export-${Date.now()}.json`);
  };

  const handleExportCSV = () => {
    const csvData = leads.map((lead) => ({
      ID: lead.leadId,
      Date: lead.createdAt,
      Tier: lead.leadScore.tier,
      Score: lead.leadScore.score,
      Service: serviceTypeLabels[lead.serviceType],
      Localité: lead.locality || "",
      Canton: lead.region || "",
      "Type bien": lead.propertyType || "",
      Pièces: lead.rooms || "",
      Surface: lead.approxSurface || "",
      Urgence: lead.urgency || "",
      Prénom: lead.firstName,
      Nom: "",
      Téléphone: lead.phone,
      Email: lead.email,
      "Contact préféré": lead.contactPreference || "",
      "Date déménagement": lead.moveOutDate || lead.desiredDate || "",
      Commentaires: lead.accessNotes || "",
      Tags: lead.leadScore.tags.join(", "),
      "Extras": (lead.extras || []).join(", "),
    }));
    downloadCSV(csvData, `leads-export-${Date.now()}.csv`);
  };

  const handleExportExcel = () => {
    // For Excel, we'll create a more detailed CSV with proper formatting
    const excelData = leads.map((lead, index) => ({
      "#": index + 1,
      "Date création": new Date(lead.createdAt).toLocaleString("fr-CH"),
      "ID Lead": lead.leadId,
      "Tier": lead.leadScore.tier,
      "Score": lead.leadScore.score,
      "Tags qualité": lead.leadScore.tags.join(" | "),
      "--- CONTACT ---": "",
      "Prénom": lead.firstName,
      "Nom": "",
      "Téléphone": lead.phone,
      "Email": lead.email,
      "Contact préféré": lead.contactPreference || "",
      "--- SERVICE ---": "",
      "Type service": serviceTypeLabels[lead.serviceType],
      "Autre service": lead.serviceTypeOther || "",
      "Urgence": lead.urgency || "",
      "Date souhaitée": lead.moveOutDate || lead.desiredDate || "",
      "--- BIEN ---": "",
      "Localité": lead.locality || "",
      "Canton": lead.region || "",
      "Type bien": lead.propertyType || "",
      "Nombre pièces": lead.rooms || "",
      "Surface approx.": lead.approxSurface || "",
      "Étage": "",
      "--- PRESTATIONS ---": "",
      "Extras": (lead.extras || []).join(" | "),
      "Commentaires": lead.accessNotes || "",
      "--- TECHNIQUE ---": "",
      "Page": lead.pagePath || "",
      "Référent": lead.referrer || "",
      "UTM Source": lead.utm?.source || "",
      "UTM Campaign": lead.utm?.campaign || "",
      "Temps soumission (s)": lead.antiSpam?.timeToSubmitMs ? Math.round(lead.antiSpam.timeToSubmitMs / 1000) : "",
    }));

    downloadCSV(excelData, `leads-export-excel-${Date.now()}.csv`);
  };

  const handleCopyAll = async () => {
    await copyToClipboard(JSON.stringify(leads, null, 2));
    alert("Tous les leads ont été copiés dans le presse-papier");
  };

  const filteredLeads = useMemo(() => {
    let filtered =
      tierFilter === "all"
        ? leads
        : leads.filter((l) => l.leadScore.tier === tierFilter);

    if (sortBy === "quality") {
      return sortLeadsByQuality(filtered);
    } else {
      return [...filtered].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }, [leads, tierFilter, sortBy]);

  const stats = useMemo(() => {
    const tierA = leads.filter((l) => l.leadScore.tier === "A").length;
    const tierB = leads.filter((l) => l.leadScore.tier === "B").length;
    const tierC = leads.filter((l) => l.leadScore.tier === "C").length;
    const avgScore =
      leads.length > 0
        ? Math.round(
            leads.reduce((sum, l) => sum + l.leadScore.score, 0) / leads.length
          )
        : 0;

    // Calculate today's leads
    const today = new Date().toDateString();
    const todayLeads = leads.filter((l) => new Date(l.createdAt).toDateString() === today).length;

    return { tierA, tierB, tierC, avgScore, total: leads.length, today: todayLeads };
  }, [leads]);

  return (
    <>
      <Helmet>
        <title>{adminSEO.title}</title>
        <meta name="description" content={adminSEO.description} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Administration
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Gestion des leads et export de données
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Retour au site</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Warning banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800 font-medium mb-1">
                Stockage local navigateur uniquement
              </p>
              <p className="text-xs text-yellow-700">
                Les données affichées sont stockées localement dans votre navigateur
                et ne sont pas synchronisées avec un serveur. Exportez régulièrement vos leads.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Total</div>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Aujourd'hui</div>
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.today}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Tier A</div>
              <div className="text-2xl font-bold text-green-600">
                {stats.tierA}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Tier B</div>
              <div className="text-2xl font-bold text-orange-600">
                {stats.tierB}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Tier C</div>
              <div className="text-2xl font-bold text-gray-600">
                {stats.tierC}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Score moyen</div>
              <div className="text-2xl font-bold text-indigo-600">
                {stats.avgScore}
              </div>
            </div>
          </div>

          {/* Filters and actions */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
            <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mr-2">
                    Tier:
                  </label>
                  <select
                    value={tierFilter}
                    onChange={(e) =>
                      setTierFilter(e.target.value as LeadTier | "all")
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">Tous ({leads.length})</option>
                    <option value="A">A - Premium ({stats.tierA})</option>
                    <option value="B">B - Standard ({stats.tierB})</option>
                    <option value="C">C - Basique ({stats.tierC})</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mr-2">
                    Tri:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "quality" | "date")
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="quality">Par qualité</option>
                    <option value="date">Par date</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportExcel}
                  disabled={leads.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Export détaillé pour Excel"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={leads.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Export CSV simple"
                >
                  <Download className="w-4 h-4" />
                  CSV
                </button>
                <button
                  onClick={handleExportJSON}
                  disabled={leads.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  JSON
                </button>
                <button
                  onClick={handleCopyAll}
                  disabled={leads.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Copy className="w-4 h-4" />
                  Copier
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={leads.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Tout supprimer
                </button>
              </div>
            </div>

            {/* Table */}
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-4xl mb-4">📭</div>
                <p className="font-medium">Aucun lead trouvé</p>
                <p className="text-sm mt-1">
                  {leads.length === 0
                    ? "Les leads apparaîtront ici une fois soumis via le formulaire"
                    : "Aucun lead ne correspond aux filtres sélectionnés"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Tier
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Score
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Service
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Localité
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Prénom
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Téléphone
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.leadId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDateTime(lead.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                              getTierColor(lead.leadScore.tier)
                            )}
                          >
                            {lead.leadScore.tier} -{" "}
                            {getTierLabel(lead.leadScore.tier)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {lead.leadScore.score}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {serviceTypeLabels[lead.serviceType]}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {lead.locality || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {lead.firstName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <a href={`tel:${lead.phone}`} className="hover:text-indigo-600">
                            {lead.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Voir détails"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                copyToClipboard(JSON.stringify(lead, null, 2))
                              }
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Copier JSON"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead.leadId)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Detail modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Détails du lead
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    ID: {selectedLead.leadId}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto border border-gray-200">
                  {JSON.stringify(selectedLead, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
