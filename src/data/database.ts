import { type SQLiteDatabase } from 'expo-sqlite';
import { categories, platforms, commands } from './seed-data';

export async function initializeDatabase(db: SQLiteDatabase) {
  const existing = db.getFirstSync<{ count: number }>(
    "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='commands'"
  );

  if (existing?.count) return;

  db.execSync(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      icon TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS platforms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      icon TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS commands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      command TEXT NOT NULL,
      description TEXT NOT NULL,
      category_id INTEGER NOT NULL,
      platform_id INTEGER NOT NULL,
      example TEXT DEFAULT NULL,
      notes TEXT DEFAULT NULL,
      tags TEXT NOT NULL DEFAULT '',
      is_favorite INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (platform_id) REFERENCES platforms(id)
    );

    CREATE INDEX IF NOT EXISTS idx_commands_command ON commands(command);
    CREATE INDEX IF NOT EXISTS idx_commands_category ON commands(category_id);
    CREATE INDEX IF NOT EXISTS idx_commands_platform ON commands(platform_id);
    CREATE INDEX IF NOT EXISTS idx_commands_favorite ON commands(is_favorite);
  `);

  for (const cat of categories) {
    db.runSync(
      'INSERT INTO categories (name, icon, description) VALUES (?, ?, ?)',
      [cat.name, cat.icon, cat.description]
    );
  }

  for (const plat of platforms) {
    db.runSync(
      'INSERT INTO platforms (id, name, icon) VALUES (?, ?, ?)',
      [plat.id, plat.name, plat.icon]
    );
  }

  const insertCmd = db.prepareSync(
    'INSERT INTO commands (command, description, category_id, platform_id, example, notes, tags) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  for (const cmd of commands) {
    insertCmd.executeSync(
      cmd.command,
      cmd.description,
      cmd.categoryId,
      cmd.platformId,
      cmd.example ?? null,
      cmd.notes ?? null,
      cmd.tags
    );
  }

  insertCmd.finalizeSync();
}
