import { Alert, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { Stack, useRouter, useNavigation, useSearchParams } from "expo-router";
import { COLORS, FONT, icons } from '../../constants'
import { TileGrid, MenuButton } from '../../components'
import { supabase } from '../../lib/supabase/supabase'
import { TextInput } from 'react-native-gesture-handler';
import styles from './rent-list.style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { fetchRentals } from '../../hook';



const rentList = () => {
    const router = useRouter();
    const [session, setSession] = useState(null)
    const [loggedIn, setLoggedIn] = useState(true)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session) {
                const fetchData = async () => {
                  const rentals = await fetchRentals(session.user.id);
                  setData(rentals);
                };
                fetchData();
              }
        })
        setLoading(false)
    }, [])
    function yesPressed() {
        console.log('Yes Pressed')
        let time = new Date();
        router.push({ pathname: `/rent-bike/rental/${value}`, params: { time: time, code: value } })
    }
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
                <View style={styles.listContainer}>
                    {data && data.map((item, index) => (
                        <View key={index} style={styles.rentBox}>
                            <TouchableOpacity>
                                <Text style={styles.objectID}>{item.bike_id}</Text>
                                <Text style={styles.time}>{item.time_rented}</Text>
                                <Text style={styles.time}>{item.time_returned}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default rentList;