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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.header}>
            <Ionicons
              name={isEditMode ? 'pencil-outline' : 'add-circle-outline'}
              size={40}
              color="#00FF41"
            />
            <Text style={styles.title}>
              {isEditMode ? 'Editar Rutina' : 'Nueva Rutina'}
            </Text>
          </View>

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={[styles.input, errorNombre ? styles.inputError : null]}
            value={name}
            onChangeText={setName}
            placeholder="Ej: Pecho y Tríceps"
            placeholderTextColor="#555"
          />
          {errorNombre ? <Text style={styles.errorText}>{errorNombre}</Text> : null}

          <Text style={styles.label}>Grupo Muscular</Text>
          <View style={styles.gruposContainer}>
            {GRUPOS_MUSCULARES.map((grupo) => (
              <TouchableOpacity
                key={grupo}
                style={[
                  styles.grupoChip,
                  muscleGroup === grupo && styles.grupoChipActivo,
                ]}
                onPress={() => setMuscleGroup(grupo)}
              >
                <Text
                  style={[
                    styles.grupoTexto,
                    muscleGroup === grupo && styles.grupoTextoActivo,
                  ]}
                >
                  {grupo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errorGrupo ? <Text style={styles.errorText}>{errorGrupo}</Text> : null}

          <Text style={styles.label}>Duración (minutos)</Text>
          <TextInput
            style={[styles.input, errorDuracion ? styles.inputError : null]}
            value={duration}
            onChangeText={setDuration}
            placeholder="Ej: 45"
            placeholderTextColor="#555"
            keyboardType="numeric"
          />
          {errorDuracion ? <Text style={styles.errorText}>{errorDuracion}</Text> : null}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="save-outline" size={20} color="#000" />
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#00FF41',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  label: {
    color: '#00FF41',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#0D0D0D',
    borderWidth: 1,
    borderColor: '#00FF41',
    borderRadius: 6,
    padding: 12,
    color: '#fff',
    fontSize: 15,
  },
  inputError: {
    borderColor: '#FF3B3B',
  },
  errorText: {
    color: '#FF3B3B',
    fontSize: 12,
    marginTop: 6,
  },
  gruposContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  grupoChip: {
    borderWidth: 1,
    borderColor: '#00FF41',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  grupoChipActivo: {
    backgroundColor: '#00FF41',
  },
  grupoTexto: {
    color: '#00FF41',
    fontSize: 13,
    fontWeight: '600',
  },
  grupoTextoActivo: {
    color: '#000',
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00FF41',
    padding: 14,
    borderRadius: 6,
    marginTop: 30,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});