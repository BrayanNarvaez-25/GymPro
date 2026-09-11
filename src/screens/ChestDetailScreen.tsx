import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChestDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Rutina de Pecho</Text>
      <Text style={styles.subtext}>Press banca, aperturas, fondos...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#00FF41', fontSize: 22, fontWeight: 'bold' },
  subtext: { color: '#0A8F2E', marginTop: 10 },
});