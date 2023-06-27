import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, FONT, icons, images } from '../../../constants'
import { TileGrid, MenuButton } from '../../../components'
import { supabase } from '../../../lib/supabase/supabase'
import { TextInput } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';
import moment, { min } from 'moment';
import styles from './rentalCard.styles'
import { fetchScooterReturn } from '../../../hook';

const ScooterRental = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const params = useSearchParams();
    const router = useRouter();
    const startDate = new Date(moment(params.time, 'ddd MMM DD YYYY HH:mm:ss [GMT]Z').toDate())
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const diffMilliseconds = Math.abs(now.getTime() - startDate.getTime());
            const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
            const diffSeconds = Math.floor((diffMilliseconds - (diffMinutes * 1000 * 60)) / 1000);
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
                    <MenuButton icon={icons.backArrow} onPress={() => { router.push('/rent-scooter/rent-list') }} />
                ),
                headerRight: () => (
                    <MenuButton icon={icons.profile} />
                ),
                headerTitle: "Smart City",
                headerTitleStyle: {
                    fontFamily: FONT.PoppinsBold,
                    fontSize: 22,
                    color: COLORS.blue
                },
            }} />

            <View style={styles.carImgContainer}>
                <Image source={images.scooterImg} style={styles.carImg}></Image>
                <Text style={styles.carNumber}>{params.code}</Text>
            </View>
            <View style={styles.buttonList}>
                <TouchableOpacity style={styles.buttonReturn} onPress={async () => {
                    const returnedProperly = await fetchScooterReturn(params.rental_id, params.code)
                    console.log(returnedProperly)
                    if (returnedProperly)
                    router.push({
                        pathname: `/rent-scooter/notActiveRental/${params.rental_id}`,
                        params: {
                            time_rented: startDate.toISOString(),
                            time_returned: returnedProperly.toISOString(),
                            code: params.code,
                            rental_id: params.rental_id
                        }
                    })
                    else {
                        Alert.alert('Błąd', 'Wystąpił błąd ze zwrotem hulajnogi')
                    }
                }}>
                    <Text style={styles.buttonReturnText}>Zwróć hulajnogę</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonHelp} onPress={() => { router.push(`/help`) }}>
                    <Text style={styles.buttonHelpText}>Pomoc</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rentInfoContainer}>
                <View style={styles.infoTimeContainer}>
                    <Text style={styles.infoTimeText}>Czas wypożyczenia</Text>
                    <Text style={styles.infoTime}>{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</Text>
                </View>
                <View style={styles.infoTimeContainer}>
                    <Text style={styles.infoDateText}>Data wypożyczenia</Text>
                    <Text style={styles.infoDate}>{startDate.toLocaleDateString()}</Text>
                </View>
                <View style={styles.infoHourContainer}>
                    <Text style={styles.infoDateText}>Godzina wypożyczenia</Text>
                    <Text style={styles.infoDate}>{startDate.toLocaleTimeString()}</Text>
                </View>
            </View>
        </SafeAreaView>
    )


}

export default ScooterRental;