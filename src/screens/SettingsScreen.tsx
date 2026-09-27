import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colores, tipografia, espaciado } from '../theme/tema';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="settings-outline" size={40} color={colores.borde} />
      <Text style={styles.texto}>Configuración</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
    justifyContent: 'center',
    alignItems: 'center',
    gap: espaciado.sm,
  },
  texto: {
    color: colores.texto,
    fontFamily: tipografia.display,
    fontSize: 24,
  },
});