import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from '../../constants'
import { TileGrid, MenuButton } from '../../components'
import { supabase } from '../../lib/supabase/supabase'
import { TextInput } from 'react-native-gesture-handler';
import styles from './rent-bike.style';
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
            height: 100,
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    return (
            <View style={styles.container}>
                <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
                />
                <StatusBar style="auto" />
            </View>
    )


}

export default QRScanner;