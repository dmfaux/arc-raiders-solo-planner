import { useState } from "react";
import { routes } from "../data/routes";
import { Card } from "./Card";
import { Pill } from "./Pill";

const XP_PER_LEVEL = 10000;

type XpBand = "rookie" | "seasoned" | "veteran";

export default function XpPlannerSection() {
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
      avgXp: 5000,
    },
    seasoned: {
      label: "Seasoned Raider",
      description:
        "Comfortable on a couple of routes, mostly extracting, occasional boss or event fights.",
      avgXp: 12000,
    },
    veteran: {
      label: "ARC Veteran",
      description:
        "Confident pathing, regular boss loops or hot routes, good extraction discipline.",
      avgXp: 16000,
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
      <div className="flex items-center gap-4 mb-8">
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

          {hasValidPlan && suggestedRoutes.length === 0 && (
            <Card>
              <p className="text-sm text-slate-400">
                A valid plan is calculated, but there are no matching routes in your current data for this grind length and risk profile. 
                Add more routes to your farming database, or relax your filters.
              </p>
            </Card>
          )}

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
          Note: This is approximate and based on a simple flat XP model. Routes are suggested by grind length, solo experience band and risk profile, not exact XP maths. 
          Treat the numbers as a rough compass rather than precise timing.
        </p>
      </Card>
    </div>
  );
}

