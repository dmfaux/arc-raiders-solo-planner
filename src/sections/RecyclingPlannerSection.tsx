import { useState } from "react";
import { Card } from "../components/Card";
import { Pill } from "../components/Pill";
import {
  targetMaterials,
  findSourcesForTarget,
} from "../data/recycling";
import { Recycle, TrendingUp } from "lucide-react";

function RecyclingPlannerSection() {
  const [selectedTargetId, setSelectedTargetId] = useState<string>("");

  const selectedTarget = targetMaterials.find(
    (m) => m.id === selectedTargetId,
  );

  // Get sources for selected target
  const sources = selectedTargetId
    ? findSourcesForTarget(selectedTargetId)
    : [];

  // Get top 2 most efficient sources for summary
  const topSources = sources.slice(0, 2);

  const getRarityVariant = (rarity?: string) => {
    if (rarity === "Epic") return "danger";
    if (rarity === "Rare") return "warning";
    if (rarity === "Common") return "success";
    return "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Recycling Planner
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Reverse Material Lookup
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex items-start gap-3 mb-4">
          <Recycle className="w-5 h-5 text-cyan-400 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">
              About Recycling Planner
            </h3>
          </div>
        </div>
        <div className="space-y-3 text-slate-300 leading-relaxed">
          <p>
            Select a target material or part you want to obtain, and the planner
            will show you which items can be recycled to produce that material.
            Results are sorted by efficiency, showing the highest yield options
            first.
          </p>
          <p className="text-cyan-300/90">
            How to use this tool:
          </p>
          <ul className="list-none ml-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                Choose the material you need from the dropdown below
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                Review the list of recyclable items sorted by yield efficiency
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                Check location tags to find where items spawn during your runs
              </span>
            </li>
          </ul>
        </div>
      </Card>

      <Card variant="tactical">
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Target Material Selection
        </h3>
        <div>
          <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
            Target Material
          </label>
          <select
            value={selectedTargetId}
            onChange={(e) => setSelectedTargetId(e.target.value)}
            className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
          >
            <option value="">Select a target material...</option>
            {targetMaterials
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                  {material.rarity ? ` (${material.rarity})` : ""}
                </option>
              ))}
          </select>
        </div>
      </Card>

      {selectedTargetId && sources.length > 0 && (
        <>
          <Card variant="tactical">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-cyan-400 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Summary
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  <span className="text-cyan-300 font-semibold">
                    {sources.length}
                  </span>{" "}
                  different item{sources.length === 1 ? "" : "s"} can be
                  recycled into{" "}
                  <span className="text-cyan-300 font-semibold">
                    {selectedTarget?.name}
                  </span>
                  .{" "}
                  {topSources.length > 0 && (
                    <>
                      The most efficient option{topSources.length === 1 ? "" : "s"} {topSources.length === 1 ? "is" : "are"}{" "}
                      <span className="text-cyan-300 font-semibold">
                        {topSources
                          .map((s) => s.source.name)
                          .join(" and ")}
                      </span>{" "}
                      by output per recycle.
                    </>
                  )}
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
              Recyclable Sources
            </h3>
            {sources.map(({ source, yield: recyclingYield }) => (
              <Card key={source.id} className="bg-slate-900/50">
                <div className="flex flex-wrap gap-2 mb-4">
                  {source.rarity && (
                    <Pill variant={getRarityVariant(source.rarity)}>
                      {source.rarity}
                    </Pill>
                  )}
                  {source.category && (
                    <Pill variant="default">{source.category}</Pill>
                  )}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-cyan-300">
                  {source.name}
                </h4>
                <div className="mb-4">
                  <p className="text-slate-300 mb-2">
                    <span className="text-cyan-400 font-semibold">
                      Yields:
                    </span>{" "}
                    <span className="text-slate-100 font-semibold">
                      {recyclingYield.amount}
                    </span>{" "}
                    of{" "}
                    <span className="text-cyan-300 font-semibold">
                      {selectedTarget?.name}
                    </span>{" "}
                    per recycle
                  </p>
                </div>
                {source.tags && source.tags.length > 0 && (
                  <div className="bg-cyan-950/20 p-4 rounded border border-cyan-800/30">
                    <h5 className="font-semibold text-cyan-400 mb-2 text-sm uppercase tracking-wider">
                      Location Tags
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {source.tags.map((tag) => (
                        <Pill key={tag} variant="info">
                          {tag}
                        </Pill>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedTargetId && sources.length === 0 && (
        <Card>
          <div className="flex items-center gap-3">
            <Recycle className="w-5 h-5 text-slate-400" />
            <p className="text-slate-400">
              No recyclable items found that yield{" "}
              <span className="text-cyan-300 font-semibold">
                {selectedTarget?.name}
              </span>
              . Try selecting a different material.
            </p>
          </div>
        </Card>
      )}

      {!selectedTargetId && (
        <Card>
          <div className="flex items-center gap-3">
            <Recycle className="w-5 h-5 text-slate-400" />
            <p className="text-slate-400">
              Select a target material from the dropdown above to see which
              items can be recycled to obtain it.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default RecyclingPlannerSection;

