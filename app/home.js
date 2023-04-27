import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { COLORS } from '../constants'
import { TileGrid } from '../components'


const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: () => (
                    <Text>Left</Text>
                ),
                headerRight: () => (
                    <Text>Right</Text>
                ),
                headerTitle: "",
            }} />
            <ScrollView>
                <TileGrid />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;