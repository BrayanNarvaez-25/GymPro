import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts as useFontsBebas,
  BebasNeue_400Regular,
} from '@expo-google-fonts/bebas-neue';
import {
  useFonts as useFontsInter,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import AddRoutineScreen from './src/screens/AddRoutineScreen';
import { RoutineProvider } from './src/context/RoutineContext';
import { colores } from './src/theme/tema';

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Drawer: undefined;
  RoutineDetailScreen: { id: string };
  AddRoutineScreen: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fuentesBebasCargadas] = useFontsBebas({ BebasNeue_400Regular });
  const [fuentesInterCargadas] = useFontsInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const fuentesListas = fuentesBebasCargadas && fuentesInterCargadas;

  const alColocarLayout = useCallback(async () => {
    if (fuentesListas) {
      await SplashScreen.hideAsync();
    }
  }, [fuentesListas]);

  if (!fuentesListas) {
    return null;
  }

  return (
    <RoutineProvider>
      <NavigationContainer onReady={alColocarLayout}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />

          <Stack.Screen
            name="RoutineDetailScreen"
            component={RoutineDetailScreen}
            options={{
              headerShown: true,
              title: 'GymPro',
              headerStyle: { backgroundColor: colores.superficie },
              headerTintColor: colores.primario,
              headerTitleStyle: { fontFamily: 'Inter_600SemiBold' },
            }}
          />

          <Stack.Screen
            name="AddRoutineScreen"
            component={AddRoutineScreen}
            options={{
              headerShown: true,
              title: 'Formulario de Rutina',
              headerStyle: { backgroundColor: colores.superficie },
              headerTintColor: colores.primario,
              headerTitleStyle: { fontFamily: 'Inter_600SemiBold' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RoutineProvider>
  );
}