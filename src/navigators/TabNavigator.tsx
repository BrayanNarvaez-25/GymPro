import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProgressScreen from '../screens/ProgressScreen';
import RoutineListScreen from '../screens/RoutineListScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0D0D0D' },
        tabBarActiveTintColor: '#00FF41',
        tabBarInactiveTintColor: '#555',
      }}
    >
      <Tab.Screen
        name="Progreso"
        component={ProgressScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Rutinas"
        component={RoutineListScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="barbell" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}