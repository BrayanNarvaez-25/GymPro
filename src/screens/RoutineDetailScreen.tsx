import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';

export default function RoutineDetailScreen() {
  const route = useRoute<any>();
  const { id } = route.params;
  const { getRoutineById } = useRoutines();

  const routine = getRoutineById(id);

  if (!routine) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Rutina no encontrada.</Text>
      </SafeAreaView>
    );
  }

  const formattedDate = new Date(routine.createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="barbell-outline" size={60} color="#00FF41" />

      <Text style={styles.name}>{routine.name}</Text>

      <View style={styles.infoRow}>
        <Ionicons name="body-outline" size={20} color="#00FF41" />
        <Text style={styles.infoText}>Grupo muscular: {routine.muscleGroup}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={20} color="#00FF41" />
        <Text style={styles.infoText}>Duración: {routine.duration} mins</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={20} color="#00FF41" />
        <Text style={styles.infoText}>Creada el: {formattedDate}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  name: {
    color: '#00FF41',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  infoText: {
    color: '#ccc',
    fontSize: 15,
  },
  notFound: {
    color: '#FF3B3B',
    fontSize: 16,
  },
});