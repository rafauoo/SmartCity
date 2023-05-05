import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, FONT, icons } from '../../../constants'
import { TileGrid, MenuButton } from '../../../components'
import { supabase } from '../../../lib/supabase/supabase'
import { TextInput } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';
import moment, { min } from 'moment';

const BikeRental = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const params = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const startDate = new Date(moment(params.time, 'ddd MMM DD YYYY HH:mm:ss [GMT]Z').toDate())
            const diffMilliseconds = Math.abs(now.getTime() - startDate.getTime());
            const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
            const diffSeconds = Math.floor((diffMilliseconds - (diffMinutes * 1000 * 60)) / 1000);

            console.log(`Time difference: ${diffMinutes} minutes and ${diffSeconds} seconds`);
            setSeconds(diffSeconds);
            setMinutes(diffMinutes);
        }, 1000);
        return () => clearInterval(intervalId);
      }, [params]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: () => (
                    <MenuButton icon={icons.backArrow} onPress={() => {router.back()}}/>
                ),
                headerRight: () => (
                    <MenuButton icon={icons.profile} />
                ),
                headerTitle: "Smart City",
                headerTitleStyle: {
                    fontFamily: FONT.PoppinsBold,
                    fontSize: 22,
                    color: COLORS.blue
                }
            }} />

            <View>
                <Text>Time difference: {minutes} minutes and {seconds} seconds</Text>
            </View>
        </SafeAreaView>
    )


}

export default BikeRental;