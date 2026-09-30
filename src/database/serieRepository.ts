import { getDatabase } from "./database";
import type { CreateSerieInput, Serie, SerieFilter, UpdateSerieInput } from "../types/serie";

type SerieRow = Omit<Serie, "nota"> & { nota: number | null };

export async function getSeries(filtro: SerieFilter): Promise<Serie[]> {
  const db = await getDatabase();
  const where = filtro === "assistindo" ? "WHERE concluida = 0" : filtro === "concluidas" ? "WHERE concluida = 1" : "";
  return db.getAllAsync<SerieRow>(`SELECT * FROM series ${where} ORDER BY createdAt DESC`);
}

export async function getSerieById(id: number): Promise<Serie | null> {
  const db = await getDatabase();
  return db.getFirstAsync<SerieRow>("SELECT * FROM series WHERE id = ?", id);
}

export async function createSerie(input: CreateSerieInput): Promise<Serie> {
  const db = await getDatabase();
  const result = await db.runAsync(
    "INSERT INTO series (titulo, plataforma, temporadas, nota, concluida, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    input.titulo, input.plataforma, input.temporadas, input.nota, 0, new Date().toISOString(),
  );
  const serie = await getSerieById(result.lastInsertRowId);
  if (!serie) throw new Error("Não foi possível recuperar a série criada.");
  return serie;
}

export async function updateSerie(id: number, input: UpdateSerieInput): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("UPDATE series SET titulo = ?, plataforma = ?, temporadas = ?, nota = ? WHERE id = ?", input.titulo, input.plataforma, input.temporadas, input.nota, id);
}

export async function toggleSerieConcluida(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("UPDATE series SET concluida = CASE concluida WHEN 0 THEN 1 ELSE 0 END WHERE id = ?", id);
}

export async function deleteSerie(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM series WHERE id = ?", id);
}
