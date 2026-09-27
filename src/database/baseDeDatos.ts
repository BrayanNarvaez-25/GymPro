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
      createdAt TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0
    );
  `);

  try {
    await baseDatos.execAsync('ALTER TABLE rutinas ADD COLUMN featured INTEGER NOT NULL DEFAULT 0;');
  } catch (error) {
  }

  return baseDatos;
}

function convertirFilaARutina(fila: any): Routine {
  return {
    id: fila.id,
    name: fila.name,
    muscleGroup: fila.muscleGroup,
    duration: fila.duration,
    createdAt: fila.createdAt,
    featured: fila.featured === 1,
  };
}

export async function obtenerRutinasDesdeBD(): Promise<Routine[]> {
  const bd = await abrirBaseDeDatos();
  const filas = await bd.getAllAsync<any>('SELECT * FROM rutinas ORDER BY createdAt DESC;');
  return filas.map(convertirFilaARutina);
}

export async function insertarRutinaEnBD(rutina: Routine) {
  const bd = await abrirBaseDeDatos();
  await bd.runAsync(
    'INSERT INTO rutinas (id, name, muscleGroup, duration, createdAt, featured) VALUES (?, ?, ?, ?, ?, ?);',
    [rutina.id, rutina.name, rutina.muscleGroup, rutina.duration, rutina.createdAt, rutina.featured ? 1 : 0]
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

export async function quitarDestacadaDeTodasEnBD() {
  const bd = await abrirBaseDeDatos();
  await bd.runAsync('UPDATE rutinas SET featured = 0;');
}

export async function marcarDestacadaEnBD(id: string) {
  const bd = await abrirBaseDeDatos();
  await bd.runAsync('UPDATE rutinas SET featured = 1 WHERE id = ?;', [id]);
}