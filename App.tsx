import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import AddRoutineScreen from './src/screens/AddRoutineScreen';
import { RoutineProvider } from './src/context/RoutineContext';

export type RootStackParamList = {
  Drawer: undefined;
  RoutineDetailScreen: { id: string };
  AddRoutineScreen: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <RoutineProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />

          <Stack.Screen
            name="RoutineDetailScreen"
            component={RoutineDetailScreen}
            options={{
              headerShown: true,
              title: 'GymPro - Tu Nombre Apellido',
              headerStyle: { backgroundColor: '#000' },
              headerTintColor: '#00FF41',
            }}
          />

          <Stack.Screen
            name="AddRoutineScreen"
            component={AddRoutineScreen}
            options={{
              headerShown: true,
              title: 'Formulario de Rutina',
              headerStyle: { backgroundColor: '#000' },
              headerTintColor: '#00FF41',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RoutineProvider>
  );
}