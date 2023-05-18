import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from '../constants'
import { TileGrid, MenuButton } from '../components'
import { supabase } from '../lib/supabase/supabase'


const Home = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: () => (
                    <MenuButton icon={icons.menu} />
                ),
                headerRight: () => (
                    <MenuButton icon={icons.profile} onPress={() => { router.push('profile') }} />
                ),
                headerTitle: "Smart City",
                headerTitleStyle: {
                    fontFamily: FONT.PoppinsBold,
                    fontSize: 22,
                    color: COLORS.blue
                }
            }} />
            <ScrollView>
                <TileGrid />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;