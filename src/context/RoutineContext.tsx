import React, { createContext, useContext, useState, ReactNode } from 'react';

// ---- Tipos ----
export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  createdAt: string;
};

type RoutineContextType = {
  routines: Routine[];
  addRoutine: (data: Omit<Routine, 'id' | 'createdAt'>) => void;
  updateRoutine: (id: string, data: Omit<Routine, 'id' | 'createdAt'>) => void;
  deleteRoutine: (id: string) => void;
  getRoutineById: (id: string) => Routine | undefined;
};

// ---- Contexto ----
const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

// ---- Datos iniciales ----
const initialRoutines: Routine[] = [
  {
    id: '1',
    name: 'Pecho y Tríceps',
    muscleGroup: 'Pecho',
    duration: 45,
    createdAt: new Date().toISOString(),
  },
];

// ---- Provider ----
export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);

  const addRoutine = (data: Omit<Routine, 'id' | 'createdAt'>) => {
    const newRoutine: Routine = {
      ...data,
      id: Date.now().toString(), // autogenerado
      createdAt: new Date().toISOString(), // autogenerado
    };
    setRoutines((prev) => [...prev, newRoutine]);
  };

  const updateRoutine = (id: string, data: Omit<Routine, 'id' | 'createdAt'>) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === id ? { ...routine, ...data } : routine
      )
    );
  };

  const deleteRoutine = (id: string) => {
    setRoutines((prev) => prev.filter((routine) => routine.id !== id));
  };

  const getRoutineById = (id: string) => {
    return routines.find((routine) => routine.id === id);
  };

  return (
    <RoutineContext.Provider
      value={{ routines, addRoutine, updateRoutine, deleteRoutine, getRoutineById }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

// ---- Hook personalizado ----
export function useRoutines() {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutines debe usarse dentro de un RoutineProvider');
  }
  return context;
}