import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';

export default function ProgressScreen() {
  const { routines, rutinaDestacada } = useRoutines();

  const estadisticas = useMemo(() => {
    const totalRutinas = routines.length;
    const duracionTotal = routines.reduce((suma, rutina) => suma + rutina.duration, 0);
    const duracionPromedio = totalRutinas > 0 ? duracionTotal / totalRutinas : 0;

    const conteoPorGrupo: Record<string, number> = {};
    routines.forEach((rutina) => {
      conteoPorGrupo[rutina.muscleGroup] = (conteoPorGrupo[rutina.muscleGroup] || 0) + 1;
    });

    let grupoTop = '—';
    let mayorCantidad = 0;
    Object.entries(conteoPorGrupo).forEach(([grupo, cantidad]) => {
      if (cantidad > mayorCantidad) {
        mayorCantidad = cantidad;
        grupoTop = grupo;
      }
    });

    return { totalRutinas, duracionTotal, duracionPromedio, grupoTop };
  }, [routines]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.titulo}>Progreso</Text>

        {routines.length === 0 ? (
          <Text style={styles.vacioTexto}>
            Aún no hay rutinas registradas. Crea una para ver tu progreso.
          </Text>
        ) : (
          <>
            <View style={styles.tarjetasContainer}>
              <View style={styles.tarjeta}>
                <Ionicons name="list-outline" size={28} color="#00FF41" />
                <Text style={styles.valorTarjeta}>{estadisticas.totalRutinas}</Text>
                <Text style={styles.etiquetaTarjeta}>Total de rutinas</Text>
              </View>

              <View style={styles.tarjeta}>
                <Ionicons name="time-outline" size={28} color="#00FF41" />
                <Text style={styles.valorTarjeta}>{estadisticas.duracionTotal} min</Text>
                <Text style={styles.etiquetaTarjeta}>Duración total</Text>
              </View>

              <View style={styles.tarjeta}>
                <Ionicons name="speedometer-outline" size={28} color="#00FF41" />
                <Text style={styles.valorTarjeta}>
                  {estadisticas.duracionPromedio.toFixed(1)} min
                </Text>
                <Text style={styles.etiquetaTarjeta}>Duración promedio</Text>
              </View>

              <View style={styles.tarjeta}>
                <Ionicons name="trophy-outline" size={28} color="#00FF41" />
                <Text style={styles.valorTarjeta}>{estadisticas.grupoTop}</Text>
                <Text style={styles.etiquetaTarjeta}>Grupo más entrenado</Text>
              </View>
            </View>

            {rutinaDestacada && (
              <View style={styles.destacadaContainer}>
                <Ionicons name="star" size={24} color="#FFD400" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.destacadaTitulo}>Rutina destacada</Text>
                  <Text style={styles.destacadaNombre}>{rutinaDestacada.name}</Text>
                  <Text style={styles.destacadaSubtitulo}>
                    {rutinaDestacada.muscleGroup} • {rutinaDestacada.duration} min
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  contenido: { padding: 20 },
  titulo: {
    color: '#00FF41',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  vacioTexto: {
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
  },
  tarjetasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  tarjeta: {
    width: '47%',
    backgroundColor: '#0D0D0D',
    borderWidth: 1,
    borderColor: '#00FF41',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  valorTarjeta: {
    color: '#00FF41',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  etiquetaTarjeta: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  destacadaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    borderWidth: 1,
    borderColor: '#FFD400',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  destacadaTitulo: {
    color: '#FFD400',
    fontSize: 12,
    fontWeight: '600',
  },
  destacadaNombre: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  destacadaSubtitulo: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
});