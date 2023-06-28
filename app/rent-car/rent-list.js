import { Alert, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { Stack, useRouter, useNavigation, useSearchParams } from "expo-router";
import { COLORS, FONT, icons } from '../../constants'
import { TileGrid, MenuButton } from '../../components'
import { supabase } from '../../lib/supabase/supabase'
import { TextInput } from 'react-native-gesture-handler';
import styles from './rent-list.style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { images } from '../../constants'
import { fetchRentalsCar } from '../../hook';



const rentList = () => {
    const router = useRouter();
    const [session, setSession] = useState(null)
    const [loggedIn, setLoggedIn] = useState(true)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    useEffect(() => {
        setLoading(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session) {
                if (!data) {
                    const fetchData = async () => {
                        const rentals = await fetchRentalsCar(session.user.id);
                        setData(rentals);
                    };
                    fetchData();
                }
            }
        })
        setLoading(false)
    }, [])
    function getDate(date) {
        const dateObject = new Date(date);
        console.log(dateObject)
        return dateObject
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: () => (
                    <MenuButton icon={icons.backArrow} onPress={() => { router.push('/home') }} />
                ),

                headerTitle: "Smart City",
                headerTitleStyle: {
                    fontFamily: FONT.PoppinsBold,
                    fontSize: 22,
                    color: COLORS.blue
                }
            }} />

            <ScrollView>
                <View style={styles.listContainer}>
                    {data && data.slice(0).reverse().map((item, index) => (
                        <View key={index}>
                            {item.time_returned ?
                                <View style={styles.rentBox}>
                                    <TouchableOpacity onPress={() => {
                                        router.push({
                                            pathname: `/rent-car/notActiveRental/${item.rental_id}`,
                                            params: {
                                                time_rented: item.time_rented,
                                                time_returned: item.time_returned,
                                                code: item.car_id,
                                                rental_id: item.rental_id
                                            }
                                        })
                                    }
                                    }>
                                        <Image source={images.carImg} style={styles.carImg}></Image>
                                        <Text style={styles.objectID}>{item.car_id}</Text>
                                        <Text style={styles.rentalID}>ID Wypożyczenia: {item.rental_id}</Text>
                                        <Text style={styles.time}>
                                            {zeroPad(getDate(item.time_rented).getDate(), 2)}.
                                            {zeroPad(getDate(item.time_rented).getMonth() + 1, 2)}.
                                            {zeroPad(getDate(item.time_rented).getFullYear(), 2)} &nbsp;
                                            {zeroPad(getDate(item.time_rented).getHours(), 2)}:
                                            {zeroPad(getDate(item.time_rented).getMinutes(), 2)}:
                                            {zeroPad(getDate(item.time_rented).getSeconds(), 2)}
                                        </Text>
                                        <Text style={styles.time}>
                                            {zeroPad(getDate(item.time_returned).getDate(), 2)}.
                                            {zeroPad(getDate(item.time_returned).getMonth() + 1, 2)}.
                                            {zeroPad(getDate(item.time_returned).getFullYear(), 2)} &nbsp;
                                            {zeroPad(getDate(item.time_returned).getHours(), 2)}:
                                            {zeroPad(getDate(item.time_returned).getMinutes(), 2)}:
                                            {zeroPad(getDate(item.time_returned).getSeconds(), 2)}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.activeRentBox}>
                                    <TouchableOpacity onPress={() => {
                                        const date_rented = new Date(item.time_rented)
                                        router.push({
                                            pathname: `/rent-car/rental/${item.rental_id}`,
                                            params: { time: date_rented, code: item.car_id, rental_id: item.rental_id }
                                        })
                                    }
                                    }>
                                        <Image source={images.carImg} style={styles.carImg}></Image>
                                        <Text style={styles.objectID}>{item.car_id}</Text>
                                        <Text style={styles.time}>
                                            {zeroPad(getDate(item.time_rented).getDate(), 2)}.
                                            {zeroPad(getDate(item.time_rented).getMonth() + 1, 2)}.
                                            {zeroPad(getDate(item.time_rented).getFullYear(), 2)} &nbsp;
                                            {zeroPad(getDate(item.time_rented).getHours(), 2)}:
                                            {zeroPad(getDate(item.time_rented).getMinutes(), 2)}:
                                            {zeroPad(getDate(item.time_rented).getSeconds(), 2)}
                                        </Text>
                                        <Text style={styles.active}>WYPOŻYCZENIE W TRAKCIE</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default rentList;