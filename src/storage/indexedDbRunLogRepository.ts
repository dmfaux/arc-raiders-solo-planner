import type { MapId } from "../types";
import type { RunLogEntry, RunLogRepository } from "./runLogRepository";

const DB_NAME = "arc_solo_planner";
const DB_VERSION = 1;
const STORE_NAME = "run_logs";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("by_map", "map", { unique: false });
        store.createIndex("by_timestamp", "timestamp", { unique: false });
      }
    };
  });
}

function getObjectStore(
  db: IDBDatabase,
  mode: IDBTransactionMode = "readonly"
): IDBObjectStore {
  const transaction = db.transaction([STORE_NAME], mode);
  return transaction.objectStore(STORE_NAME);
}

export class IndexedDbRunLogRepository implements RunLogRepository {
  async add(entry: RunLogEntry): Promise<void> {
    const db = await openDatabase();
    const store = getObjectStore(db, "readwrite");

    return new Promise((resolve, reject) => {
      const request = store.put(entry);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  async getAll(): Promise<RunLogEntry[]> {
    const db = await openDatabase();
    const store = getObjectStore(db);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  async getByMap(map: MapId): Promise<RunLogEntry[]> {
    const db = await openDatabase();
    const store = getObjectStore(db);
    const index = store.index("by_map");

    return new Promise((resolve, reject) => {
      const request = index.getAll(map);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  async update(entry: RunLogEntry): Promise<void> {
    const db = await openDatabase();
    const store = getObjectStore(db, "readwrite");

    return new Promise((resolve, reject) => {
      const request = store.put(entry);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  async delete(id: string): Promise<void> {
    const db = await openDatabase();
    const store = getObjectStore(db, "readwrite");

    return new Promise((resolve, reject) => {
      const request = store.delete(id);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  async clear(): Promise<void> {
    const db = await openDatabase();
    const store = getObjectStore(db, "readwrite");

    return new Promise((resolve, reject) => {
      const request = store.clear();

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
}

