import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Pill } from "./Pill";
import { runLogRepository } from "../storage";
import type { RunLogEntry } from "../storage/runLogRepository";
import type { MapId, RunType, SpawnRegionId } from "../types";
import { spawnRegionsByMap } from "../data/spawn";

const maps: MapId[] = [
  "Buried City",
  "Spaceport",
  "The Dam",
  "Blue Gate",
  "Stella Montis",
];

const runTypes: RunType[] = [
  "Boss hunt",
  "Loot run",
  "Stealth farm",
];

type RecentRun = RunLogEntry;

interface RunLogPanelProps {
  defaultMap?: MapId;
  defaultRunType?: RunType;
  defaultSpawnRegionId?: SpawnRegionId;
}

export function RunLogPanel(props: RunLogPanelProps) {
  const [map, setMap] = useState<MapId | "">("");
  const [runType, setRunType] = useState<RunType | "">("");
  const [spawnRegionId, setSpawnRegionId] = useState<SpawnRegionId | "">("");
  const [xpGained, setXpGained] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [survived, setSurvived] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>("");
  const [recentRuns, setRecentRuns] = useState<RecentRun[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (props.defaultMap) setMap(props.defaultMap);
    if (props.defaultRunType) setRunType(props.defaultRunType);
    if (props.defaultSpawnRegionId) setSpawnRegionId(props.defaultSpawnRegionId);
  }, [props.defaultMap, props.defaultRunType, props.defaultSpawnRegionId]);

  async function loadRecentRuns() {
    try {
      const all = await runLogRepository.getAll();
      const sorted = [...all].sort((a, b) => b.timestamp - a.timestamp);
      setRecentRuns(sorted.slice(0, 5));
    } catch (e) {
      console.error("Failed to load run logs", e);
    }
  }

  useEffect(() => {
    loadRecentRuns();
  }, []);

  const spawnRegions = map ? spawnRegionsByMap[map] ?? [] : [];

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!map || !runType) {
      setError("Select at least a map and run type before logging a run.");
      return;
    }

    setIsSaving(true);
    try {
      const now = Date.now();
      const entry: RunLogEntry = {
        id: `${now}-${Math.random().toString(16).slice(2)}`,
        timestamp: now,
        map,
        runType,
        spawnRegionId: spawnRegionId || undefined,
        xpGained: xpGained ? Number(xpGained) || undefined : undefined,
        durationSeconds: durationMinutes ? (Number(durationMinutes) || 0) * 60 : undefined,
        survived,
        notes: notes.trim() || undefined,
      };

      await runLogRepository.add(entry);
      await loadRecentRuns();

      // Soft reset fields but keep map and run type
      setXpGained("");
      setDurationMinutes("");
      setNotes("");
    } catch (e) {
      console.error("Failed to save run log", e);
      setError("Could not save this run. Try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-cyan-300 uppercase tracking-wide mb-1">
          Run Log
        </h3>
        <p className="text-xs text-slate-400">
          Track your recent raids locally
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Map
            </label>
            <select
              value={map}
              onChange={(e) => {
                setMap(e.target.value as MapId);
                setSpawnRegionId("");
              }}
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm"
            >
              <option value="">Select map...</option>
              {maps.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Run Type
            </label>
            <select
              value={runType}
              onChange={(e) => setRunType(e.target.value as RunType)}
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm"
            >
              <option value="">Select run type...</option>
              {runTypes.map((rt) => (
                <option key={rt} value={rt}>
                  {rt}
                </option>
              ))}
            </select>
          </div>

          {map && spawnRegions.length > 0 && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
                Spawn Area
              </label>
              <select
                value={spawnRegionId}
                onChange={(e) => setSpawnRegionId(e.target.value as SpawnRegionId)}
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm"
              >
                <option value="">Rough spawn area...</option>
                {spawnRegions.map((sr) => (
                  <option key={sr.id} value={sr.id}>
                    {sr.label} ({sr.exampleCallouts.join(", ")})
                  </option>
                ))}
              </select>
              {spawnRegionId && (
                <p className="text-xs text-slate-500 mt-1">
                  {spawnRegions.find((sr) => sr.id === spawnRegionId)?.notes}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              XP Gained <span className="text-slate-500 normal-case">(optional)</span>
            </label>
            <input
              type="number"
              value={xpGained}
              onChange={(e) => setXpGained(e.target.value)}
              placeholder="e.g. 30000"
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Duration (minutes) <span className="text-slate-500 normal-case">(optional)</span>
            </label>
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              placeholder="e.g. 15"
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={survived}
                onChange={(e) => setSurvived(e.target.checked)}
                className="w-4 h-4 rounded border-cyan-800/50 bg-slate-900/80 text-cyan-400 focus:ring-cyan-400"
              />
              <span className="text-sm font-medium uppercase tracking-wider text-slate-400">
                Survived extraction
              </span>
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
              Notes <span className="text-slate-500 normal-case">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any additional notes about this run..."
              className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-cyan-950/50 border border-cyan-700/50 text-cyan-300 px-4 py-2 rounded uppercase tracking-wider text-sm font-medium hover:bg-cyan-950/70 hover:border-cyan-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSaving ? "Logging..." : "Log this run"}
        </button>

        {error && (
          <p className="text-sm text-red-400 mt-2">{error}</p>
        )}
      </form>

      <div className="border-t border-slate-700/50 pt-4">
        <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wide mb-3">
          Recent runs
        </h4>
        {recentRuns.length === 0 ? (
          <p className="text-sm text-slate-500">No runs logged yet.</p>
        ) : (
          <div className="space-y-3">
            {recentRuns.map((entry) => {
              const spawnRegion = entry.spawnRegionId
                ? spawnRegionsByMap[entry.map]?.find((sr) => sr.id === entry.spawnRegionId)
                : null;
              const durationMinutes = entry.durationSeconds
                ? Math.round(entry.durationSeconds / 60)
                : null;

              return (
                <div
                  key={entry.id}
                  className="bg-slate-900/40 p-3 rounded border border-slate-700/30"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-semibold text-cyan-300 text-sm">
                      {entry.map}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-slate-200 text-sm">
                      {entry.runType}
                    </span>
                    {spawnRegion && (
                      <>
                        <span className="text-slate-400">•</span>
                        <Pill variant="info" className="text-xs">
                          {spawnRegion.label}
                        </Pill>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    {entry.xpGained && (
                      <span>
                        <span className="font-semibold text-slate-300">XP:</span>{" "}
                        {entry.xpGained.toLocaleString()}
                      </span>
                    )}
                    {durationMinutes && (
                      <span>
                        <span className="font-semibold text-slate-300">Duration:</span>{" "}
                        {durationMinutes} min
                      </span>
                    )}
                    <span>
                      <span className="font-semibold text-slate-300">Status:</span>{" "}
                      {entry.survived !== false ? (
                        <span className="text-emerald-400">Survived</span>
                      ) : (
                        <span className="text-red-400">Died</span>
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                  {entry.notes && (
                    <p className="text-xs text-slate-400 mt-2 italic">
                      {entry.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}

