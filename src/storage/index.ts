import { IndexedDbRunLogRepository } from "./indexedDbRunLogRepository";
import type { RunLogRepository } from "./runLogRepository";

export const runLogRepository: RunLogRepository = new IndexedDbRunLogRepository();

export type { RunLogEntry } from "./runLogRepository";

