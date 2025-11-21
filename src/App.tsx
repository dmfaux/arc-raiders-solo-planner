import { useState, useEffect } from "react";
import {
  SectionId,
} from "./types";
import {
  Target,
  Route,
  Crosshair,
  Package,
  Zap,
  Info,
  Calculator,
  Recycle,
} from "lucide-react";
import RecyclablesSection from "./sections/RecyclablesSection";
import OverviewSection from "./components/OverviewSection";
import RunAssistantSection from "./components/RunAssistantSection";
import FarmingRoutesSection from "./components/FarmingRoutesSection";
import HighValueTargetsSection from "./components/HighValueTargetsSection";
import LoadoutsSection from "./components/LoadoutsSection";
import ShortcutsSection from "./components/ShortcutsSection";
import GeneralTipsSection from "./components/GeneralTipsSection";
import XpPlannerSection from "./components/XpPlannerSection";
import RecyclablesPlannerSection from "./components/RecyclablesPlannerSection";

const sections: { id: SectionId; label: string; icon: any }[] =
  [
    { id: "overview", label: "Overview", icon: Info },
    {
      id: "run-assistant",
      label: "Run Assistant",
      icon: Target,
    },
    {
      id: "farming-routes",
      label: "Farming Routes",
      icon: Route,
    },
    {
      id: "high-value-targets",
      label: "High Value Targets",
      icon: Crosshair,
    },
    { id: "loadouts", label: "Loadouts", icon: Package },
    { id: "shortcuts", label: "Shortcuts", icon: Zap },
    { id: "general-tips", label: "General Tips", icon: Info },
    { id: "xp-planner", label: "XP Planner", icon: Calculator },
    { id: "recyclables", label: "Recyclables", icon: Recycle },
    {
      id: "recycling-planner",
      label: "Recycling Planner",
      icon: Recycle,
    },
  ];

function App() {
  const [activeSection, setActiveSection] =
    useState<SectionId>("overview");
  const [scanLineEnabled, setScanLineEnabled] = useState(false);

  useEffect(() => {
    if (scanLineEnabled) {
      document.body.classList.remove("scan-line-disabled");
    } else {
      document.body.classList.add("scan-line-disabled");
    }
  }, [scanLineEnabled]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative crt-scanlines">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:bg-black/50 lg:backdrop-blur-md lg:border-r lg:border-cyan-900/30 lg:p-6 lg:sticky lg:top-0 lg:h-screen lg:shadow-2xl lg:overflow-y-auto">
        {/* Header with tactical styling */}
        <div className="mb-8 pb-6 border-b border-cyan-900/30 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="text-xs uppercase tracking-widest text-cyan-400/70">
              Tactical System
            </div>
          </div>


            <img src="assets/Arc_Raiders.jpg" alt="Arc Raiders Solo Planner" className="h-36 w-36" />

          <div className="text-sm text-slate-400 uppercase tracking-wide">
            Solo Planner v1.0
          </div>
          <div className="text-xs text-slate-500 mt-1">
            XP and skill point optimiser
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-all group relative ${
                  activeSection === section.id
                    ? "bg-cyan-950/50 text-cyan-300 border border-cyan-800/50"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                }`}
              >
                {activeSection === section.id && (
                  <div className="absolute left-0 w-1 h-full bg-cyan-400 rounded-r" />
                )}
                <Icon className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wide">
                  {section.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="mt-6 pt-6 border-t border-cyan-900/30 text-xs text-slate-500">
          <button
            onClick={() => setScanLineEnabled(!scanLineEnabled)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer w-full"
            title="Toggle page animations"
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                scanLineEnabled
                  ? "bg-emerald-400 animate-ping"
                  : "bg-red-500"
              }`}
            />
            <span>{scanLineEnabled ? "Connected to Speranza" : "Disconnected from Speranza"}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-black/90 backdrop-blur-md border-b border-cyan-900/30 p-4 sticky top-0 z-50">
        <div className="flex items-center gap-2 mb-3 z-10">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <h1 className="text-xl font-bold text-cyan-400">
            ARC RAIDERS
          </h1>
        </div>
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-3">
          Solo Planner v1.0
        </p>
        <select
          value={activeSection}
          onChange={(e) =>
            setActiveSection(e.target.value as SectionId)
          }
          className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 uppercase tracking-wide backdrop-blur-sm"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 max-w-6xl mx-auto w-full relative">
        {activeSection === "overview" && <OverviewSection />}
        {activeSection === "run-assistant" && (
          <RunAssistantSection />
        )}
        {activeSection === "farming-routes" && (
          <FarmingRoutesSection />
        )}
        {activeSection === "high-value-targets" && (
          <HighValueTargetsSection />
        )}
        {activeSection === "loadouts" && <LoadoutsSection />}
        {activeSection === "shortcuts" && <ShortcutsSection />}
        {activeSection === "general-tips" && (
          <GeneralTipsSection />
        )}
        {activeSection === "xp-planner" && <XpPlannerSection />}
        {activeSection === "recyclables" && (
          <RecyclablesSection />
        )}
        {activeSection === "recycling-planner" && (
          <RecyclablesPlannerSection />
        )}
      </main>
    </div>
  );
}

export default App;
