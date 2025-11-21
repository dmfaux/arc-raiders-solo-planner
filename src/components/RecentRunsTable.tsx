import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Pill } from "./Pill";
import { runLogRepository } from "../storage";
import type { RunLogEntry } from "../storage/runLogRepository";
import { spawnRegionsByMap } from "../data/spawn";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface RecentRunsTableProps {
  onEdit?: (entry: RunLogEntry) => void;
  limit?: number;
}

export function RecentRunsTable({ onEdit, limit = 10 }: RecentRunsTableProps) {
  const [recentRuns, setRecentRuns] = useState<RunLogEntry[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadRecentRuns() {
    try {
      const all = await runLogRepository.getAll();
      const sorted = [...all].sort((a, b) => b.timestamp - a.timestamp);
      setRecentRuns(sorted.slice(0, limit));
    } catch (e) {
      console.error("Failed to load run logs", e);
    }
  }

  useEffect(() => {
    loadRecentRuns();
  }, [limit]);

  async function handleDelete() {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await runLogRepository.delete(deleteId);
      await loadRecentRuns();
      setDeleteId(null);
    } catch (e) {
      console.error("Failed to delete run log", e);
    } finally {
      setIsDeleting(false);
    }
  }

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  if (recentRuns.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No runs logged yet.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded border border-slate-700/30 bg-slate-900/20">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-slate-900/30">
              <TableHead className="text-slate-400 uppercase tracking-wider text-xs font-semibold px-4 py-3">
                Map
              </TableHead>
              <TableHead className="text-slate-400 uppercase tracking-wider text-xs font-semibold px-4 py-3">
                Run Type
              </TableHead>
              <TableHead className="text-slate-400 uppercase tracking-wider text-xs font-semibold px-4 py-3">
                Spawn Area
              </TableHead>
              <TableHead className="text-slate-400 uppercase tracking-wider text-xs font-semibold px-4 py-3">
                XP
              </TableHead>
              <TableHead className="text-slate-400 uppercase tracking-wider text-xs font-semibold px-4 py-3">
                Duration
              </TableHead>
              <TableHead className="text-slate-400 uppercase tracking-wider text-xs font-semibold px-4 py-3">
                Status
              </TableHead>
              <TableHead className="text-slate-400 uppercase tracking-wider text-xs font-semibold px-4 py-3">
                Date
              </TableHead>
              <TableHead className="text-slate-400 uppercase tracking-wider text-xs font-semibold text-right px-4 py-3">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRuns.map((entry) => {
              const spawnRegion = entry.spawnRegionId
                ? spawnRegionsByMap[entry.map]?.find((sr) => sr.id === entry.spawnRegionId)
                : null;
              const durationMinutes = entry.durationSeconds
                ? Math.round(entry.durationSeconds / 60)
                : null;

              return (
                <TableRow
                  key={entry.id}
                  className="border-slate-700/30 hover:bg-slate-900/40 transition-colors"
                >
                  <TableCell className="text-slate-200 font-medium px-4 py-3">
                    {entry.map}
                  </TableCell>
                  <TableCell className="text-slate-300 px-4 py-3">
                    {entry.runType}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {spawnRegion ? (
                      <Pill variant="info" className="text-xs">
                        {spawnRegion.label}
                      </Pill>
                    ) : (
                      <span className="text-slate-500 text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-300 px-4 py-3">
                    {entry.xpGained ? (
                      <span className="font-medium">
                        {entry.xpGained.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-300 px-4 py-3">
                    {durationMinutes ? (
                      <span>{durationMinutes} min</span>
                    ) : (
                      <span className="text-slate-500 text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {entry.survived !== false ? (
                      <span className="text-emerald-400 text-xs font-medium uppercase tracking-wide">
                        Survived
                      </span>
                    ) : (
                      <span className="text-red-400 text-xs font-medium uppercase tracking-wide">
                        Died
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-400 text-xs px-4 py-3">
                    {formatDate(entry.timestamp)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(entry)}
                        className="h-8 w-8 p-0 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 hover:shadow-[0_0_4px_rgba(37,240,255,0.2)] transition-all"
                        title="Edit run"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(entry.id)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all"
                        title="Delete run"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-slate-950/95 border-cyan-800/50 backdrop-blur-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-cyan-300">
              Delete Run Log
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete this run log? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-950/50 border border-red-700/50 text-red-300 hover:bg-red-950/70 hover:border-red-600/50 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

