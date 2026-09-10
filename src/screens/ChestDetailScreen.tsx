import {Text, Button,} from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen({navigation}: any){
    return(
        <SafeAreaView>
            <Text style={styles.title}> Detalles </Text>
            <Button
                title='Ir a detalles'
                onPress= {()=> navigation.navigate('Detail')}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        justifyContent: 'center',
    }
})