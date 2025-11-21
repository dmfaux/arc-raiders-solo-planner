import { useState } from "react";
import { motion } from "framer-motion";
import {
  SectionId,
  RunType,
  MapId,
  MapModifier,
  RouteStyle,
  SpawnRegionId,
} from "./types";
import { adaptivePlans, spawnPoints } from "./data/plans";
import { routes } from "./data/routes";
import { loadouts } from "./data/loadouts";
import {
  mapModifierSummaries,
  mapSummaries,
} from "./data/events";
import { Card } from "./components/Card";
import { Pill } from "./components/Pill";
import {
  Target,
  Map,
  Route,
  Crosshair,
  Package,
  Zap,
  Info,
  Calculator,
  Recycle,
  RotateCcw,
} from "lucide-react";
import { spawnRegionsByMap } from "./data/spawn";
import RecyclablesSection from "./sections/RecyclablesSection";
import RecyclingPlannerSection from "./sections/RecyclingPlannerSection";
import { recyclableAreas } from "./data/recyclables";

const XP_PER_LEVEL = 10000;

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
      icon: RotateCcw,
    },
  ];

const runTypes = [
  {
    value: "Boss hunt" as RunType,
    label: "Boss hunt",
    description:
      "Chase heavy ARC enemies for high damage and corpse loot XP.",
  },
  {
    value: "Loot run" as RunType,
    label: "Loot run",
    description:
      "Sprint through high density loot areas with minimal combat.",
  },
  {
    value: "Stealth farm" as RunType,
    label: "Stealth farm",
    description:
      "Slow, quiet indoor clears with safe XP, keys and moderate loot.",
  },
];

const SVGComponent = (props) => (
  <svg
    width={512}
    height={512}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="title desc"
    {...props}
  >
    <title id="title">Arc styled raid planner icon</title>
    <desc id="desc">
      A neon radar disc with three energy arcs and a raider
      triangle, on a dark rounded square.
    </desc>
    <defs>
      <linearGradient
        id="bgGradient"
        x1={0}
        y1={0}
        x2={1}
        y2={1}
      >
        <stop offset="0%" stopColor="#040712" />
        <stop offset="50%" stopColor="#050a1a" />
        <stop offset="100%" stopColor="#02030a" />
      </linearGradient>
      <radialGradient id="radarGlow" cx="50%" cy="45%" r="55%">
        <stop
          offset="0%"
          stopColor="#25f0ff"
          stopOpacity={0.3}
        />
        <stop
          offset="40%"
          stopColor="#25f0ff"
          stopOpacity={0.05}
        />
        <stop
          offset="100%"
          stopColor="#25f0ff"
          stopOpacity={0}
        />
      </radialGradient>
      <linearGradient
        id="arcStroke"
        x1={0}
        y1={0}
        x2={1}
        y2={0}
      >
        <stop offset="0%" stopColor="#25f0ff" />
        <stop offset="50%" stopColor="#82ffe6" />
        <stop offset="100%" stopColor="#f6ffb5" />
      </linearGradient>
    </defs>
    <rect
      x={32}
      y={32}
      width={448}
      height={448}
      rx={96}
      fill="url(#bgGradient)"
    />
    <rect
      x={36}
      y={36}
      width={440}
      height={440}
      rx={92}
      fill="none"
      stroke="#1ef2ff"
      strokeOpacity={0.35}
      strokeWidth={2}
    />
    <circle cx={256} cy={228} r={150} fill="url(#radarGlow)" />
    <circle
      cx={256}
      cy={228}
      r={132}
      fill="#040815"
      stroke="#25f0ff"
      strokeWidth={4}
      strokeOpacity={0.6}
    />
    <line
      x1={256}
      y1={108}
      x2={256}
      y2={348}
      stroke="#25f0ff"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <line
      x1={136}
      y1={228}
      x2={376}
      y2={228}
      stroke="#25f0ff"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <circle
      cx={256}
      cy={228}
      r={96}
      fill="none"
      stroke="#25f0ff"
      strokeOpacity={0.25}
      strokeWidth={2}
    />
    <circle
      cx={256}
      cy={228}
      r={56}
      fill="none"
      stroke="#25f0ff"
      strokeOpacity={0.3}
      strokeWidth={2}
    />
    <path
      d="M 193 160 A 96 96 0 0 1 230 140"
      fill="none"
      stroke="url(#arcStroke)"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <path
      d="M 230 130 A 120 120 0 0 1 282 124"
      fill="none"
      stroke="url(#arcStroke)"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <path
      d="M 282 140 A 96 96 0 0 1 319 160"
      fill="none"
      stroke="url(#arcStroke)"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <path
      d="M256 228 L 348 160"
      stroke="#a4ffe0"
      strokeOpacity={0.75}
      strokeWidth={3}
      strokeLinecap="round"
    />
    <polygon
      points="352,156 338,162 346,146"
      fill="#f6ffb5"
      fillOpacity={0.9}
    />
    <circle cx={205} cy={190} r={4} fill="#25f0ff" />
    <circle cx={310} cy={248} r={3} fill="#a4ffe0" />
    <circle cx={232} cy={280} r={3} fill="#25f0ff" />
    <text
      x={256}
      y={400}
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      fontSize={26}
      letterSpacing={4}
      fill="#8df7ff"
      fillOpacity={0.85}
    >
      SOLO OPS
    </text>
    <text
      x={256}
      y={424}
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      fontSize={13}
      letterSpacing={3}
      fill="#52d7ff"
      fillOpacity={0.6}
    >
      RAID PLANNER
    </text>
  </svg>
);

const maps = [
  { value: "Buried City" as MapId, label: "Buried City" },
  { value: "Spaceport" as MapId, label: "Spaceport" },
  { value: "The Dam" as MapId, label: "The Dam" },
  {
    value: "Blue Gate" as MapId,
    label: "Blue Gate (mountain tunnels)",
  },
  {
    value: "Stella Montis" as MapId,
    label: "Stella Montis (indoor complex)",
  },
];

const mapModifiers = [
  {
    value: "Standard" as MapModifier,
    label: "Standard or no major modifier",
  },
  {
    value: "Night" as MapModifier,
    label: "Simple night time (visual only)",
  },
  {
    value: "Storm" as MapModifier,
    label: "Simple bad weather (non ARC storm)",
  },
  {
    value: "Heavy ARC presence" as MapModifier,
    label: "Heavy ARC presence",
  },
  {
    value: "Low visibility" as MapModifier,
    label: "Fog or dust, low visibility",
  },
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
  const [activeSection, setActiveSection] =
    useState<SectionId>("overview");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:bg-black/50 lg:backdrop-blur-md lg:border-r lg:border-cyan-900/30 lg:p-6 lg:sticky lg:top-0 lg:h-screen lg:shadow-2xl">
        {/* Header with tactical styling */}
        <div className="mb-8 pb-6 border-b border-cyan-900/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="text-xs uppercase tracking-widest text-cyan-400/70">
              Tactical System
            </div>
          </div>
          <h1 className="text-center">
            <SVGComponent className="h-36 w-36" />
          </h1>
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
        <div className="mt-6 pt-6 border-t border-cyan-900/30 text-xs text-slate-500 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            <span>System Online</span>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-black/90 backdrop-blur-md border-b border-cyan-900/30 p-4 sticky top-0 z-50">
        <div className="flex items-center gap-2 mb-3">
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
          <RecyclingPlannerSection />
        )}
      </main>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Overview
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Mission Briefing
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex items-start gap-3 mb-4">
          <Target className="w-5 h-5 text-cyan-400 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">
              How this app helps
            </h3>
          </div>
        </div>
        <div className="space-y-3 text-slate-300 leading-relaxed">
          <p>
            This companion app compresses a long solo XP guide
            for Arc Raiders into something you can glance at
            between raids.
          </p>
          <p>It is tailored for solo PC players.</p>
          <p className="text-cyan-300/90">It focuses on:</p>
          <ul className="list-none ml-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                choosing a type of run (boss, loot, stealth)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                adapting that run to the actual map, spawn and
                modifier you get
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                giving rough XP expectations and planning how
                many runs you need
              </span>
            </li>
          </ul>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3 mb-4">
          <Calculator className="w-5 h-5 text-amber-400 mt-1" />
          <div>
            <h3 className="text-xl font-semibold">
              XP basics recap
            </h3>
          </div>
        </div>
        <div className="space-y-3 text-slate-300 leading-relaxed">
          <p>
            XP gives you levels, and each level gives you a
            skill point.
          </p>
          <p className="text-cyan-300/90">Main XP sources:</p>
          <ul className="list-none ml-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>damage and kills on ARC enemies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>scavenging containers and corpses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>time survived and extracting</span>
            </li>
          </ul>
          <div className="pt-3 mt-3 border-t border-slate-700/50">
            <p className="text-amber-300/90">
              Looting is very efficient:
            </p>
            <ul className="list-none ml-4 space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">▸</span>
                <span>
                  opening containers and corpses gives XP even
                  if they are already looted
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">▸</span>
                <span>
                  looting big ARC corpses in multiple pieces is
                  a major XP source
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RunAssistantSection() {
  const [selectedRunType, setSelectedRunType] =
    useState<RunType | null>(null);
  const [selectedMap, setSelectedMap] = useState<MapId | "">(
    "",
  );
  const [selectedSpawn, setSelectedSpawn] =
    useState<string>("");
  const [selectedSpawnRegion, setSelectedSpawnRegion] =
    useState<SpawnRegionId | "">("");
  const [selectedModifier, setSelectedModifier] = useState<
    MapModifier | ""
  >("");

  const spawnOptions = selectedMap
    ? spawnPoints.filter((s) => s.map === selectedMap)
    : [];

  const selectedSpawnMeta = spawnPoints.find(
    (s) => s.id === selectedSpawn,
  );

  // Candidate plans filtered by run type, map and spawn
  const candidates = adaptivePlans.filter((plan) => {
    if (
      plan.runType !== selectedRunType ||
      plan.map !== selectedMap
    ) {
      return false;
    }

    // If the plan is tied to a specific spawn and the user has picked one,
    // only keep it when they match. Plans with no spawnRegion or "Any"
    // are generic fallbacks.
    if (
      selectedSpawnRegion &&
      plan.spawnRegion &&
      plan.spawnRegion !== "Any" &&
      plan.spawnRegion !== selectedSpawnRegion
    ) {
      return false;
    }

    return true;
  });

  const primaryPlan =
    candidates.find(
      (plan) =>
        plan.modifier === selectedModifier ||
        plan.modifier === "Any" ||
        !selectedModifier,
    ) || candidates[0];

  const alternativePlans = candidates.filter(
    (plan) => primaryPlan && plan.id !== primaryPlan.id,
  );

  const selectedMapSummary = mapSummaries.find(
    (m) => m.id === selectedMap,
  );

  const selectedModifierSummary = mapModifierSummaries.find(
    (m) => m.id === selectedModifier,
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

  const routeStyleForRunType: Record<string, RouteStyle> = {
    "Boss hunt": "Boss hunting",
    "Loot run": "Loot running",
    "Stealth farm": "Stealth",
  };

  const getSpawnLabel = (id: string | undefined) => {
    if (!id) return "";
    return spawnPoints.find((s) => s.id === id)?.label ?? id;
  };

  const fallbackPlan =
    !primaryPlan && selectedRunType && selectedMap
      ? (() => {
          const runTypeLabel = selectedRunType as string;
          const styleForRun =
            routeStyleForRunType[runTypeLabel];
          const spawnMeta = selectedSpawnMeta;

          const relatedRoutes =
            styleForRun && selectedMap
              ? routes.filter((r) => {
                  if (
                    r.map !== selectedMap ||
                    r.style !== styleForRun
                  ) {
                    return false;
                  }
                  if (!selectedSpawn) {
                    return true;
                  }
                  if (
                    !r.recommendedSpawns ||
                    r.recommendedSpawns.length === 0
                  ) {
                    return true;
                  }
                  return r.recommendedSpawns.includes(
                    selectedSpawn,
                  );
                })
              : [];

          let xpNote = "";
          let summary = "";
          const keyActions: string[] = [];
          const cautions: string[] = [];

          if (runTypeLabel === "Boss hunt") {
            xpNote =
              "XP spikes heavily when you find Bastions, Bombardiers or event bosses. Expect a few dry runs and a few huge ones.";
            summary = spawnMeta
              ? `You are spawning at ${spawnMeta.label} on ${selectedMap}. From there you will fan out along nearby boss lanes, rotating between two or three heavy ARC spawn pockets rather than wandering the whole map.`
              : `You are chasing Bastions, Bombardiers and event bosses on this map. Use cover to farm damage XP and rotate after every big kill.`;

            if (spawnMeta) {
              keyActions.push(
                `From ${spawnMeta.label}, clear immediate threats then push along the nearest safe lane into your first boss lane.`,
                "Identify two or three heavy ARC hotspots from this spawn and loop them rather than crossing the whole map each time.",
                "Use solid cover and height to strip boss armour safely. Maintain long, controlled fights for damage XP.",
                "Loot every visible corpse segment after a boss dies, then immediately rotate off line of sight.",
              );
            } else {
              keyActions.push(
                "Pick two or three boss heavy zones on this map and build a triangle route between them.",
                "Use cover and height to farm Bastions and Bombardiers. Avoid long exposure in open streets or fields.",
                "After each kill, loot quickly then shift to the next leg of the loop.",
              );
            }

            cautions.push(
              "Do not start boss fights in open ground without clear hard cover and an exit route.",
              "Avoid being trapped between bosses and extractions. Know where you will leave before you take the first shot.",
              "Treat squads on bosses as hazards. Your win condition is surviving with XP and loot, not clearing the lobby.",
            );
          } else if (runTypeLabel === "Loot run") {
            xpNote =
              "Steady scavenging XP from containers and corpses with minimal combat if you keep your feet moving.";
            summary = spawnMeta
              ? `You are using ${spawnMeta.label} as the start of a high density loot loop on ${selectedMap}. You will chain nearby buildings and points of interest, tapping every container and corpse while skipping messy fights.`
              : `You are running a fast loot chain on this map, touching as many high density rooms as possible and avoiding long fights.`;

            if (spawnMeta) {
              keyActions.push(
                `From ${spawnMeta.label}, sweep the closest high density interiors first before crossing any wide streets or open yards.`,
                "Open every container and corpse, even if you do not need the items. XP is in the search, not the loot.",
                "Sprint between blocks, slow down and listen once inside buildings.",
                "End the loop near an extraction so you can leave as soon as your bag is worth saving.",
              );
            } else {
              keyActions.push(
                "Pick a starting POI with many containers and interior rooms, then chain two or three more into a loop.",
                "Tap every container and corpse as you pass. Skip most boss fights unless they block your path.",
                "Keep your time in the open as short as possible.",
              );
            }

            cautions.push(
              "Do not over clear areas. Once most containers are tapped, move on.",
              "Avoid chasing distant gunfire through open spaces just for a fight.",
              "If you take heavy damage or lose most of your plates, reset and push towards extraction.",
            );
          } else {
            // Stealth farm
            xpNote =
              "Reliable XP from slow, methodical indoor clears. Safer than boss looping but slower in perfect conditions.";
            summary = spawnMeta
              ? `You are spawning at ${spawnMeta.label} on ${selectedMap}. From there you will lock down one wing or block at a time, clearing and looting each room while staying ahead of other players.`
              : `You are controlling one dense section of the map at a time, clearing and looting every room while avoiding noisy long range fights.`;

            if (spawnMeta) {
              keyActions.push(
                `From ${spawnMeta.label}, pick a single wing, block or cluster of buildings and commit to clearing it piece by piece.`,
                "Close or re use doors so you hear if someone follows your path.",
                "Use suppressed weapons where possible and avoid unnecessary explosives.",
                "If you hear multiple players breaching your area, shift sideways to a neighbouring block instead of contesting the same rooms.",
              );
            } else {
              keyActions.push(
                "Choose a compact interior zone and clear it one floor at a time.",
                "Control noise. Walk more than you sprint and avoid loud abilities unless you are already in a fight.",
                "Rotate between neighbouring wings rather than crossing the entire map.",
              );
            }

            cautions.push(
              "Constant sprinting indoors defeats the point of stealth. Preserve audio advantage.",
              "Avoid long sightlines that connect to open courtyards or streets.",
              "Watch the raid timer. Stealth routes can quietly eat a whole session if you forget to leave.",
            );
          }

          return {
            title: `${selectedRunType} pattern from ${
              spawnMeta ? spawnMeta.label : "spawn"
            }`,
            xpNote,
            summary,
            keyActions,
            cautions,
            routes: relatedRoutes,
          };
        })()
      : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Run Assistant
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Tactical Planner
          </div>
        </div>
      </div>

      {/* Step 1 */}
      <Card variant="tactical">
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Step 1: Choose Run Type
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {runTypes.map((type, index) => (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedRunType(type.value);
                setSelectedMap("");
                setSelectedSpawn("");
                setSelectedModifier("");
              }}
              className={`text-left p-5 rounded border transition-all relative overflow-hidden ${
                selectedRunType === type.value
                  ? "border-cyan-500 bg-cyan-950/30 shadow-lg border-glow-cyan-intense"
                  : "border-slate-700/50 bg-slate-900/50 hover:border-cyan-700/50 hover:bg-slate-900/70"
              }`}
            >
              {selectedRunType === type.value && (
                <motion.div
                  layoutId="runTypeSelected"
                  className="absolute inset-0 bg-cyan-500/10"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div className="relative z-10">
                <div className="font-semibold mb-2 uppercase tracking-wide text-sm">
                  {type.label}
                </div>
                <div className="text-sm text-slate-400 leading-relaxed">
                  {type.description}
                </div>
              </div>
              {selectedRunType === type.value && (
                <div className="absolute inset-0 data-stream" />
              )}
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Step 2 */}
      {selectedRunType && (
        <Card variant="tactical">
          <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
            Step 2: Select Map, Spawn and Modifier
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
                Map
              </label>
              <select
                value={selectedMap}
                onChange={(e) => {
                  setSelectedMap(e.target.value as MapId);
                  setSelectedSpawn("");
                  setSelectedModifier("");
                }}
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
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
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
                Map Modifier
              </label>
              <select
                value={selectedModifier}
                onChange={(e) =>
                  setSelectedModifier(
                    e.target.value as MapModifier,
                  )
                }
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
              >
                <option value="">Any modifier</option>
                {mapModifiers.map((mod) => (
                  <option key={mod.value} value={mod.value}>
                    {mod.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedMap && (
              <div>
                <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
                  Spawn Area
                </label>
                <select
                  value={selectedSpawnRegion}
                  onChange={(e) =>
                    setSelectedSpawnRegion(
                      e.target.value as SpawnRegionId,
                    )
                  }
                  className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
                >
                  <option value="">Rough spawn area...</option>
                  {(spawnRegionsByMap[selectedMap] ?? []).map(
                    (sr) => (
                      <option key={sr.id} value={sr.id}>
                        {sr.label}{" "}
                        {`(${sr.exampleCallouts.join(", ")})`}
                      </option>
                    ),
                  )}
                </select>
                {selectedSpawnRegion && (
                  <p className="text-xs text-slate-500 mt-1">
                    {
                      (
                        spawnRegionsByMap[selectedMap] ?? []
                      ).find(
                        (sr) => sr.id === selectedSpawnRegion,
                      )?.notes
                    }
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Primary adaptive plan */}
      {primaryPlan && (
        <Card variant="tactical">
          <div className="flex flex-wrap gap-2 mb-6">
            <Pill variant="info">{primaryPlan.runType}</Pill>
            <Pill variant="default">{primaryPlan.map}</Pill>
            {selectedSpawn && (
              <Pill variant="default">
                Spawn: {getSpawnLabel(selectedSpawn)}
              </Pill>
            )}
            <Pill variant="default">
              {primaryPlan.modifier === "Any"
                ? selectedModifier || "Any modifier"
                : primaryPlan.modifier}
            </Pill>
            <Pill variant="success">{primaryPlan.xpNote}</Pill>
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-cyan-300">
            {primaryPlan.title}
          </h3>
          <p className="text-slate-300 mb-6 leading-relaxed">
            {primaryPlan.summary}
          </p>

          {selectedSpawnMeta && (
            <div className="mb-6 bg-slate-900/40 p-4 rounded border border-slate-700/50">
              <h4 className="font-semibold text-cyan-300 mb-2 text-sm uppercase tracking-wider">
                Spawn Context: {selectedSpawnMeta.label}
              </h4>
              <p className="text-sm text-slate-300">
                {selectedSpawnMeta.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cyan-950/20 p-4 rounded border border-cyan-800/30">
              <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-wide text-sm flex items-center gap-2">
                <Target className="w-4 h-4" />
                Key Actions
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                {primaryPlan.keyActions.map((action, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2"
                  >
                    <span className="text-cyan-400 mt-0.5">
                      ▸
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-950/20 p-4 rounded border border-amber-800/30">
              <h4 className="font-semibold text-amber-400 mb-3 uppercase tracking-wide text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Cautions
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                {primaryPlan.cautions.map((caution, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2"
                  >
                    <span className="text-amber-400 mt-0.5">
                      ▸
                    </span>
                    <span>{caution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Generic spawn aware fallback plan */}
      {!primaryPlan &&
        selectedRunType &&
        selectedMap &&
        fallbackPlan && (
          <Card variant="tactical">
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill variant="info">{selectedRunType}</Pill>
              <Pill variant="default">{selectedMap}</Pill>
              {selectedSpawn && (
                <Pill variant="default">
                  Spawn: {getSpawnLabel(selectedSpawn)}
                </Pill>
              )}
              {selectedModifier && (
                <Pill variant="default">
                  {selectedModifier}
                </Pill>
              )}
              <Pill variant="warning">Generic pattern</Pill>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-cyan-300">
              {fallbackPlan.title}
            </h3>
            <p className="text-sm text-slate-400 mb-2">
              {fallbackPlan.xpNote}
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed">
              {fallbackPlan.summary}
            </p>

            {selectedSpawnMeta && (
              <div className="mb-6 bg-slate-900/40 p-4 rounded border border-slate-700/50">
                <h4 className="font-semibold text-cyan-300 mb-2 text-sm uppercase tracking-wider">
                  Spawn Context: {selectedSpawnMeta.label}
                </h4>
                <p className="text-sm text-slate-300">
                  {selectedSpawnMeta.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="bg-cyan-950/20 p-4 rounded border border-cyan-800/30">
                <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-wide text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Key Actions
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {fallbackPlan.keyActions.map(
                    (action, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2"
                      >
                        <span className="text-cyan-400 mt-0.5">
                          ▸
                        </span>
                        <span>{action}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div className="bg-amber-950/20 p-4 rounded border border-amber-800/30">
                <h4 className="font-semibold text-amber-400 mb-3 uppercase tracking-wide text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Cautions
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {fallbackPlan.cautions.map((caution, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <span className="text-amber-400 mt-0.5">
                        ▸
                      </span>
                      <span>{caution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {fallbackPlan.routes &&
              fallbackPlan.routes.length > 0 && (
                <div className="mt-2 pt-4 border-t border-slate-700/40">
                  <h4 className="font-semibold text-cyan-300 mb-2 uppercase tracking-wide text-sm">
                    Suggested routes from this spawn
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    These come from your Farming Routes data and
                    are filtered to match this map, run type and
                    spawn where possible.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {fallbackPlan.routes.map((route) => (
                      <Card
                        key={route.id}
                        className="bg-slate-900/60"
                      >
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Pill>{route.map}</Pill>
                          <Pill variant="info">
                            {route.style}
                          </Pill>
                        </div>
                        <h5 className="text-sm font-semibold text-cyan-300 mb-1">
                          {route.name}
                        </h5>
                        <div className="text-xs text-slate-400 mb-1">
                          <div>
                            <span className="font-semibold text-slate-300">
                              XP:
                            </span>{" "}
                            {route.estXp}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-300">
                              Time:
                            </span>{" "}
                            {route.timePerRun}
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-snug">
                          {route.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
          </Card>
        )}

      {/* POI route for detailed plans only */}
      {primaryPlan?.poiRoute &&
        primaryPlan.poiRoute.length > 0 && (
          <Card>
            <h3 className="text-xl font-semibold mb-2 text-cyan-300 uppercase tracking-wide">
              Suggested POI Route
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Use this order as a default path. Adjust on the
              fly based on spawn, event timers and where you
              hear gunfire.
            </p>
            <ol className="list-none pl-0 space-y-4">
              {primaryPlan.poiRoute.map((stop, index) => (
                <li
                  key={stop.name + index}
                  className="flex gap-4 bg-slate-900/30 p-4 rounded border border-slate-700/30"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-900/50 rounded flex items-centre justify-centre text-cyan-300 font-bold border border-cyan-700/50">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-cyan-300 mb-2">
                      {stop.name}
                    </p>
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      <Pill variant="info" className="text-xs">
                        {stop.purpose}
                      </Pill>
                    </div>
                    <span className="text-sm text-slate-400">
                      {stop.notes}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        )}

      {/* Map and modifier context as before */}
      {selectedMapSummary && (
        <Card>
          <div className="flex items-start gap-3 mb-4">
            <Map className="w-5 h-5 text-cyan-400 mt-1" />
            <h3 className="text-xl font-semibold text-cyan-300 uppercase tracking-wide">
              About This Map
            </h3>
          </div>
          <p className="text-slate-300 mb-4 leading-relaxed">
            {selectedMapSummary.description}
          </p>
          <div className="bg-cyan-950/20 p-4 rounded border border-cyan-800/30">
            <p className="text-sm text-cyan-300/90 italic">
              {selectedMapSummary.soloNote}
            </p>
          </div>
        </Card>
      )}

      {selectedModifierSummary && (
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
            Active Event
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <Pill
              variant={getXpImpactVariant(
                selectedModifierSummary.xpImpact,
              )}
            >
              XP: {selectedModifierSummary.xpImpact}
            </Pill>
            <Pill
              variant={getDangerVariant(
                selectedModifierSummary.danger,
              )}
            >
              Danger: {selectedModifierSummary.danger}
            </Pill>
          </div>
          <p className="text-slate-300 mb-4 leading-relaxed">
            {selectedModifierSummary.description}
          </p>
          <div className="mt-6 bg-slate-900/30 p-4 rounded border border-slate-700/30">
            <h4 className="font-semibold text-cyan-400 mb-3 text-sm uppercase tracking-wider">
              Solo Tips:
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              {selectedModifierSummary.soloTips.map(
                (tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2"
                  >
                    <span className="text-cyan-400 mt-0.5">
                      ▸
                    </span>
                    <span>{tip}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </Card>
      )}

      {/* Nearby recyclables areas */}
      {(() => {
        if (!selectedMap || (!selectedSpawnRegion && !primaryPlan && !fallbackPlan)) {
          return null;
        }

        const nearbyRecyclables = recyclableAreas.filter((area) => {
          if (area.map !== selectedMap) return false;
          if (
            selectedSpawnRegion &&
            area.regionId &&
            area.regionId !== selectedSpawnRegion
          ) {
            return false;
          }
          return area.density === "High" || area.density === "Very High";
        });

        if (nearbyRecyclables.length === 0) return null;

        return (
          <Card>
            <div className="flex items-start gap-3 mb-4">
              <Recycle className="w-5 h-5 text-cyan-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-cyan-300 uppercase tracking-wide">
                  Nearby Recyclables Areas
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  High value recyclables pockets you should tap on this
                  pattern
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {nearbyRecyclables.slice(0, 3).map((area) => {
                const regionLabel = area.regionId
                  ? (
                      spawnRegionsByMap[selectedMap] ?? []
                    ).find((r) => r.id === area.regionId)?.label
                  : undefined;

                return (
                  <div
                    key={area.id}
                    className="bg-slate-900/40 p-4 rounded border border-slate-700/30"
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Pill variant="info">{area.name}</Pill>
                      {regionLabel && (
                        <Pill variant="default">{regionLabel}</Pill>
                      )}
                      <Pill
                        variant={
                          area.density === "Very High"
                            ? "success"
                            : "info"
                        }
                      >
                        {area.density}
                      </Pill>
                      {area.approximateYield && (
                        <Pill variant="default" className="text-xs">
                          {area.approximateYield}
                        </Pill>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })()}

      {alternativePlans.length > 0 && primaryPlan && (
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
            Alternative Approaches on This Map
          </h3>
          <div className="space-y-4">
            {alternativePlans.map((plan) => (
              <div
                key={plan.id}
                className="border-l-2 border-cyan-500 pl-4 py-2 bg-slate-900/30 rounded-r"
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  {plan.spawn && plan.spawn !== "Any" && (
                    <Pill variant="default">
                      Spawn: {getSpawnLabel(plan.spawn)}
                    </Pill>
                  )}
                  <Pill variant="default">
                    {plan.modifier === "Any"
                      ? "Any modifier"
                      : plan.modifier}
                  </Pill>
                </div>
                <h4 className="font-semibold mb-1 text-cyan-300">
                  {plan.title}
                </h4>
                <p className="text-sm text-slate-400">
                  {plan.summary}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

/**
 * FARMING ROUTES
 */
function FarmingRoutesSection() {
  const [filterStyle, setFilterStyle] = useState<
    RouteStyle | "All"
  >("All");

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
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Farming Routes
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Route Database
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              "All",
              "Boss hunting",
              "Loot running",
              "Stealth",
            ] as const
          ).map((style) => (
            <button
              key={style}
              onClick={() =>
                setFilterStyle(
                  style === "All"
                    ? "All"
                    : (style as RouteStyle),
                )
              }
              className={`px-4 py-2 rounded transition-all uppercase tracking-wide text-sm ${
                filterStyle === style
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="bg-slate-900/50">
              <div className="flex flex-wrap gap-2 mb-4">
                <Pill>{route.map}</Pill>
                <Pill variant={getRiskVariant(route.risk)}>
                  {route.risk} Risk
                </Pill>
                <Pill variant="info">{route.style}</Pill>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                {route.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div className="bg-cyan-950/20 p-3 rounded border border-cyan-800/30">
                  <span className="text-slate-400 uppercase tracking-wider text-xs">
                    Estimated XP
                  </span>
                  <div className="text-cyan-400 font-semibold mt-1">
                    {route.estXp}
                  </div>
                </div>
                <div className="bg-slate-800/30 p-3 rounded border border-slate-700/30">
                  <span className="text-slate-400 uppercase tracking-wider text-xs">
                    Time per Run
                  </span>
                  <div className="text-slate-300 font-semibold mt-1">
                    {route.timePerRun}
                  </div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {route.description}
              </p>
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
      <div className="flex items-centre gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            High Value Targets
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Combat Intel
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex items-start gap-3 mb-4">
          <Crosshair className="w-5 h-5 text-red-400 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-cyan-300 uppercase tracking-wide">
              Target Priority By XP
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Solo you want long, controlled fights with big
              ARCs and very short fights with players.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-400 font-semibold mb-2 uppercase tracking-wide text-xs">
              Tier 1 - Prime XP
            </h4>
            <ul className="space-y-2">
              <li>
                Bastions and Rocketeers you can farm from cover.
              </li>
              <li>
                Bombardiers in open ground where you control
                angles.
              </li>
              <li>
                Queens and other named bosses during events.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-amber-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Tier 2 - Worth if safe
            </h4>
            <ul className="space-y-2">
              <li>
                Mixed ARC packs you can funnel through doors or
                choke points.
              </li>
              <li>
                Turrets and Shredders in Stella Montis that you
                can peek safely.
              </li>
              <li>
                Leaper packs that have already committed to
                other players.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-slate-200 font-semibold mb-2 uppercase tracking-wide text-xs">
              Tier 3 - Usually skip
            </h4>
            <ul className="space-y-2">
              <li>Bosses in open fields with no hard cover.</li>
              <li>
                Any ARC cluster that requires you to cross
                sniper sightlines.
              </li>
              <li>
                Player plus boss stacks when you are low on
                plates or ammo.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/40 text-sm text-slate-300">
          <p>
            For XP it is better to take a Bastion from half
            health to zero in a safe lane than to tap it once
            and run. Once a boss dies, loot every visible piece
            of the corpse. Each segment counts.
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Boss Behaviour Cheat Sheet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Bastions and Rocketeers
            </h4>
            <ul className="space-y-2">
              <li>
                Fight them from the side or rear. Their frontal
                cone hurts.
              </li>
              <li>
                Use vertical cover on Buried City roofs or Dam
                walkways.
              </li>
              <li>
                Blaze grenades and LMG fire on weak spots give
                excellent XP.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Bombardiers and grenade spam
            </h4>
            <ul className="space-y-2">
              <li>
                Circle them around solid objects, not in open
                courtyards.
              </li>
              <li>
                On Spaceport, use container rows to break arcs
                and grenades.
              </li>
              <li>
                Save sprint for dodging barrages, not for
                chasing them.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Queens, Matriarchs and event bosses
            </h4>
            <ul className="space-y-2">
              <li>
                Arrive late and let squads crack the first
                armour plates.
              </li>
              <li>
                Focus on add control and safe damage rather than
                winning the duel.
              </li>
              <li>
                During loud global events, do not be the first
                Raider standing in the open.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Indoor threats - Stella and Blue Gate
            </h4>
            <ul className="space-y-2">
              <li>
                Break line of sight with turrets and Shredders
                every few shots.
              </li>
              <li>
                In tunnels, treat every bend like a proper
                corner clear.
              </li>
              <li>
                Smoke is for breaking tracking and sightlines,
                not only looting.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Player Interaction Around Bosses
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              If a squad has already claimed a boss, play clean
              up. Control adds, loot safely and only third party
              if they push you first.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              During events, position yourself where you can
              exit to extraction after one or two boss cycles.
              Do not let greed keep you in for all phases.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Treat every boss arena as a funnel. Know your
              retreat direction before you take the first shot.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

function LoadoutsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-centre gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Loadouts
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Equipment Profiles
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {loadouts.map((loadout) => (
          <Card key={loadout.id} variant="tactical">
            <h3 className="text-xl font-semibold mb-2 text-cyan-300 uppercase tracking-wide">
              {loadout.name}
            </h3>
            <p className="text-slate-400 mb-6 italic">
              {loadout.focus}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-900/30 p-4 rounded border border-slate-700/30">
                <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-wider text-sm">
                  Weapons
                </h4>
                <div className="space-y-3 text-slate-300 text-sm">
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-xs block mb-1">
                      Primary
                    </span>
                    <span>{loadout.primary}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-xs block mb-1">
                      Secondary
                    </span>
                    <span>{loadout.secondary}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/30 p-4 rounded border border-slate-700/30">
                <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-wider text-sm">
                  Utilities
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {loadout.utilities.map((util, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <span className="text-cyan-400 mt-0.5">
                        ▸
                      </span>
                      <span>{util}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cyan-950/20 p-4 rounded border border-cyan-800/30">
                <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-wider text-sm">
                  Key Skills
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {loadout.skills.map((skill, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <span className="text-cyan-400 mt-0.5">
                        ▸
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
                <h4 className="font-semibold text-slate-400 mb-3 uppercase tracking-wider text-sm">
                  Notes
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {loadout.notes}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * SHORTCUTS
 */
function ShortcutsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-centre gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Shortcuts
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Advanced Tactics
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex items-start gap-3 mb-4">
          <Zap className="w-5 h-5 text-amber-400 mt-1" />
          <h3 className="text-xl font-semibold text-cyan-300 uppercase tracking-wide">
            High XP per Minute Tricks
          </h3>
        </div>
        <div className="space-y-4 text-slate-300 text-sm">
          <div className="bg-amber-950/20 p-4 rounded border border-amber-800/30">
            <h4 className="font-semibold text-amber-300 mb-2 uppercase tracking-wider text-xs">
              Free kit suicide runs
            </h4>
            <ul className="space-y-2">
              <li>
                Take a free loadout, ignore gear and focus
                purely on XP.
              </li>
              <li>
                Run straight to high density zones like Seed
                Vault or domes.
              </li>
              <li>
                Open every container and corpse you can reach.
              </li>
              <li>
                If you die that is acceptable. You keep
                scavenging XP and lose only the free gear.
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              Partial loot trick
            </h4>
            <p>
              You gain XP when a search starts, not only when
              you take items. Tapping already looted containers,
              bodies and crates still gives XP, especially in
              busy Buried City blocks or Spaceport warehouses.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Time Saving Patterns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              Late entry event swoops
            </h4>
            <ul className="space-y-2">
              <li>
                For Hidden Bunker, Launch Tower or Harvester,
                aim to arrive mid phase, not at the start.
              </li>
              <li>
                Let squads open doors and clear first waves,
                then sweep containers and corpses.
              </li>
              <li>
                Leave as soon as the area is stripped of XP and
                loot.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              Double dip extractions
            </h4>
            <ul className="space-y-2">
              <li>
                Finish a short loop that ends near an
                extraction.
              </li>
              <li>
                Hit one more quick side point of interest on the
                way out.
              </li>
              <li>
                Extract on the same call so you compress two
                pockets of XP into one timer.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Low Effort Options
        </h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              AFK night survival
            </h4>
            <p>
              In Night Raid conditions you can hide in a deep
              interior room on Dam or Buried City and gain slow
              XP from time on surface and a few containers.
              Extremely slow but completely hands off.
            </p>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              Safe end of raid sweeps
            </h4>
            <p>
              Late game, quieter wings like apartments, Dam
              residential or Stella side wings often have
              leftover containers with no players around. A
              quick five minute sweep can top up a run safely.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Boss Tricks
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Blaze grenades and traps are excellent for melting
              large ARC bosses while stacking damage XP. Place
              them where bosses must walk.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Use smoke before looting boss corpses so you are
              not an easy target for other players.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Try to fight bosses near natural barriers. A
              Bastion on a staircase or a Queen near a pillar is
              far easier for a solo to control.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

/**
 * GENERAL TIPS
 */
function GeneralTipsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-centre gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            General Tips
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Field Manual
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Pre Raid Checklist
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Decide the purpose of the run: XP, coin, keys or
              quest progress. Build around that, not random
              vibes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Pick a route and stick to it unless an event or
              player movement gives you a clear reason to pivot.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Bring at least one escape tool. Smoke, flash or a
              strong movement skill saves more gear than one
              extra grenade.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Know which extraction you prefer and how you will
              reach it from your first point of interest.
            </span>
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Solo Habits That Speed Up Levelling
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Open every container and body you see, even when
              you do not need the loot. XP from searching is
              what you are really farming.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Avoid pointless PvP. Take fights when they protect
              your XP, remove a direct threat or give a clear
              advantage like height or audio.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Learn one route for each mood: fast and risky,
              safe and slow, and a balanced money route.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              If you are on a great run, do not get greedy.
              Extract once your bag is worth keeping or your
              armour stack is low.
            </span>
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Mid Run Decision Making
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              When to push
            </h4>
            <ul className="space-y-2">
              <li>You hear heavy ARC fire and panic shots.</li>
              <li>
                You are already near the point of interest.
              </li>
              <li>
                You have spare plates, ammo and at least one
                escape tool.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              When to leave
            </h4>
            <ul className="space-y-2">
              <li>
                Your bag is mostly full and you are low on
                healing.
              </li>
              <li>
                You hear multiple squads rotating into your
                zone.
              </li>
              <li>
                You have already hit the main points of interest
                in your plan.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Staying Sane During The Grind
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Set small targets such as a couple of levels or a
              handful of successful extractions per session.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Swap routes or playstyles when you feel yourself
              tilting. Move from boss hunting to quiet loops to
              reset.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Future seasons may change progression. Map
              knowledge and calm decision making will always
              carry over.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

/**
 * XP PLANNER
 */
type XpBand = "rookie" | "seasoned" | "veteran";

function XpPlannerSection() {
  const [currentLevel, setCurrentLevel] = useState(12);
  const [targetLevel, setTargetLevel] = useState(40);
  const [xpBand, setXpBand] = useState<XpBand>("seasoned");

  const xpBandConfig: Record<
    XpBand,
    { label: string; description: string; avgXp: number }
  > = {
    rookie: {
      label: "Newly Dropped Raider",
      description:
        "Learning routes, lots of scouting and some scuffed extractions. Expect slower levelling.",
      avgXp: 22000,
    },
    seasoned: {
      label: "Seasoned Raider",
      description:
        "Comfortable on a couple of routes, mostly extracting, occasional boss or event fights.",
      avgXp: 30000,
    },
    veteran: {
      label: "ARC Veteran",
      description:
        "Confident pathing, regular boss loops or hot routes, good extraction discipline.",
      avgXp: 40000,
    },
  };

  const avgXpPerRun = xpBandConfig[xpBand].avgXp;

  const levelsToGain = Math.max(targetLevel - currentLevel, 0);
  const totalXpNeeded = levelsToGain * XP_PER_LEVEL;
  const runsNeeded =
    avgXpPerRun > 0
      ? Math.ceil(totalXpNeeded / avgXpPerRun)
      : 0;
  const sessionsNeeded = Math.ceil(runsNeeded / 5);

  const formatNumber = (num: number) =>
    num.toLocaleString("en-GB");

  const hasValidPlan = levelsToGain > 0 && avgXpPerRun >= 1000;

  const grindType = (() => {
    if (levelsToGain <= 5) return "short" as const;
    if (levelsToGain <= 20) return "medium" as const;
    return "long" as const;
  })();

  const getRiskVariant = (risk: string) => {
    if (risk === "Low") return "success";
    if (risk === "Medium") return "warning";
    if (risk === "High") return "danger";
    return "default";
  };

    const suggestedRoutes = (() => {
    if (!hasValidPlan) return [];

    // 1. Start from farming routes only
    let candidates = routes.filter(
      (r) => r.style === "Loot running" || r.style === "Stealth"
    );

    // 2. Then shape by grind length using risk as a soft filter
    if (grindType === "short") {
      // Small gap - safer farming
      candidates = candidates.filter(
        (r) => r.risk === "Low" || r.risk === "Medium"
      );
    } else if (grindType === "medium") {
      // Medium grind - allow medium and high
      candidates = candidates.filter(
        (r) => r.risk === "Medium" || r.risk === "High"
      );
    } else {
      // Long grind - favour stronger routes but still farming
      candidates = candidates.filter(
        (r) => r.risk === "Medium" || r.risk === "High"
      );
    }

    // 3. If we filtered everything out, fall back to all farming routes
    if (candidates.length === 0) {
      candidates = routes.filter(
        (r) => r.style === "Loot running" || r.style === "Stealth"
      );
    }

    // 4. Absolute last resort, allow boss routes as well
    if (candidates.length === 0) {
      candidates = routes.slice();
    }

    // 5. Prefer a bit of map variety and cap at 3 results
    const picked: typeof routes = [];
    const usedMaps = new Set<string>();

    for (const route of candidates) {
      if (picked.length >= 3) break;
      if (!usedMaps.has(route.map)) {
        picked.push(route);
        usedMaps.add(route.map);
      }
    }

    if (picked.length < 3) {
      for (const route of candidates) {
        if (picked.length >= 3) break;
        if (!picked.find((r) => r.id === route.id)) {
          picked.push(route);
        }
      }
    }

    return picked;
  })();

  const grindLabel =
    grindType === "short"
      ? "a short grind"
      : grindType === "medium"
        ? "a medium length grind"
        : "a long grind";

  return (
    <div className="space-y-6">
      <div className="flex items-centre gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            XP Planner
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Progress Calculator
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <h3 className="text-xl font-semibold mb-6 text-cyan-300 uppercase tracking-wide">
          Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Current Level
            </label>
            <input
              type="number"
              min={1}
              max={75}
              value={currentLevel}
              onChange={(e) =>
                setCurrentLevel(
                  Math.max(
                    1,
                    Math.min(
                      75,
                      parseInt(e.target.value, 10) || 1,
                    ),
                  ),
                )
              }
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Target Level
            </label>
            <input
              type="number"
              min={1}
              max={75}
              value={targetLevel}
              onChange={(e) =>
                setTargetLevel(
                  Math.max(
                    1,
                    Math.min(
                      75,
                      parseInt(e.target.value, 10) || 75,
                    ),
                  ),
                )
              }
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Solo Experience Band
            </label>
            <select
              value={xpBand}
              onChange={(e) =>
                setXpBand(e.target.value as XpBand)
              }
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
            >
              <option value="rookie">
                {xpBandConfig.rookie.label} (about 22 000 XP per
                run)
              </option>
              <option value="seasoned">
                {xpBandConfig.seasoned.label} (about 30 000 XP
                per run)
              </option>
              <option value="veteran">
                {xpBandConfig.veteran.label} (about 40 000 XP
                per run)
              </option>
            </select>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Estimated average XP per run for this band:{" "}
          <span className="text-cyan-300 font-semibold">
            {formatNumber(avgXpPerRun)}
          </span>
          . {xpBandConfig[xpBand].description}
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="tactical">
          <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-widest">
            Total XP Needed
          </h4>
          <p className="text-3xl font-bold text-cyan-400 text-glow-cyan">
            {formatNumber(totalXpNeeded)}
          </p>
        </Card>
        <Card variant="tactical">
          <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-widest">
            Estimated Runs Needed
          </h4>
          <p className="text-3xl font-bold text-cyan-400 text-glow-cyan">
            {runsNeeded}
          </p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-widest">
            Example Plan
          </h4>
          <p className="text-lg font-semibold text-slate-200">
            About {sessionsNeeded} sessions of 5 focused runs
          </p>
        </Card>
      </div>

      {hasValidPlan ? (
        <Card>
          <h3 className="text-xl font-semibold mb-3 text-cyan-300 uppercase tracking-wide">
            Suggested Farming Routes
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            You need {levelsToGain} level
            {levelsToGain === 1 ? "" : "s"}, which is{" "}
            {grindLabel}. As a{" "}
            <span className="text-cyan-300 font-semibold">
              {xpBandConfig[xpBand].label}
            </span>{" "}
            averaging about{" "}
            <span className="text-cyan-300 font-semibold">
              {formatNumber(avgXpPerRun)} XP per run
            </span>
            , these routes match your risk and throughput.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedRoutes.map((route) => (
              <Card key={route.id} className="bg-slate-900/60">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Pill>{route.map}</Pill>
                  <Pill variant={getRiskVariant(route.risk)}>
                    {route.risk} risk
                  </Pill>
                  <Pill variant="info">{route.style}</Pill>
                </div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">
                  {route.name}
                </h4>
                <div className="text-xs text-slate-400 mb-2">
                  <div>
                    <span className="font-semibold text-slate-300">
                      Estimated XP:
                    </span>{" "}
                    {route.estXp}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-300">
                      Time per run:
                    </span>{" "}
                    {route.timePerRun}
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {route.description}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <p className="text-sm text-slate-400">
            Set a higher target level than your current level
            and choose a solo experience band to see suggested
            farming routes.
          </p>
        </Card>
      )}

      <Card>
        <p className="text-sm text-slate-400 italic">
          Note: This is approximate and based on a simple flat
          XP model. Routes are suggested by grind length, solo
          experience band and risk profile, not exact XP
          mathematics.
        </p>
      </Card>
    </div>
  );
}

export default App;