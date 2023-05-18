import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { Redirect, Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from '../constants'
import { TileGrid, MenuButton } from '../components'
import { supabase } from '../lib/supabase/supabase'
import { TouchableOpacity } from 'react-native';
import { ProfilePage } from '../components';


const Profile = () => {
    const router = useRouter();
    const [session, setSession] = useState(null)
    const [loggedIn, setLoggedIn] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        setLoading(false)
    }, [])
    if (!session) return <Text>Loading data...</Text>
    if (loggedIn) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
                <Stack.Screen options={{
                    headerStyle: { backgroundColor: COLORS.white },
                    headerLeft: () => (
                        <MenuButton icon={icons.backArrow} onPress={() => { router.back() }} />
                    ),
                    headerTitle: "Smart City",
                    headerTitleStyle: {
                        fontFamily: FONT.PoppinsBold,
                        fontSize: 22,
                        color: COLORS.blue
                    }
                }} />
                <ProfilePage session={session} />
                <TouchableOpacity onPress={() => { supabase.auth.signOut(); setLoggedIn(false) }} style={{
                    backgroundColor: COLORS.red,
                    marginTop: 40,
                    width: 250,
                    height: 50,
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    borderColor: COLORS.red,
                    borderWidth: 2,
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: FONT.PoppinsBold,
                        color: COLORS.white
                    }}>Wyloguj się</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    else return <Redirect href='/login' />
}

export default Profile;