import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0D0D0D' },
        headerTintColor: '#00FF41',
        drawerStyle: { backgroundColor: '#000' },
        drawerActiveTintColor: '#00FF41',
        drawerInactiveTintColor: '#888',
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