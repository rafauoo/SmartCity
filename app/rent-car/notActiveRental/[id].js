import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
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
import styles from './rentalCard.styles';

const CarRentalNotActive = () => {
    const params = useSearchParams();
    const router = useRouter();
    useEffect(() => {

    }, [params])
    function getDate(date) {
        const dateObject = new Date(date);
        return dateObject
    }
    const calculateRentalTime = (date1, date2) => {
        const diffTime = Math.abs(getDate(date2) - getDate(date1));
        return diffTime;
    }
    function msToMinutesSeconds(time) {
        sec = Math.ceil(time / 1000);
        minutes = Math.floor(sec / 60);
        seconds = sec - minutes * 60
        return { "minutes": minutes, "seconds": seconds }
    }
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: () => (
                    <MenuButton icon={icons.backArrow} onPress={() => { router.push('/home') }} />
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
                <Image source={images.carImg} style={styles.carImg}></Image>
                <Text style={styles.carNumber}>{params.code}</Text>
            </View>
            <View style={styles.buttonList}>
                <TouchableOpacity style={styles.buttonHelp} onPress={() => { router.push(`/help`) }}>
                    <Text style={styles.buttonHelpText}>Pomoc</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rentInfoContainer}>
                <View style={styles.infoTimeContainer}>
                    <Text style={styles.infoTimeText}>Czas wypożyczenia</Text>
                    <Text style={styles.infoTime}>
                        {zeroPad(msToMinutesSeconds(calculateRentalTime(params.time_rented, params.time_returned)).minutes, 2)}:
                        {zeroPad(msToMinutesSeconds(calculateRentalTime(params.time_rented, params.time_returned)).seconds, 2)}
                    </Text>
                </View>
                <View style={styles.infoTimeContainer}>
                    <Text style={styles.infoDateText}>Data wypożyczenia</Text>
                    <Text style={styles.infoDate}>
                        {zeroPad(getDate(params.time_rented).getDate(), 2)}.
                        {zeroPad(getDate(params.time_rented).getMonth() + 1, 2)}.
                        {zeroPad(getDate(params.time_rented).getFullYear(), 2)}
                    </Text>
                </View>
                <View style={styles.infoTimeContainer}>
                    <Text style={styles.infoDateText}>Godzina wypożyczenia</Text>
                    <Text style={styles.infoDate}>
                        {zeroPad(getDate(params.time_rented).getHours(), 2)}:
                        {zeroPad(getDate(params.time_rented).getMinutes(), 2)}:
                        {zeroPad(getDate(params.time_rented).getSeconds(), 2)}
                    </Text>
                </View>
                <View style={styles.infoTimeContainer}>
                    <Text style={styles.infoDateText}>Data zwrotu</Text>
                    <Text style={styles.infoDate}>
                        {zeroPad(getDate(params.time_returned).getDate(), 2)}.
                        {zeroPad(getDate(params.time_returned).getMonth() + 1, 2)}.
                        {zeroPad(getDate(params.time_returned).getFullYear(), 2)}
                    </Text>
                </View>
                <View style={styles.infoHourContainer}>
                    <Text style={styles.infoDateText}>Godzina zwrotu</Text>
                    <Text style={styles.infoDate}>
                        {zeroPad(getDate(params.time_returned).getHours(), 2)}:
                        {zeroPad(getDate(params.time_returned).getMinutes(), 2)}:
                        {zeroPad(getDate(params.time_returned).getSeconds(), 2)}
                    </Text>
                </View>
                <Text style={styles.infoDateText}>ID Wypożyczenia: {params.rental_id}</Text>
            </View>
        </SafeAreaView>
    )
}

export default CarRentalNotActive;