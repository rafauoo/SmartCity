import { Alert, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { Stack, useRouter, useNavigation, useSearchParams } from "expo-router";
import { COLORS, FONT, icons } from '../../constants'
import { TileGrid, MenuButton } from '../../components'
import { supabase } from '../../lib/supabase/supabase'
import { TextInput } from 'react-native-gesture-handler';
import styles from './rent-bike.style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { fetchBikeAvailable } from '../../hook';
import { fetchRentBike } from '../../hook';



const rentBike = () => {
    const router = useRouter();
    const params = useSearchParams();
    const { code, other } = params;
    const [value, onChangeText] = useState('');
    async function yesPressed() {
        const { data, error } = await supabase.auth.refreshSession()
        const { session, user } = data
        const rentData = await fetchRentBike(value, session.user.id)
        if (rentData)
        {
            console.log('Yes Pressed')
            console.log('Bike rented')
            console.log(rentData.insertedRentHour)
            router.push({ pathname: `/rent-bike/rental/${rentData.rental_id.rental_id}`,
             params: { time: rentData.insertedRentHour, code: value, rental_id: rentData.rental_id.rental_id} })
        }
        else {
            console.log("Bike not available")
            Alert.alert('Błąd','Nie można wypożyczyć roweru o tym numerze', [
            {
                text: 'Ok',
                onPress: () => {},
                style: 'default',
            },
        ],
        { cancelable: true })
        }

    }
    useEffect(() => {
        if (code) {
            onChangeText(code);
        }
    }, [code])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: () => (
                    <MenuButton icon={icons.backArrow} onPress={() => { router.back() }} />
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

            <ScrollView>
                <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>Wprowadź numer roweru:</Text>
                    <TextInput
                        editable
                        keyboardType='numeric'
                        numberOfLines={1}
                        maxLength={5}
                        placeholder={"00000"}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        style={styles.numberInput}
                    />
                </View>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {
                    if (value) {
                        Alert.alert('Wypożyczenie', `Czy na pewno chcesz wypożyczyć rower o numerze ${value}?`,
                            [
                                {
                                    text: 'Nie',
                                    onPress: () => { },
                                    style: 'destructive'
                                },
                                {
                                    text: 'Tak',
                                    onPress: () => yesPressed(),
                                    style: 'default',
                                },
                            ],
                            { cancelable: true })
                    }
                }}>
                    <Text style={styles.acceptText}>Wypożycz</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.qrButton} onPress={() => { router.push(`/rent-bike/qr-scanner`) }}>
                    <Text style={styles.qrText}>Użyj kodu QR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rentalsButton} onPress={() => router.push(`/rent-bike/rent-list`)}>
                    <Text style={styles.rentalsText}>Wypożyczenia</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default rentBike;