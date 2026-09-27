import * as SQLite from 'expo-sqlite';
import { Routine } from '../types/routine';

let baseDatos: SQLite.SQLiteDatabase | null = null;

export async function abrirBaseDeDatos() {
  if (baseDatos) return baseDatos;

  baseDatos = await SQLite.openDatabaseAsync('gympro.db');

  await baseDatos.execAsync(`
    CREATE TABLE IF NOT EXISTS rutinas (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      muscleGroup TEXT NOT NULL,
      duration REAL NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  return baseDatos;
}

export async function obtenerRutinasDesdeBD(): Promise<Routine[]> {
  const bd = await abrirBaseDeDatos();
  const filas = await bd.getAllAsync<Routine>('SELECT * FROM rutinas ORDER BY createdAt DESC;');
  return filas;
}

export async function insertarRutinaEnBD(rutina: Routine) {
  const bd = await abrirBaseDeDatos();
  await bd.runAsync(
    'INSERT INTO rutinas (id, name, muscleGroup, duration, createdAt) VALUES (?, ?, ?, ?, ?);',
    [rutina.id, rutina.name, rutina.muscleGroup, rutina.duration, rutina.createdAt]
  );
}

export async function actualizarRutinaEnBD(rutina: Routine) {
  const bd = await abrirBaseDeDatos();
  await bd.runAsync(
    'UPDATE rutinas SET name = ?, muscleGroup = ?, duration = ? WHERE id = ?;',
    [rutina.name, rutina.muscleGroup, rutina.duration, rutina.id]
  );
}

export async function eliminarRutinaDeBD(id: string) {
  const bd = await abrirBaseDeDatos();
  await bd.runAsync('DELETE FROM rutinas WHERE id = ?;', [id]);
}