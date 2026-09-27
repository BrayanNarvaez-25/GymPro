import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines, Routine } from '../context/RoutineContext';

const GRUPOS_FILTRO = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Abdomen'];

export default function RoutineListScreen() {
  const navigation = useNavigation<any>();
  const { routines, deleteRoutine, marcarComoDestacada } = useRoutines();
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  const rutinasFiltradas = useMemo(() => {
    if (filtroActivo === 'Todos') return routines;
    return routines.filter((rutina) => rutina.muscleGroup === filtroActivo);
  }, [routines, filtroActivo]);

  const renderItem = ({ item }: { item: Routine }) => (
    <View style={[styles.card, item.featured && styles.cardDestacada]}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>
          {item.muscleGroup} • {item.duration} mins
        </Text>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('RoutineDetailScreen', { id: item.id })}
        >
          <Ionicons name="eye-outline" size={22} color="#00FF41" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => marcarComoDestacada(item.id)}
        >
          <Ionicons
            name={item.featured ? 'star' : 'star-outline'}
            size={22}
            color="#FFD400"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('AddRoutineScreen', { id: item.id })}
        >
          <Ionicons name="pencil-outline" size={22} color="#FFD400" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => deleteRoutine(item.id)}
        >
          <Ionicons name="trash-outline" size={22} color="#FF3B3B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rutinas</Text>

      <View style={styles.filtrosContainer}>
        {GRUPOS_FILTRO.map((grupo) => (
          <TouchableOpacity
            key={grupo}
            style={[
              styles.filtroChip,
              filtroActivo === grupo && styles.filtroChipActivo,
            ]}
            onPress={() => setFiltroActivo(grupo)}
          >
            <Text
              style={[
                styles.filtroTexto,
                filtroActivo === grupo && styles.filtroTextoActivo,
              ]}
            >
              {grupo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={rutinasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay rutinas en este filtro.</Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddRoutineScreen')}
      >
        <Ionicons name="add" size={30} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: {
    color: '#00FF41',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filtrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filtroChip: {
    borderWidth: 1,
    borderColor: '#00FF41',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  filtroChipActivo: {
    backgroundColor: '#00FF41',
  },
  filtroTexto: {
    color: '#00FF41',
    fontSize: 13,
    fontWeight: '600',
  },
  filtroTextoActivo: {
    color: '#000',
  },
  listContent: { paddingBottom: 100 },
  emptyText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    borderWidth: 1,
    borderColor: '#00FF41',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  cardInfo: { flex: 1 },
  cardName: {
    color: '#00FF41',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00FF41',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#00FF41',
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  cardDestacada: {
    borderColor: '#FFD400',
    borderWidth: 2,
    shadowColor: '#FFD400',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
});