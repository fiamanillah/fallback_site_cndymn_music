import * as sqlite3 from 'sqlite3';
import { promisify } from 'util';

// Strongly type the DB methods we want to use
export interface PromisifiedDB extends sqlite3.Database {
    runAsync: (sql: string, params?: unknown[]) => Promise<sqlite3.RunResult>;
    allAsync: <T = unknown>(sql: string, params?: unknown[]) => Promise<T[]>;
}

let db: PromisifiedDB | null = null;

export async function getDB(): Promise<PromisifiedDB> {
    if (!db) {
        const raw = new sqlite3.Database('./waitlist.db');

        // Promisify and add strong typing
        const runAsync = promisify(raw.run.bind(raw)) as (
            sql: string,
            params?: unknown[]
        ) => Promise<sqlite3.RunResult>;

        const allAsync = promisify(raw.all.bind(raw)) as <T = unknown>(
            sql: string,
            params?: unknown[]
        ) => Promise<T[]>;

        db = Object.assign(raw, { runAsync, allAsync }) as PromisifiedDB;

        // Create table
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS waitlist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                country TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
            )
        `);
    }

    return db;
}
