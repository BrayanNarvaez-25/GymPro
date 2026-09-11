import { Text, StyleSheet,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function RoutineListScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Rutinas</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChestDetailScreen')}
      >
        <Text style={styles.buttonText}>Ver Rutina de Pecho</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#00FF41', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#00FF41', padding: 12, borderRadius: 6 },
  buttonText: { color: '#000', fontWeight: 'bold' },
});