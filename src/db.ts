import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Fragment } from "@/types/fragment";


interface FragmentDB extends DBSchema {
    fragments: {
        key: string;
        value: Fragment;
    };
}

const DB_NAME = "fragment-db";
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<FragmentDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<FragmentDB>> {
    if (dbInstance) return dbInstance;

    dbInstance = await openDB<FragmentDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            db.createObjectStore("fragments", { keyPath: "id" });
        },
    });

    return dbInstance;
}