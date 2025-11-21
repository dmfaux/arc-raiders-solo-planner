import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { runLogRepository } from "../storage";
import type { RunLogEntry } from "../storage/runLogRepository";
import type { MapId, RunType, SpawnRegionId } from "../types";
import { spawnRegionsByMap } from "../data/spawn";
import { Pencil } from "lucide-react";

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

interface RunLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry?: RunLogEntry | null;
  onSuccess?: () => void;
  defaultMap?: MapId;
  defaultRunType?: RunType;
  defaultSpawnRegionId?: SpawnRegionId;
}

export function RunLogDialog({
  open,
  onOpenChange,
  entry,
  onSuccess,
  defaultMap,
  defaultRunType,
  defaultSpawnRegionId,
}: RunLogDialogProps) {
  const [map, setMap] = useState<MapId | "">("");
  const [runType, setRunType] = useState<RunType | "">("");
  const [spawnRegionId, setSpawnRegionId] = useState<SpawnRegionId | "">("");
  const [xpGained, setXpGained] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [survived, setSurvived] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form from entry or defaults
  useEffect(() => {
    if (entry) {
      setMap(entry.map);
      setRunType(entry.runType);
      setSpawnRegionId(entry.spawnRegionId || "");
      setXpGained(entry.xpGained?.toString() || "");
      setDurationMinutes(
        entry.durationSeconds ? Math.round(entry.durationSeconds / 60).toString() : ""
      );
      setSurvived(entry.survived !== false);
      setNotes(entry.notes || "");
    } else {
      // Reset to defaults or empty
      setMap(defaultMap || "");
      setRunType(defaultRunType || "");
      setSpawnRegionId(defaultSpawnRegionId || "");
      setXpGained("");
      setDurationMinutes("");
      setSurvived(true);
      setNotes("");
    }
    setError(null);
  }, [entry, defaultMap, defaultRunType, defaultSpawnRegionId, open]);

  const spawnRegions = map ? spawnRegionsByMap[map] ?? [] : [];
  const isEditMode = !!entry;

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
      const logEntry: RunLogEntry = {
        id: entry?.id || `${now}-${Math.random().toString(16).slice(2)}`,
        timestamp: entry?.timestamp || now,
        map,
        runType,
        spawnRegionId: spawnRegionId || undefined,
        xpGained: xpGained ? Number(xpGained) || undefined : undefined,
        durationSeconds: durationMinutes ? (Number(durationMinutes) || 0) * 60 : undefined,
        survived,
        notes: notes.trim() || undefined,
      };

      if (isEditMode) {
        await runLogRepository.update(logEntry);
      } else {
        await runLogRepository.add(logEntry);
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (e) {
      console.error("Failed to save run log", e);
      setError("Could not save this run. Try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="">
      <DialogContent className="bg-slate-950/95 border-cyan-800/50 backdrop-blur-sm max-w-2xl shadow-xl shadow-cyan-800/50">
        <DialogHeader>
          <DialogTitle className="text-cyan-300 text-xl font-semibold uppercase tracking-wide flex items-center gap-2">
            {isEditMode && <Pencil className="w-4 h-4" />}
            {isEditMode ? "Edit Run Log" : "Add New Run Log"}
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm">
            {isEditMode
              ? "Update the details of this raid entry."
              : "Log a new raid to track your progress."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
                Map <span className="text-red-400">*</span>
              </label>
              <select
                value={map}
                onChange={(e) => {
                  setMap(e.target.value as MapId);
                  setSpawnRegionId("");
                }}
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-600/50 transition-all"
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
                Run Type <span className="text-red-400">*</span>
              </label>
              <select
                value={runType}
                onChange={(e) => setRunType(e.target.value as RunType)}
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-600/50 transition-all"
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
                  className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-600/50 transition-all"
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
                XP Gained
              </label>
              <input
                type="number"
                value={xpGained}
                onChange={(e) => setXpGained(e.target.value)}
                placeholder="e.g. 30000"
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-600/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder="e.g. 15"
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-600/50 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={survived}
                  onChange={(e) => setSurvived(e.target.checked)}
                  className="w-4 h-4 rounded border-cyan-800/50 bg-slate-900/80 text-cyan-400 focus:ring-cyan-400 focus:ring-2"
                />
                <span className="text-sm font-medium uppercase tracking-wider text-slate-400">
                  Survived extraction
                </span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-slate-400">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any additional notes about this run..."
                className="w-full bg-slate-900/80 border border-cyan-800/50 rounded px-4 py-2 text-slate-200 backdrop-blur-sm text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-600/50 transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}

          <DialogFooter className="gap-2 sm:flex-row sm:justify-end sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-600/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-cyan-950/50 border border-cyan-700/50 text-cyan-300 hover:bg-cyan-950/70 hover:border-cyan-600/50 hover:shadow-[0_0_8px_rgba(37,240,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-wider text-sm font-medium"
            >
              {isSaving ? "Saving..." : isEditMode ? "Update Run" : "Log Run"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

