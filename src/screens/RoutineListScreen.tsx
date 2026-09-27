import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines, Routine } from '../context/RoutineContext';
import { colores, tipografia, radios, espaciado } from '../theme/tema';

const GRUPOS_FILTRO = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Abdomen'];

const ICONO_POR_GRUPO: Record<string, keyof typeof Ionicons.glyphMap> = {
  Pecho: 'body-outline',
  Espalda: 'body-outline',
  Piernas: 'walk-outline',
  Brazos: 'barbell-outline',
  Hombros: 'body-outline',
  Abdomen: 'body-outline',
};

export default function RoutineListScreen() {
  const navigation = useNavigation<any>();
  const { routines, deleteRoutine, marcarComoDestacada } = useRoutines();
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  const rutinasFiltradas = useMemo(() => {
    if (filtroActivo === 'Todos') return routines;
    return routines.filter((rutina) => rutina.muscleGroup === filtroActivo);
  }, [routines, filtroActivo]);

  const renderItem = ({ item }: { item: Routine }) => (
    <View style={styles.tarjeta}>
      <View style={[styles.franja, item.featured && styles.franjaDestacada]} />

      <View style={styles.tarjetaContenido}>
        <View style={styles.tarjetaEncabezado}>
          <Ionicons
            name={ICONO_POR_GRUPO[item.muscleGroup] ?? 'barbell-outline'}
            size={18}
            color={colores.textoSecundario}
          />
          <Text style={styles.nombreRutina}>{item.name}</Text>
          {item.featured && (
            <View style={styles.etiquetaDestacada}>
              <Ionicons name="star" size={12} color={colores.fondo} />
              <Text style={styles.etiquetaDestacadaTexto}>DESTACADA</Text>
            </View>
          )}
        </View>
        <Text style={styles.detalleRutina}>
          {item.muscleGroup} · {item.duration} min
        </Text>
      </View>

      <View style={styles.acciones}>
        <TouchableOpacity
          style={styles.botonAccion}
          onPress={() => navigation.navigate('RoutineDetailScreen', { id: item.id })}
        >
          <Ionicons name="eye-outline" size={20} color={colores.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonAccion}
          onPress={() => marcarComoDestacada(item.id)}
        >
          <Ionicons
            name={item.featured ? 'star' : 'star-outline'}
            size={20}
            color={colores.destacado}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonAccion}
          onPress={() => navigation.navigate('AddRoutineScreen', { id: item.id })}
        >
          <Ionicons name="pencil-outline" size={20} color={colores.primario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonAccion}
          onPress={() => deleteRoutine(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={colores.peligro} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.titulo}>Rutinas</Text>

      <FlatList
        horizontal
        data={GRUPOS_FILTRO}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosLista}
        contentContainerStyle={styles.filtrosContenido}
        renderItem={({ item: grupo }) => (
          <TouchableOpacity
            style={[styles.filtroEtiqueta, filtroActivo === grupo && styles.filtroEtiquetaActiva]}
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
        )}
      />

      <FlatList
        data={rutinasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listaContenido}
        ListEmptyComponent={
          <View style={styles.vacioContainer}>
            <Ionicons name="barbell-outline" size={40} color={colores.borde} />
            <Text style={styles.vacioTexto}>No hay rutinas en este filtro.</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddRoutineScreen')}
      >
        <Ionicons name="add" size={26} color={colores.fondo} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colores.fondo, paddingHorizontal: espaciado.md },
  titulo: {
    color: colores.texto,
    fontFamily: tipografia.display,
    fontSize: 34,
    marginTop: espaciado.md,
    marginBottom: espaciado.sm,
  },
  filtrosLista: { flexGrow: 0, marginBottom: espaciado.md },
  filtrosContenido: { gap: espaciado.sm, paddingRight: espaciado.md },
  filtroEtiqueta: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radios.chico,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: colores.superficie,
  },
  filtroEtiquetaActiva: {
    backgroundColor: colores.primario,
    borderColor: colores.primario,
  },
  filtroTexto: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpoMedio,
    fontSize: 13,
  },
  filtroTextoActivo: {
    color: colores.fondo,
  },
  listaContenido: { paddingBottom: 100 },
  vacioContainer: { alignItems: 'center', marginTop: 60, gap: espaciado.sm },
  vacioTexto: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpo,
    fontSize: 14,
  },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: colores.superficie,
    borderRadius: radios.chico,
    marginBottom: espaciado.sm,
    overflow: 'hidden',
  },
  franja: {
    width: 4,
    backgroundColor: colores.primario,
  },
  franjaDestacada: {
    backgroundColor: colores.destacado,
  },
  tarjetaContenido: {
    flex: 1,
    paddingVertical: espaciado.sm,
    paddingHorizontal: espaciado.md,
  },
  tarjetaEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciado.xs,
    flexWrap: 'wrap',
  },
  nombreRutina: {
    color: colores.texto,
    fontFamily: tipografia.cuerpoSemiNegrita,
    fontSize: 15,
  },
  detalleRutina: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpo,
    fontSize: 12,
    marginTop: 2,
  },
  etiquetaDestacada: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colores.destacado,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  etiquetaDestacadaTexto: {
    color: colores.fondo,
    fontFamily: tipografia.cuerpoSemiNegrita,
    fontSize: 9,
  },
  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: espaciado.sm,
    gap: espaciado.xs,
  },
  botonAccion: {
    padding: 4,
  },
  fab: {
    position: 'absolute',
    bottom: espaciado.lg,
    right: espaciado.md,
    width: 52,
    height: 52,
    borderRadius: radios.mediano,
    backgroundColor: colores.primario,
    justifyContent: 'center',
    alignItems: 'center',
  },
});