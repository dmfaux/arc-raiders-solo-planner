import { useState, useMemo } from "react";
import { Card } from "./Card";
import { Pill } from "./Pill";
import {
  craftingParts,
  getRecyclableOptionsForPart,
} from "../data/recyclables-breakdown";
import { useFavourites } from "../hooks/useFavourites";
import { FAV_PARTS_KEY } from "../utils/localFavourites";
import { Star } from "lucide-react";

function RecyclablesPlannerSection() {
  const [selectedPartId, setSelectedPartId] = useState<string>("");
  const [neededAmount, setNeededAmount] = useState<string>("");

  const { favouriteIds: favouritePartIds, isFavourite: isPartFavourite, toggleFavourite: togglePartFavourite } =
    useFavourites(FAV_PARTS_KEY);

  const selectedPart = useMemo(
    () => craftingParts.find((p) => p.id === selectedPartId),
    [selectedPartId],
  );

  const recommendations = useMemo(() => {
    if (!selectedPartId) return [];
    return getRecyclableOptionsForPart(selectedPartId);
  }, [selectedPartId]);

  const sortedRecommendations = useMemo(
    () => [...recommendations].sort((a, b) => b.quantity - a.quantity),
    [recommendations],
  );

  const getRarityVariant = (rarity: string) => {
    if (rarity === "Epic") return "danger";
    if (rarity === "Rare") return "warning";
    if (rarity === "Uncommon") return "info";
    return "success";
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
            Crafting Breakdown
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <p className="text-sm text-slate-400 mb-3">
          Pick a crafting component you want, and this tool will suggest which loot items to recycle to break down into that part. Values are approximate and based on your local data, not live game servers.
        </p>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Target Part Selection
        </h3>
        {favouritePartIds.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
              Favourite components
            </div>
            <div className="flex flex-wrap gap-2">
              {favouritePartIds
                .map((id) => craftingParts.find((p) => p.id === id))
                .filter((p): p is typeof craftingParts[number] => Boolean(p))
                .map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedPartId(part.id)}
                    className={`px-3 py-1 rounded-full text-xs border ${
                      selectedPartId === part.id
                        ? "bg-cyan-600 text-white border-cyan-400"
                        : "bg-slate-800/60 text-slate-200 border-slate-700/60 hover:bg-slate-700/60"
                    }`}
                  >
                    {part.name}
                  </button>
                ))}
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Tap a favourite to switch the target component quickly.
            </p>
          </div>
        )}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium uppercase tracking-wider text-slate-400">
              Target Part
            </label>
            {selectedPartId && (
              <button
                type="button"
                onClick={() => togglePartFavourite(selectedPartId)}
                className="ml-2 p-1 rounded-full border border-slate-700/60 bg-slate-900/60 hover:border-amber-400/70 hover:bg-slate-800/80"
                aria-label={
                  isPartFavourite(selectedPartId)
                    ? "Remove component from favourites"
                    : "Add component to favourites"
                }
              >
                <Star
                  className={`w-4 h-4 ${
                    isPartFavourite(selectedPartId)
                      ? "text-amber-400 fill-amber-400"
                      : "text-slate-500"
                  }`}
                />
              </button>
            )}
          </div>
          <select
            value={selectedPartId}
            onChange={(e) => setSelectedPartId(e.target.value)}
            className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
          >
            <option value="">Select a component...</option>
            {craftingParts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name} ({part.rarity})
              </option>
            ))}
          </select>
        </div>

        {!selectedPartId && (
          <p className="mt-2 text-xs text-slate-500">
            Choose a target component to see suggested items to break down.
          </p>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
            Amount Needed (optional)
          </label>
          <input
            type="number"
            min="1"
            value={neededAmount}
            onChange={(e) => setNeededAmount(e.target.value)}
            className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-3 text-slate-200 backdrop-blur-sm"
            placeholder="eg 20"
          />
          <p className="text-xs text-slate-500 mt-1">
            If set, the planner will show how many of each item you would need
            to recycle.
          </p>
        </div>

        {selectedPart && selectedPart.description && (
          <div className="mt-4 p-4 bg-cyan-950/20 rounded border border-cyan-800/30">
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedPart.description}
            </p>
          </div>
        )}
      </Card>

      {selectedPartId && sortedRecommendations.length === 0 && (
        <Card>
          <div className="mt-4 bg-slate-900/50 border border-slate-700/60 rounded p-4 text-sm text-slate-300">
            No known items in your current data break down into <span className="text-cyan-300 font-semibold">{selectedPart?.name}</span>. 
            Try a different component or update your recyclables mapping as the game evolves.
          </div>
        </Card>
      )}

      {selectedPartId && sortedRecommendations.length > 0 && (
        <Card variant="tactical">
          <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
            Recommended Recyclable Items
          </h3>
          <div className="space-y-4">
            {sortedRecommendations.map((rec) => {
              const needed = Number(neededAmount) || 0;
              const unitsPerItem = rec.quantity;
              const itemsNeeded =
                unitsPerItem > 0 ? Math.ceil(needed / unitsPerItem) : 0;

              return (
                <Card key={rec.item.id} className="bg-slate-900/50">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Pill variant={getRarityVariant(selectedPart?.rarity || "")}>
                      {selectedPart?.rarity}
                    </Pill>
                    <Pill variant="default">{rec.item.category}</Pill>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-cyan-300">
                    {rec.item.name}
                  </h4>
                  <div className="mb-3">
                    <p className="text-slate-300">
                      <span className="text-cyan-400 font-semibold">
                        Yields:
                      </span>{" "}
                      <span className="text-slate-100 font-semibold">
                        {rec.quantity}
                      </span>{" "}
                      <span className="text-cyan-300 font-semibold">
                        {selectedPart?.name}
                      </span>{" "}
                      per item
                    </p>
                  </div>
                  {needed > 0 && itemsNeeded > 0 && (
                    <div className="mb-3 p-3 bg-cyan-950/20 rounded border border-cyan-800/30">
                      <p className="text-sm text-slate-300">
                        You would need about{" "}
                        <span className="text-cyan-300 font-semibold">
                          {itemsNeeded}
                        </span>{" "}
                        of this item to hit your goal.
                      </p>
                    </div>
                  )}
                  {rec.item.sourceNote && (
                    <div className="mt-3">
                      <p className="text-xs text-slate-500 italic">
                        {rec.item.sourceNote}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

export default RecyclablesPlannerSection;

