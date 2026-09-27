import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Routine } from '../types/routine';
import {
  abrirBaseDeDatos,
  obtenerRutinasDesdeBD,
  insertarRutinaEnBD,
  actualizarRutinaEnBD,
  eliminarRutinaDeBD,
} from '../database/baseDeDatos';

export type { Routine };

type RoutineContextType = {
  routines: Routine[];
  cargando: boolean;
  addRoutine: (data: Omit<Routine, 'id' | 'createdAt'>) => void;
  updateRoutine: (id: string, data: Omit<Routine, 'id' | 'createdAt'>) => void;
  deleteRoutine: (id: string) => void;
  getRoutineById: (id: string) => Routine | undefined;
};

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      await abrirBaseDeDatos();
      const rutinasGuardadas = await obtenerRutinasDesdeBD();
      setRoutines(rutinasGuardadas);
      setCargando(false);
    };
    cargarDatos();
  }, []);

  const addRoutine = (data: Omit<Routine, 'id' | 'createdAt'>) => {
    const nuevaRutina: Routine = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setRoutines((prev) => [nuevaRutina, ...prev]);
    insertarRutinaEnBD(nuevaRutina);
  };

  const updateRoutine = (id: string, data: Omit<Routine, 'id' | 'createdAt'>) => {
    setRoutines((prev) =>
      prev.map((rutina) => (rutina.id === id ? { ...rutina, ...data } : rutina))
    );
    const rutinaActual = routines.find((rutina) => rutina.id === id);
    if (rutinaActual) {
      actualizarRutinaEnBD({ ...rutinaActual, ...data });
    }
  };

  const deleteRoutine = (id: string) => {
    setRoutines((prev) => prev.filter((rutina) => rutina.id !== id));
    eliminarRutinaDeBD(id);
  };

  const getRoutineById = (id: string) => {
    return routines.find((rutina) => rutina.id === id);
  };

  return (
    <RoutineContext.Provider
      value={{ routines, cargando, addRoutine, updateRoutine, deleteRoutine, getRoutineById }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutines() {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutines debe usarse dentro de un RoutineProvider');
  }
  return context;
}