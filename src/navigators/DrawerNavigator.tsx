import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { colores } from '../theme/tema';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colores.superficie },
        headerTintColor: colores.primario,
        headerTitleStyle: { fontFamily: 'Inter_600SemiBold' },
        drawerStyle: { backgroundColor: colores.fondo },
        drawerActiveTintColor: colores.primario,
        drawerInactiveTintColor: colores.textoSecundario,
        drawerLabelStyle: { fontFamily: 'Inter_500Medium' },
      }}
    >
      <Drawer.Screen
        name="Mi Entrenamiento"
        component={TabNavigator}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="fitness" size={size} color={color} /> }}
      />
      <Drawer.Screen
        name="Configuración"
        component={SettingsScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}