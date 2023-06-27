import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, } from 'react-native'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from '../../constants'
import { TileGrid, MenuButton } from '../../components'
import { supabase } from '../../lib/supabase/supabase'
import { TextInput } from 'react-native-gesture-handler';
import styles from './rent-scooter.style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';

const QRScanner = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanData, setScanData] = useState(null);
    const router = useRouter();
    const [value, onChangeText] = useState('');

    useEffect(() => {
        (async() => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, [])

    if (!hasPermission) {
        return (
            <View>
                <Text>No permission for camera</Text>
            </View>
        )
    }

    const handleBarCodeScanned = ({type, data}) => {
        setScanData(true)
        console.log(`data: ${data}`);
        console.log(`type: ${type}`);
        const code = data;
        const other = type;
        router.push({ pathname: "/rent-bike/rent-bike", params: { post: "random", code, other } });
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: '50%',
            marginBottom: '50%',
            width: '80%',
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center'
        }
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
        <Stack.Screen options={{
            headerStyle: { backgroundColor: COLORS.white },
            headerLeft: () => (
                <MenuButton icon={icons.backArrow} onPress={() => {router.back()}}/>
            ),
            headerTitle: "Smart City",
            headerTitleStyle: {
                fontFamily: FONT.PoppinsBold,
                fontSize: 22,
                color: COLORS.blue
            }
        }} />
            <View style={styles.container}>
                <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
                />
                <StatusBar style="auto" />
            </View>
            <View></View>
        </SafeAreaView>
    )


}

export default QRScanner;