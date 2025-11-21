import { useState } from "react";
import { RouteStyle } from "../types";
import { routes } from "../data/routes";
import { Card } from "./Card";
import { Pill } from "./Pill";
import { useFavourites } from "../hooks/useFavourites";
import { FAV_ROUTES_KEY } from "../utils/localFavourites";
import { Star } from "lucide-react";

export default function FarmingRoutesSection() {
  const [filterStyle, setFilterStyle] = useState<
    RouteStyle | "All"
  >("All");
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  const { favouriteIds, isFavourite, toggleFavourite } = useFavourites(FAV_ROUTES_KEY);

  let filteredRoutes =
    filterStyle === "All"
      ? routes
      : routes.filter((route) => route.style === filterStyle);

  if (showFavouritesOnly) {
    filteredRoutes = filteredRoutes.filter((route) =>
      isFavourite(route.id)
    );
  }

  if (showFavouritesOnly && filteredRoutes.length === 0) {
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
            <button
              onClick={() => setShowFavouritesOnly((prev) => !prev)}
              className={`px-4 py-2 rounded transition-all uppercase tracking-wide text-sm flex items-center gap-2 ${
                showFavouritesOnly
                  ? "bg-amber-500 text-black shadow-lg"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30"
              }`}
            >
              <Star className={`w-4 h-4 ${showFavouritesOnly ? "fill-current" : ""}`} />
              Favourites
            </button>
          </div>

          <p className="text-sm text-slate-400">
            You have no favourite routes yet. Use the star icon on any route to mark it as a favourite, then toggle the favourites filter to focus on them.
          </p>
        </Card>
      </div>
    );
  }

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
          <button
            onClick={() => setShowFavouritesOnly((prev) => !prev)}
            className={`px-4 py-2 rounded transition-all uppercase tracking-wide text-sm flex items-center gap-2 ${
              showFavouritesOnly
                ? "bg-amber-500 text-black shadow-lg"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30"
            }`}
          >
            <Star className={`w-4 h-4 ${showFavouritesOnly ? "fill-current" : ""}`} />
            Favourites
          </button>
        </div>

        <div className="space-y-4">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="bg-slate-900/50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-wrap gap-2">
                  <Pill>{route.map}</Pill>
                  <Pill variant={getRiskVariant(route.risk)}>
                    {route.risk} Risk
                  </Pill>
                  <Pill variant="info">{route.style}</Pill>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavourite(route.id)}
                  className="ml-2 p-1 rounded-full border border-slate-700/60 bg-slate-900/60 hover:border-amber-400/70 hover:bg-slate-800/80"
                  aria-label={isFavourite(route.id) ? "Remove from favourites" : "Add to favourites"}
                >
                  <Star
                    className={`w-4 h-4 ${
                      isFavourite(route.id)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-500"
                    }`}
                  />
                </button>
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

