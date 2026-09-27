import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';
import { colores, tipografia, radios, espaciado } from '../theme/tema';

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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.titulo}>Progreso</Text>

        {routines.length === 0 ? (
          <View style={styles.vacioContainer}>
            <Ionicons name="stats-chart-outline" size={40} color={colores.borde} />
            <Text style={styles.vacioTexto}>
              Aún no hay rutinas registradas. Crea una para ver tu progreso.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.marcador}>
              <View style={styles.marcadorFila}>
                <View style={styles.marcadorCelda}>
                  <Text style={styles.marcadorValor}>{estadisticas.totalRutinas}</Text>
                  <Text style={styles.marcadorEtiqueta}>Rutinas</Text>
                </View>
                <View style={styles.divisorVertical} />
                <View style={styles.marcadorCelda}>
                  <Text style={styles.marcadorValor}>{estadisticas.duracionTotal}</Text>
                  <Text style={styles.marcadorEtiqueta}>Min. totales</Text>
                </View>
              </View>

              <View style={styles.divisorHorizontal} />

              <View style={styles.marcadorFila}>
                <View style={styles.marcadorCelda}>
                  <Text style={styles.marcadorValor}>{estadisticas.duracionPromedio.toFixed(1)}</Text>
                  <Text style={styles.marcadorEtiqueta}>Promedio</Text>
                </View>
                <View style={styles.divisorVertical} />
                <View style={styles.marcadorCelda}>
                  <Text style={styles.marcadorValorChico}>{estadisticas.grupoTop}</Text>
                  <Text style={styles.marcadorEtiqueta}>Más entrenado</Text>
                </View>
              </View>
            </View>

            {rutinaDestacada && (
              <View style={styles.destacadaContainer}>
                <View style={styles.destacadaFranja} />
                <View style={styles.destacadaContenido}>
                  <View style={styles.destacadaEncabezado}>
                    <Ionicons name="star" size={16} color={colores.destacado} />
                    <Text style={styles.destacadaTitulo}>Rutina destacada</Text>
                  </View>
                  <Text style={styles.destacadaNombre}>{rutinaDestacada.name}</Text>
                  <Text style={styles.destacadaSubtitulo}>
                    {rutinaDestacada.muscleGroup} · {rutinaDestacada.duration} min
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
  container: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: espaciado.md, paddingBottom: espaciado.xl },
  titulo: {
    color: colores.texto,
    fontFamily: tipografia.display,
    fontSize: 34,
    marginBottom: espaciado.md,
  },
  vacioContainer: { alignItems: 'center', marginTop: 60, gap: espaciado.sm },
  vacioTexto: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpo,
    fontSize: 14,
    textAlign: 'center',
  },
  marcador: {
    backgroundColor: colores.superficie,
    borderRadius: radios.mediano,
    borderWidth: 1,
    borderColor: colores.borde,
    overflow: 'hidden',
  },
  marcadorFila: {
    flexDirection: 'row',
  },
  marcadorCelda: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: espaciado.lg,
  },
  marcadorValor: {
    color: colores.primario,
    fontFamily: tipografia.display,
    fontSize: 40,
  },
  marcadorValorChico: {
    color: colores.primario,
    fontFamily: tipografia.display,
    fontSize: 24,
    marginTop: 4,
  },
  marcadorEtiqueta: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpoMedio,
    fontSize: 12,
    marginTop: 4,
  },
  divisorVertical: {
    width: 1,
    backgroundColor: colores.borde,
  },
  divisorHorizontal: {
    height: 1,
    backgroundColor: colores.borde,
  },
  destacadaContainer: {
    flexDirection: 'row',
    backgroundColor: colores.superficie,
    borderRadius: radios.chico,
    marginTop: espaciado.md,
    overflow: 'hidden',
  },
  destacadaFranja: {
    width: 4,
    backgroundColor: colores.destacado,
  },
  destacadaContenido: {
    flex: 1,
    padding: espaciado.md,
  },
  destacadaEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  destacadaTitulo: {
    color: colores.destacado,
    fontFamily: tipografia.cuerpoMedio,
    fontSize: 12,
  },
  destacadaNombre: {
    color: colores.texto,
    fontFamily: tipografia.cuerpoSemiNegrita,
    fontSize: 16,
    marginTop: 4,
  },
  destacadaSubtitulo: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpo,
    fontSize: 12,
    marginTop: 2,
  },
});