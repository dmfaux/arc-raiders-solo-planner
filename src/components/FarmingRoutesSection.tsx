import { useState } from "react";
import { RouteStyle } from "../types";
import { routes } from "../data/routes";
import { Card } from "./Card";
import { Pill } from "./Pill";

export default function FarmingRoutesSection() {
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

