import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';
import { colores, tipografia, radios, espaciado } from '../theme/tema';

const GRUPOS_MUSCULARES = ['Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Abdomen'];

export default function AddRoutineScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addRoutine, updateRoutine, getRoutineById } = useRoutines();

  const routineId: string | undefined = route.params?.id;
  const isEditMode = !!routineId;

  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [duration, setDuration] = useState('');

  const [errorNombre, setErrorNombre] = useState('');
  const [errorGrupo, setErrorGrupo] = useState('');
  const [errorDuracion, setErrorDuracion] = useState('');

  useEffect(() => {
    if (routineId) {
      const rutinaExistente = getRoutineById(routineId);
      if (rutinaExistente) {
        setName(rutinaExistente.name);
        setMuscleGroup(rutinaExistente.muscleGroup);
        setDuration(rutinaExistente.duration.toString());
      }
    }
  }, [routineId]);

  const validarFormulario = () => {
    let esValido = true;

    if (!name.trim()) {
      setErrorNombre('El nombre es obligatorio.');
      esValido = false;
    } else {
      setErrorNombre('');
    }

    if (!muscleGroup.trim()) {
      setErrorGrupo('Selecciona un grupo muscular.');
      esValido = false;
    } else {
      setErrorGrupo('');
    }

    const duracionNumerica = parseFloat(duration);
    if (!duration.trim() || isNaN(duracionNumerica)) {
      setErrorDuracion('La duración debe ser un número.');
      esValido = false;
    } else if (duracionNumerica < 10 || duracionNumerica > 180) {
      setErrorDuracion('La duración debe estar entre 10 y 180 minutos.');
      esValido = false;
    } else {
      setErrorDuracion('');
    }

    return esValido;
  };

  const handleSave = () => {
    if (!validarFormulario()) {
      return;
    }

    const data = {
      name: name.trim(),
      muscleGroup: muscleGroup.trim(),
      duration: parseFloat(duration),
    };

    if (isEditMode && routineId) {
      updateRoutine(routineId, data);
    } else {
      addRoutine(data);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContenido}>
          <View style={styles.header}>
            <View style={styles.headerIcono}>
              <Ionicons
                name={isEditMode ? 'pencil-outline' : 'add-outline'}
                size={28}
                color={colores.fondo}
              />
            </View>
            <Text style={styles.titulo}>
              {isEditMode ? 'Editar Rutina' : 'Nueva Rutina'}
            </Text>
          </View>

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={[styles.input, errorNombre ? styles.inputError : null]}
            value={name}
            onChangeText={setName}
            placeholder="Ej: Pecho y Tríceps"
            placeholderTextColor={colores.textoSecundario}
          />
          {errorNombre ? <Text style={styles.errorTexto}>{errorNombre}</Text> : null}

          <Text style={styles.label}>Grupo Muscular</Text>
          <View style={styles.chipsContainer}>
            {GRUPOS_MUSCULARES.map((grupo) => (
              <TouchableOpacity
                key={grupo}
                style={[styles.chip, muscleGroup === grupo && styles.chipActivo]}
                onPress={() => setMuscleGroup(grupo)}
              >
                <Text style={[styles.chipTexto, muscleGroup === grupo && styles.chipTextoActivo]}>
                  {grupo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errorGrupo ? <Text style={styles.errorTexto}>{errorGrupo}</Text> : null}

          <Text style={styles.label}>Duración (minutos)</Text>
          <TextInput
            style={[styles.input, errorDuracion ? styles.inputError : null]}
            value={duration}
            onChangeText={setDuration}
            placeholder="Ej: 45"
            placeholderTextColor={colores.textoSecundario}
            keyboardType="numeric"
          />
          {errorDuracion ? <Text style={styles.errorTexto}>{errorDuracion}</Text> : null}

          <TouchableOpacity style={styles.botonGuardar} onPress={handleSave}>
            <Ionicons name="checkmark" size={20} color={colores.fondo} />
            <Text style={styles.botonGuardarTexto}>Guardar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colores.fondo },
  scrollContenido: { padding: espaciado.md, paddingBottom: espaciado.xl },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciado.sm,
    marginBottom: espaciado.lg,
  },
  headerIcono: {
    width: 44,
    height: 44,
    borderRadius: radios.mediano,
    backgroundColor: colores.primario,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    color: colores.texto,
    fontFamily: tipografia.display,
    fontSize: 26,
  },
  label: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpoMedio,
    fontSize: 13,
    marginBottom: espaciado.xs,
    marginTop: espaciado.md,
  },
  input: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radios.chico,
    padding: 12,
    color: colores.texto,
    fontFamily: tipografia.cuerpo,
    fontSize: 15,
  },
  inputError: {
    borderColor: colores.peligro,
  },
  errorTexto: {
    color: colores.peligro,
    fontFamily: tipografia.cuerpo,
    fontSize: 12,
    marginTop: 6,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaciado.xs,
  },
  chip: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radios.chico,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: colores.superficie,
  },
  chipActivo: {
    backgroundColor: colores.primario,
    borderColor: colores.primario,
  },
  chipTexto: {
    color: colores.textoSecundario,
    fontFamily: tipografia.cuerpoMedio,
    fontSize: 13,
  },
  chipTextoActivo: {
    color: colores.fondo,
  },
  botonGuardar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: espaciado.xs,
    backgroundColor: colores.primario,
    padding: 14,
    borderRadius: radios.chico,
    marginTop: espaciado.lg,
  },
  botonGuardarTexto: {
    color: colores.fondo,
    fontFamily: tipografia.cuerpoSemiNegrita,
    fontSize: 15,
  },
});