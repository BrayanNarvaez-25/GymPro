import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import ChestDetailScreen from './src/screens/ChestDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen
          name="ChestDetailScreen"
          component={ChestDetailScreen}
          options={{
            headerShown: true,
            title: 'Detalle',
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#00FF41',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}