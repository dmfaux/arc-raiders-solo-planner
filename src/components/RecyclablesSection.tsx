import { useState } from "react";
import { MapId, SpawnRegionId, RecyclableDensity } from "../types";
import { recyclableAreas } from "../data/recyclables";
import { spawnRegionsByMap } from "../data/spawn";
import { Card } from "./Card";
import { Pill } from "./Pill";
import { Recycle, Map } from "lucide-react";

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

const densityOptions: RecyclableDensity[] = [
  "Low",
  "Medium",
  "High",
  "Very High",
];

function RecyclablesSection() {
  const [selectedMap, setSelectedMap] = useState<MapId | "">("");
  const [selectedRegion, setSelectedRegion] = useState<SpawnRegionId | "">(
    "",
  );
  const [selectedDensity, setSelectedDensity] = useState<
    RecyclableDensity | "All"
  >("All");

  const filteredAreas = recyclableAreas.filter((area) => {
    if (selectedMap && area.map !== selectedMap) return false;
    if (
      selectedRegion &&
      area.regionId &&
      area.regionId !== selectedRegion
    ) {
      return false;
    }
    if (selectedDensity !== "All" && area.density !== selectedDensity) {
      return false;
    }
    return true;
  });

  const getDensityVariant = (density: RecyclableDensity) => {
    if (density === "Very High") return "success";
    if (density === "High") return "info";
    if (density === "Medium") return "warning";
    return "default";
  };

  const availableRegions = selectedMap
    ? spawnRegionsByMap[selectedMap] ?? []
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Recyclables
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Materials Farming Guide
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex items-start gap-3 mb-4">
          <Recycle className="w-5 h-5 text-cyan-400 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">
              About Recyclables
            </h3>
          </div>
        </div>
        <div className="space-y-3 text-slate-300 leading-relaxed">
          <p>
            Recyclables are items found throughout Arc Raiders maps that can
            be broken down into materials for crafting and upgrades. Unlike
            regular loot, recyclables spawn in predictable locations and can
            be farmed systematically.
          </p>
          <p className="text-cyan-300/90">
            Why recyclables matter for solo players:
          </p>
          <ul className="list-none ml-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                Materials are essential for upgrading weapons, armour and
                equipment
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                Recyclables farming can be combined with XP routes for
                efficient progression
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                High density areas often overlap with good loot routes, making
                double farming possible
              </span>
            </li>
          </ul>
          <div className="pt-3 mt-3 border-t border-slate-700/50">
            <p className="text-amber-300/90 mb-2">
              Understanding Density:
            </p>
            <p className="text-slate-300">
              Density indicates how likely you are to find recyclables in an area. Higher density means more recyclables spawn, but these high-value locations also attract other raiders, increasing your risk of PvP encounters. Choose your farming routes based on your current risk tolerance and material needs.
            </p>
          </div>
        </div>
      </Card>

      <Card variant="tactical">
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Map
            </label>
            <select
              value={selectedMap}
              onChange={(e) => {
                setSelectedMap(e.target.value as MapId);
                setSelectedRegion("");
              }}
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
            >
              <option value="">All maps</option>
              {maps.map((map) => (
                <option key={map.value} value={map.value}>
                  {map.label}
                </option>
              ))}
            </select>
          </div>

          {selectedMap && availableRegions.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
                Spawn Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) =>
                  setSelectedRegion(e.target.value as SpawnRegionId)
                }
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
              >
                <option value="">All regions</option>
                {availableRegions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Density
            </label>
            <select
              value={selectedDensity}
              onChange={(e) =>
                setSelectedDensity(
                  e.target.value === "All"
                    ? "All"
                    : (e.target.value as RecyclableDensity),
                )
              }
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
            >
              <option value="All">All densities</option>
              {densityOptions.map((density) => (
                <option key={density} value={density}>
                  {density}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {filteredAreas.length > 0 ? (
        <div className="space-y-4">
          {filteredAreas.map((area) => {
            const regionLabel = area.regionId
              ? availableRegions.find((r) => r.id === area.regionId)?.label
              : undefined;

            return (
              <Card key={area.id} className="bg-slate-900/50">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Pill>{area.map}</Pill>
                  {regionLabel && (
                    <Pill variant="default">{regionLabel}</Pill>
                  )}
                  <Pill variant={getDensityVariant(area.density)}>
                    {area.density} Density
                  </Pill>
                  {area.approximateYield && (
                    <Pill variant="info">{area.approximateYield}</Pill>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                  {area.name}
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {area.description}
                </p>
                {area.notes && (
                  <div className="bg-cyan-950/20 p-4 rounded border border-cyan-800/30">
                    <h4 className="font-semibold text-cyan-400 mb-2 text-sm uppercase tracking-wider">
                      Tactical Notes
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {area.notes}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="flex items-center gap-3">
            <Map className="w-5 h-5 text-slate-400" />
            <p className="text-slate-400">
              {selectedMap || selectedDensity !== "All"
                ? "No recyclables areas match your filters. Try adjusting your selection."
                : "Select a map or density filter to view recyclables areas."}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default RecyclablesSection;

