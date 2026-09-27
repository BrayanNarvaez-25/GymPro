import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';
import { colores, tipografia, radios, espaciado } from '../theme/tema';

export default function RoutineDetailScreen() {
  const route = useRoute<any>();
  const { id } = route.params;
  const { getRoutineById } = useRoutines();

  const routine = getRoutineById(id);

  if (!routine) {
    return (
      <SafeAreaView style={styles.container}>
        <Ionicons name="alert-circle-outline" size={40} color={colores.peligro} />
        <Text style={styles.noEncontrada}>Rutina no encontrada.</Text>
      </SafeAreaView>
    );
  }

  const fechaFormateada = new Date(routine.createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.encabezado}>
        <View style={styles.iconoContainer}>
          <Ionicons name="barbell-outline" size={40} color={colores.primario} />
        </View>
        {routine.featured && (
          <View style={styles.etiquetaDestacada}>
            <Ionicons name="star" size={12} color={colores.fondo} />
            <Text style={styles.etiquetaDestacadaTexto}>DESTACADA</Text>
          </View>
        )}
        <Text style={styles.nombre}>{routine.name}</Text>
      </View>

      <View style={styles.tarjetaInfo}>
        <View style={styles.filaInfo}>
          <Ionicons name="body-outline" size={20} color={colores.textoSecundario} />
          <View>
            <Text style={styles.etiquetaInfo}>Grupo muscular</Text>
            <Text style={styles.valorInfo}>{routine.muscleGroup}</Text>
          </View>
        </View>

        <View style={styles.divisor} />

        <View style={styles.filaInfo}>
          <Ionicons name="time-outline" size={20} color={colores.textoSecundario} />
          <View>
            <Text style={styles.etiquetaInfo}>Duración</Text>
            <Text style={styles.valorInfo}>{routine.duration} min</Text>
          </View>
        </View>

        <View style={styles.divisor} />

        <View style={styles.filaInfo}>
          <Ionicons name="calendar-outline" size={20} color={colores.textoSecundario} />
          <View>
            <Text style={styles.etiquetaInfo}>Creada el</Text>
            <Text style={styles.valorInfo}>{fechaFormateada}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
    padding: espaciado.md,
  },
  encabezado: {
    alignItems: 'center',
    marginTop: espaciado.lg,
    marginBottom: espaciado.lg,
  },
  iconoContainer: {
    width: 76,
    height: 76,
    borderRadius: radios.mediano,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: espaciado.sm,
  },
  nombre: {
    color: colores.texto,
    fontFamily: tipografia.display,
    fontSize: 28,
    marginTop: espaciado.xs,
    textAlign: 'center',
  },
  etiquetaDestacada: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colores.destacado,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  etiquetaDestacadaTexto: {
    color: colores.fondo,
    fontFamily: tipografia.cuerpoSemiNegrita,
    fontSize: 10,
  },
  tarjetaInfo: {
    backgroundColor: colores.superficie,
    borderRadius: radios.mediano,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: espaciado.md,
  },
  filaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciado.sm,
    paddingVertical: espaciado.sm,
  },
  divisor: {
    height: 1,
    backgroundColor: colores.borde,
  },
  etiquetaInfo: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpoMedio,
    fontSize: 12,
  },
  valorInfo: {
    color: colores.texto,
    fontFamily: tipografia.cuerpoSemiNegrita,
    fontSize: 15,
    marginTop: 2,
  },
  noEncontrada: {
    color: colores.peligro,
    fontFamily: tipografia.cuerpo,
    fontSize: 15,
    marginTop: espaciado.sm,
  },
});