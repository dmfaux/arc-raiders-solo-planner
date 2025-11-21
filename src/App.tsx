import { useState } from "react";
import { SectionId, RunType, MapId, MapModifier, RouteStyle } from "./types";
import { adaptivePlans } from "./data/plans";
import { routes } from "./data/routes";
import { loadouts } from "./data/loadouts";
import {
  mapModifierSummaries,
  mapSummaries,
} from "./data/events";
import { Card } from "./components/Card";
import { Pill } from "./components/Pill";

const XP_PER_LEVEL = 10000;

const sections: { id: SectionId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "run-assistant", label: "Run assistant" },
  { id: "farming-routes", label: "Farming routes" },
  { id: "high-value-targets", label: "High value targets" },
  { id: "loadouts", label: "Loadouts" },
  { id: "shortcuts", label: "Shortcuts" },
  { id: "general-tips", label: "General tips" },
  { id: "xp-planner", label: "XP planner" },
];

const runTypes = [
  {
    value: "Boss hunt" as RunType,
    label: "Boss hunt",
    description: "Chase heavy ARC enemies for high damage and corpse loot XP.",
  },
  {
    value: "Loot run" as RunType,
    label: "Loot run",
    description: "Sprint through high density loot areas with minimal combat.",
  },
  {
    value: "Stealth farm" as RunType,
    label: "Stealth farm",
    description: "Slow, quiet indoor clears with safe XP and key hunting.",
  },
];

const maps = [
  { value: "Buried City" as MapId, label: "Buried City" },
  { value: "Spaceport" as MapId, label: "Spaceport" },
  { value: "The Dam" as MapId, label: "The Dam" },
  { value: "Blue Gate" as MapId, label: "Blue Gate (mountain tunnels)" },
  { value: "Stella Montis" as MapId, label: "Stella Montis (indoor complex)" },
];

const mapModifiers = [
  { value: "Standard" as MapModifier, label: "Standard or no major modifier" },
  { value: "Night" as MapModifier, label: "Simple night time (visual only)" },
  { value: "Storm" as MapModifier, label: "Simple bad weather (non ARC storm)" },
  {
    value: "Heavy ARC presence" as MapModifier,
    label: "Heavy ARC presence",
  },
  {
    value: "Low visibility" as MapModifier,
    label: "Fog or dust, low visibility",
  },
  // Dynamic events / map conditions
  {
    value: "Hidden bunker event" as MapModifier,
    label: "Hidden Bunker (Spaceport puzzle event)",
  },
  {
    value: "Electromagnetic storm" as MapModifier,
    label: "Electromagnetic Storm (lightning, fewer extracts)",
  },
  {
    value: "Night raid" as MapModifier,
    label: "Night Raid (darkness, more ARCs, better loot)",
  },
  {
    value: "Uncovered caches" as MapModifier,
    label: "Uncovered Caches (buried Raider stashes)",
  },
  {
    value: "Prospecting probes" as MapModifier,
    label: "Prospecting Probes (ARC probes for materials)",
  },
  {
    value: "Husk graveyard" as MapModifier,
    label: "Husk Graveyard (ARC husks all over)",
  },
  {
    value: "Lush blooms" as MapModifier,
    label: "Lush Blooms (fruit and resource abundance)",
  },
  {
    value: "Harvester event" as MapModifier,
    label: "Harvester (Queen plus Harvester machine)",
  },
  {
    value: "Matriarch sighting" as MapModifier,
    label: "Matriarch sighting (world boss on map)",
  },
  {
    value: "Launch tower event" as MapModifier,
    label: "Launch Tower event (tower lockdown and loot)",
  },
];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-slate-900 lg:border-r lg:border-slate-700 lg:p-6 lg:sticky lg:top-0 lg:h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-cyan-400 mb-2">
            Arc Raiders Solo Planner
          </h1>
          <p className="text-sm text-slate-400">
            XP and skill point planner for solo PC runs.
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`text-left px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? "bg-cyan-900 text-cyan-200"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-700 p-4">
        <h1 className="text-xl font-bold text-cyan-400 mb-2">
          Arc Raiders Solo Planner
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          XP and skill point planner for solo PC runs.
        </p>
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value as SectionId)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 max-w-5xl mx-auto w-full">
        {activeSection === "overview" && <OverviewSection />}
        {activeSection === "run-assistant" && <RunAssistantSection />}
        {activeSection === "farming-routes" && <FarmingRoutesSection />}
        {activeSection === "high-value-targets" && (
          <HighValueTargetsSection />
        )}
        {activeSection === "loadouts" && <LoadoutsSection />}
        {activeSection === "shortcuts" && <ShortcutsSection />}
        {activeSection === "general-tips" && <GeneralTipsSection />}
        {activeSection === "xp-planner" && <XpPlannerSection />}
      </main>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Overview</h2>

      <Card>
        <h3 className="text-xl font-semibold mb-4">How this app helps you</h3>
        <div className="space-y-3 text-slate-300">
          <p>
            This companion app turns a long Arc Raiders solo XP guide into
            quick reference.
          </p>
          <p>It is tailored for solo PC players.</p>
          <p>It focuses on:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>choosing a type of run (boss, loot, stealth)</li>
            <li>
              adapting that run to the actual map and modifier you get
            </li>
            <li>
              giving rough XP expectations and planning how many runs you need
            </li>
          </ul>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">XP basics recap</h3>
        <div className="space-y-3 text-slate-300">
          <p>XP gives you levels, and each level gives you a skill point.</p>
          <p>Main XP sources:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>damage and kills on ARC enemies</li>
            <li>scavenging containers and corpses</li>
            <li>time survived and extracting</li>
          </ul>
          <p>Looting is very efficient:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              opening containers and corpses gives XP even if they are already
              looted
            </li>
            <li>
              looting big ARC corpses in multiple pieces is a major XP source
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

function RunAssistantSection() {
  const [selectedRunType, setSelectedRunType] = useState<RunType | null>(null);
  const [selectedMap, setSelectedMap] = useState<MapId | "">("");
  const [selectedModifier, setSelectedModifier] = useState<MapModifier | "">(
    ""
  );

  const candidates = adaptivePlans.filter(
    (plan) =>
      plan.runType === selectedRunType && plan.map === selectedMap
  );

  const primaryPlan =
    candidates.find((plan) => plan.modifier === selectedModifier) ||
    candidates.find((plan) => plan.modifier === "Any");

  const alternativePlans = candidates.filter(
    (plan) => plan.id !== primaryPlan?.id && plan.modifier !== "Any"
  );

  const selectedMapSummary = mapSummaries.find(
    (m) => m.id === selectedMap
  );

  const selectedModifierSummary = mapModifierSummaries.find(
    (m) => m.id === selectedModifier
  );

  const getDangerVariant = (danger: string) => {
    if (danger === "Low") return "success";
    if (danger === "Medium") return "warning";
    if (danger === "High") return "danger";
    if (danger === "Extreme") return "danger";
    return "default";
  };

  const getXpImpactVariant = (impact: string) => {
    if (impact === "None") return "default";
    if (impact === "Slight") return "info";
    if (impact === "High") return "success";
    return "default";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Run assistant</h2>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Step 1: Choose run type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {runTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedRunType(type.value)}
              className={`text-left p-4 rounded-lg border transition-colors ${
                selectedRunType === type.value
                  ? "border-cyan-500 bg-cyan-900/30"
                  : "border-slate-700 bg-slate-800 hover:border-slate-600"
              }`}
            >
              <div className="font-semibold mb-1">{type.label}</div>
              <div className="text-sm text-slate-400">{type.description}</div>
            </button>
          ))}
        </div>
      </Card>

      {selectedRunType && (
        <Card>
          <h3 className="text-xl font-semibold mb-4">
            Step 2: Select map and modifier
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Map</label>
              <select
                value={selectedMap}
                onChange={(e) => setSelectedMap(e.target.value as MapId)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
              >
                <option value="">Select map...</option>
                {maps.map((map) => (
                  <option key={map.value} value={map.value}>
                    {map.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Map modifier
              </label>
              <select
                value={selectedModifier}
                onChange={(e) =>
                  setSelectedModifier(e.target.value as MapModifier)
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
              >
                <option value="">Select modifier...</option>
                {mapModifiers.map((mod) => (
                  <option key={mod.value} value={mod.value}>
                    {mod.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      )}

      {primaryPlan && (
        <Card>
          <div className="flex flex-wrap gap-2 mb-4">
            <Pill>{primaryPlan.runType}</Pill>
            <Pill>{primaryPlan.map}</Pill>
            <Pill>{primaryPlan.modifier}</Pill>
            <Pill variant="info">{primaryPlan.xpNote}</Pill>
          </div>
          <h3 className="text-2xl font-semibold mb-2">{primaryPlan.title}</h3>
          <p className="text-slate-300 mb-6">{primaryPlan.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3">
                Key actions
              </h4>
              <ul className="space-y-2 text-slate-300">
                {primaryPlan.keyActions.map((action, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">Cautions</h4>
              <ul className="space-y-2 text-slate-300">
                {primaryPlan.cautions.map((caution, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{caution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {primaryPlan?.poiRoute && primaryPlan.poiRoute.length > 0 && (
        <Card>
          <h3 className="text-xl font-semibold mb-2">Suggested POI route</h3>
          <p className="text-sm text-slate-400 mb-4">
            Use this order as a default path. Adjust on the fly based on spawn,
            event timers and where you hear gunfire.
          </p>
          <ol className="list-decimal pl-5 space-y-4">
            {primaryPlan.poiRoute.map((stop, index) => (
              <li key={stop.name + index} className="text-slate-300">
                <p className="font-medium text-cyan-400 mb-1">{stop.name}</p>
                <div className="flex flex-wrap items-start gap-2">
                  <Pill variant="info" className="text-xs">
                    {stop.purpose}
                  </Pill>
                  <span className="text-sm text-slate-400">{stop.notes}</span>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {selectedMapSummary && (
        <Card>
          <h3 className="text-xl font-semibold mb-3">About this map</h3>
          <p className="text-slate-300 mb-3">{selectedMapSummary.description}</p>
          <p className="text-sm text-slate-400 italic">{selectedMapSummary.soloNote}</p>
        </Card>
      )}

      {selectedModifierSummary && (
        <Card>
          <h3 className="text-xl font-semibold mb-3">Active event</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <Pill variant={getXpImpactVariant(selectedModifierSummary.xpImpact)}>
              XP: {selectedModifierSummary.xpImpact}
            </Pill>
            <Pill variant={getDangerVariant(selectedModifierSummary.danger)}>
              Danger: {selectedModifierSummary.danger}
            </Pill>
          </div>
          <p className="text-slate-300 mb-3">{selectedModifierSummary.description}</p>
          <div className="mt-4">
            <h4 className="font-semibold text-cyan-400 mb-2 text-sm">Solo tips:</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              {selectedModifierSummary.soloTips.map((tip, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {alternativePlans.length > 0 && (
        <Card>
          <h3 className="text-xl font-semibold mb-4">
            Alternative approaches on this map
          </h3>
          <div className="space-y-4">
            {alternativePlans.map((plan) => (
              <div
                key={plan.id}
                className="border-l-4 border-cyan-500 pl-4 py-2"
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  <Pill variant="default">{plan.modifier}</Pill>
                </div>
                <h4 className="font-semibold mb-1">{plan.title}</h4>
                <p className="text-sm text-slate-400">{plan.summary}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function FarmingRoutesSection() {
  const [filterStyle, setFilterStyle] = useState<RouteStyle | "All">("All");

  const filteredRoutes =
    filterStyle === "All"
      ? routes
      : routes.filter((route) => route.style === filterStyle);

  const getRiskVariant = (risk: string) => {
    if (risk === "Low") return "success";
    if (risk === "Medium") return "warning";
    if (risk === "High") return "danger";
    return "default";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Farming routes</h2>

      <Card>
        <div className="flex flex-wrap gap-2 mb-6">
          {(["All", "Boss hunting", "Loot running", "Stealth"] as const).map(
            (style) => (
              <button
                key={style}
                onClick={() =>
                  setFilterStyle(style === "All" ? "All" : (style as RouteStyle))
                }
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStyle === style
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {style}
              </button>
            )
          )}
        </div>

        <div className="space-y-4">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="bg-slate-800">
              <div className="flex flex-wrap gap-2 mb-3">
                <Pill>{route.map}</Pill>
                <Pill variant={getRiskVariant(route.risk)}>{route.risk}</Pill>
                <Pill variant="info">{route.style}</Pill>
              </div>
              <h3 className="text-xl font-semibold mb-2">{route.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-slate-400">Estimated XP: </span>
                  <span className="text-cyan-400">{route.estXp}</span>
                </div>
                <div>
                  <span className="text-slate-400">Time per run: </span>
                  <span className="text-slate-300">{route.timePerRun}</span>
                </div>
              </div>
              <p className="text-slate-300">{route.description}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

function HighValueTargetsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">High value targets</h2>

      <Card>
        <h3 className="text-xl font-semibold mb-4">High value targets</h3>
        <ul className="space-y-3 text-slate-300">
          <li>
            <strong className="text-cyan-400">Heavy ARC enemies:</strong>{" "}
            Bastions, Bombardiers, Queens, Rocketeers, Leapers.
          </li>
          <li>
            Aim for longer fights where you deal a lot of damage rather than
            instant deletes that waste damage XP.
          </li>
          <li>
            After a boss dies, loot every visible piece of the corpse. Each
            piece gives XP.
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">
          Smart engagement rules
        </h3>
        <ul className="space-y-3 text-slate-300">
          <li>
            Take fights on your own terms. If players are nearby, let them clear
            an ARC then focus on looting and finishing instead of duelling
            them.
          </li>
          <li>
            Avoid getting trapped between a boss ARC and extraction routes.
          </li>
          <li>
            Solo safety is more valuable than a single extra kill on a long run.
          </li>
        </ul>
      </Card>
    </div>
  );
}

function LoadoutsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Loadouts</h2>

      <div className="space-y-6">
        {loadouts.map((loadout) => (
          <Card key={loadout.id}>
            <h3 className="text-xl font-semibold mb-2">{loadout.name}</h3>
            <p className="text-slate-400 mb-4">{loadout.focus}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">Weapons</h4>
                <div className="space-y-2 text-slate-300">
                  <div>
                    <span className="text-slate-400">Primary: </span>
                    {loadout.primary}
                  </div>
                  <div>
                    <span className="text-slate-400">Secondary: </span>
                    {loadout.secondary}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">Utilities</h4>
                <ul className="space-y-1 text-slate-300">
                  {loadout.utilities.map((util, idx) => (
                    <li key={idx}>• {util}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">
                  Key skills
                </h4>
                <ul className="space-y-1 text-slate-300">
                  {loadout.skills.map((skill, idx) => (
                    <li key={idx}>• {skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">Notes</h4>
                <p className="text-slate-300">{loadout.notes}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ShortcutsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Shortcuts</h2>

      <Card>
        <h3 className="text-xl font-semibold mb-4">
          Fast but slightly cheesy methods
        </h3>
        <div className="space-y-4 text-slate-300">
          <div>
            <h4 className="font-semibold text-cyan-400 mb-2">
              Free kit suicide runs:
            </h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>take a free loadout</li>
              <li>sprint to a high loot area</li>
              <li>open everything you can</li>
              <li>
                if you die that is fine, you keep the scavenging XP and only
                lose free gear
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-cyan-400 mb-2">
              Partial loot trick:
            </h4>
            <p>
              you gain XP when a search starts, so touching already looted
              containers still gives XP
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-cyan-400 mb-2">
              AFK night runs:
            </h4>
            <p>
              hide in a safe spot in a night raid and survive until the end for
              passive time on surface XP. Very slow but completely hands off
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Boss tricks</h3>
        <ul className="space-y-3 text-slate-300">
          <li>
            Blaze grenades and traps are excellent for melting large ARC bosses
            while stacking damage XP
          </li>
          <li>
            Use smoke before looting boss corpses so you are not an easy target
            for other players
          </li>
          <li>
            Only use more extreme glitches or exploits at your own risk since
            they may be patched in future updates
          </li>
        </ul>
      </Card>
    </div>
  );
}

function GeneralTipsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">General tips</h2>

      <Card>
        <h3 className="text-xl font-semibold mb-4">
          Solo habits that speed up levelling
        </h3>
        <ul className="space-y-3 text-slate-300">
          <li>
            Open every container and body you see, even if empty
          </li>
          <li>
            Avoid pointless PvP. Only take fights that protect your XP or give
            you a clear advantage
          </li>
          <li>
            Learn one route for each mood: fast and risky, safe and slow, and
            an in between option
          </li>
          <li>
            If you are on a great run, do not get greedy. Extract and bank your
            XP instead of chasing one more boss
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">
          Staying sane during the grind
        </h3>
        <ul className="space-y-3 text-slate-300">
          <li>
            Set small goals such as a few levels or a certain number of runs
            per session
          </li>
          <li>
            Swap routes or playstyles when you feel bored to avoid burnout
          </li>
          <li>
            Remember that future seasons may reset levels, so there is no need
            to rush everything at once
          </li>
        </ul>
      </Card>
    </div>
  );
}

function XpPlannerSection() {
  const [currentLevel, setCurrentLevel] = useState(20);
  const [targetLevel, setTargetLevel] = useState(75);
  const [avgXpPerRun, setAvgXpPerRun] = useState(40000);

  const levelsToGain = Math.max(targetLevel - currentLevel, 0);
  const totalXpNeeded = levelsToGain * XP_PER_LEVEL;
  const runsNeeded =
    avgXpPerRun > 0 ? Math.ceil(totalXpNeeded / avgXpPerRun) : 0;
  const sessionsNeeded = Math.ceil(runsNeeded / 5);

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-GB");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">XP planner</h2>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Inputs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current level
            </label>
            <input
              type="number"
              min="1"
              max="75"
              value={currentLevel}
              onChange={(e) =>
                setCurrentLevel(Math.max(1, Math.min(75, parseInt(e.target.value) || 1)))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Target level
            </label>
            <input
              type="number"
              min="1"
              max="75"
              value={targetLevel}
              onChange={(e) =>
                setTargetLevel(Math.max(1, Math.min(75, parseInt(e.target.value) || 75)))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Average XP per run
            </label>
            <input
              type="number"
              min="1000"
              value={avgXpPerRun}
              onChange={(e) =>
                setAvgXpPerRun(Math.max(1000, parseInt(e.target.value) || 1000))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h4 className="text-sm font-medium text-slate-400 mb-2">
            Total XP needed
          </h4>
          <p className="text-2xl font-bold text-cyan-400">
            {formatNumber(totalXpNeeded)}
          </p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-slate-400 mb-2">
            Estimated runs needed
          </h4>
          <p className="text-2xl font-bold text-cyan-400">{runsNeeded}</p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-slate-400 mb-2">
            Example plan
          </h4>
          <p className="text-lg font-semibold text-slate-200">
            About {sessionsNeeded} sessions of 5 focused runs
          </p>
        </Card>
      </div>

      <Card>
        <p className="text-sm text-slate-400">
          Note: This is approximate and based on a simple flat XP model.
        </p>
      </Card>
    </div>
  );
}

export default App;

