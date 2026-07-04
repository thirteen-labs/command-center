import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useMemo } from 'react';

export interface CommandRow {
  id: number;
  command: string;
  description: string;
  category_id: number;
  platform_id: number;
  example: string | null;
  notes: string | null;
  tags: string;
  is_favorite: number;
  category_name?: string;
  platform_name?: string;
  category_icon?: string;
  platform_icon?: string;
}

export interface CategoryRow {
  id: number;
  name: string;
  icon: string;
  description: string;
  command_count: number;
}

interface UseCommandsOptions {
  search: string;
  platformId: number | null;
  categoryId: number | null;
}

export function useCommands({ search, platformId, categoryId }: UseCommandsOptions) {
  const db = useSQLiteContext();

  return useMemo(() => {
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (search.trim()) {
      conditions.push("(c.command LIKE ? OR c.description LIKE ? OR c.tags LIKE ?)");
      const q = `%${search.trim()}%`;
      params.push(q, q, q);
    }

    if (platformId !== null) {
      conditions.push('c.platform_id = ?');
      params.push(platformId);
    }

    if (categoryId !== null) {
      conditions.push('c.category_id = ?');
      params.push(categoryId);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const rows = db.getAllSync<CommandRow>(
      `SELECT c.*, cat.name as category_name, cat.icon as category_icon,
              p.name as platform_name, p.icon as platform_icon
       FROM commands c
       JOIN categories cat ON c.category_id = cat.id
       JOIN platforms p ON c.platform_id = p.id
       ${where}
       ORDER BY c.command ASC
       LIMIT 200`,
      params
    );

    return { results: rows, loading: false };
  }, [db, search, platformId, categoryId]);
}

export function useCategories() {
  const db = useSQLiteContext();

  return useMemo(() => {
    return db.getAllSync<CategoryRow>(
      `SELECT cat.*, COUNT(c.id) as command_count
       FROM categories cat
       LEFT JOIN commands c ON c.category_id = cat.id
       GROUP BY cat.id
       ORDER BY cat.name ASC`
    );
  }, [db]);
}

export function useCommandById(id: number) {
  const db = useSQLiteContext();

  return useMemo(() => {
    return db.getFirstSync<CommandRow>(
      `SELECT c.*, cat.name as category_name, cat.icon as category_icon,
              p.name as platform_name, p.icon as platform_icon
       FROM commands c
       JOIN categories cat ON c.category_id = cat.id
       JOIN platforms p ON c.platform_id = p.id
       WHERE c.id = ?`,
      [id]
    );
  }, [db, id]);
}

export function useFavoriteCommands(search: string) {
  const db = useSQLiteContext();

  return useMemo(() => {
    const params: (string | number)[] = [];
    let searchClause = '';

    if (search.trim()) {
      searchClause = "AND (c.command LIKE ? OR c.description LIKE ? OR c.tags LIKE ?)";
      const q = `%${search.trim()}%`;
      params.push(q, q, q);
    }

    return db.getAllSync<CommandRow>(
      `SELECT c.*, cat.name as category_name, cat.icon as category_icon,
              p.name as platform_name, p.icon as platform_icon
       FROM commands c
       JOIN categories cat ON c.category_id = cat.id
       JOIN platforms p ON c.platform_id = p.id
       WHERE c.is_favorite = 1 ${searchClause}
       ORDER BY c.command ASC`,
      params
    );
  }, [db, search]);
}

export function useToggleFavorite() {
  const db = useSQLiteContext();

  return useCallback(
    (id: number, isFavorite: boolean) => {
      db.runSync('UPDATE commands SET is_favorite = ? WHERE id = ?', [
        isFavorite ? 0 : 1,
        id,
      ]);
      return !isFavorite;
    },
    [db]
  );
}
