import { useState } from "react";
import { motion } from "framer-motion";
import {
  RunType,
  MapId,
  MapModifier,
  RouteStyle,
  SpawnRegionId,
} from "../types";
import { adaptivePlans, spawnPoints } from "../data/plans";
import { routes } from "../data/routes";
import {
  mapModifierSummaries,
  mapSummaries,
} from "../data/events";
import { Card } from "./Card";
import { Pill } from "./Pill";
import {
  Target,
  Map,
  Zap,
  Recycle,
} from "lucide-react";
import { spawnRegionsByMap } from "../data/spawn";
import { recyclableAreas } from "../data/recyclables";

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

export default function RunAssistantSection() {
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

  const hasPlan = Boolean(primaryPlan || fallbackPlan);

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
          <p className="text-xs text-slate-400 mb-4">
            Use the spawn area to roughly describe where you loaded into the map, so the pattern can adapt to nearby lanes and points of interest.
          </p>
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
          {selectedRunType && !selectedMap && (
            <p className="text-xs text-slate-500 mt-2">
              Choose a map first, then refine with spawn area and active event modifiers.
            </p>
          )}
        </Card>
      )}

      {selectedRunType && selectedMap && !hasPlan && (
        <Card>
          <p className="text-sm text-slate-400">
            There is no specific pattern yet for this combination of run type, map and event in your local data. 
            Try a different modifier or spawn area, or fall back to your own standard route.
          </p>
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

