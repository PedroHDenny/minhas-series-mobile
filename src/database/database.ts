import * as SQLite from "expo-sqlite";

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync("minhas-series.db").then(async (db) => {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS series (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT NOT NULL,
          plataforma TEXT NOT NULL,
          temporadas INTEGER NOT NULL,
          nota INTEGER,
          concluida INTEGER NOT NULL DEFAULT 0,
          createdAt TEXT NOT NULL
        );
      `);
      return db;
    });
  }
  return databasePromise;
}

export async function runMigrations(): Promise<void> {
  await getDatabase();
}
