import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';

export default function AddRoutineScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addRoutine, updateRoutine, getRoutineById } = useRoutines();

  // Si venimos desde el ícono de "Editar", route.params tendrá un id.
  // Si venimos desde el botón "+", route.params será undefined.
  const routineId: string | undefined = route.params?.id;
  const isEditMode = !!routineId;

  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [duration, setDuration] = useState('');

  // El Gran Reto: detectar el id y pre-llenar los inputs en modo edición
  useEffect(() => {
    if (routineId) {
      const existingRoutine = getRoutineById(routineId);
      if (existingRoutine) {
        setName(existingRoutine.name);
        setMuscleGroup(existingRoutine.muscleGroup);
        setDuration(existingRoutine.duration.toString());
      }
    }
  }, [routineId]);

  const handleSave = () => {
    // Validación de campos vacíos
    if (!name.trim() || !muscleGroup.trim() || !duration.trim()) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos.');
      return;
    }

    const parsedDuration = parseFloat(duration);
    if (isNaN(parsedDuration)) {
      Alert.alert('Duración inválida', 'La duración debe ser un número.');
      return;
    }

    const data = {
      name: name.trim(),
      muscleGroup: muscleGroup.trim(),
      duration: parsedDuration,
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
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ej: Pecho y Tríceps"
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Grupo Muscular</Text>
        <TextInput
          style={styles.input}
          value={muscleGroup}
          onChangeText={setMuscleGroup}
          placeholder="Ej: Pecho"
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Duración (minutos)</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          placeholder="Ej: 45"
          placeholderTextColor="#555"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save-outline" size={20} color="#000" />
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
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