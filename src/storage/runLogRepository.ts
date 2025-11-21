import type { MapId, RunType, SpawnRegionId } from "../types";

export interface RunLogEntry {
  id: string;                 // unique id, e.g. uuid or timestamp based
  timestamp: number;          // ms since epoch
  map: MapId;
  runType: RunType;
  spawnRegionId?: SpawnRegionId;
  routeId?: string;           // id from routes data if applicable
  xpGained?: number;          // optional, can be filled in later
  survived?: boolean;         // optional
  durationSeconds?: number;   // optional
  notes?: string;             // optional
}

export interface RunLogRepository {
  add(entry: RunLogEntry): Promise<void>;
  getAll(): Promise<RunLogEntry[]>;
  getByMap(map: MapId): Promise<RunLogEntry[]>;
  clear(): Promise<void>;
}

