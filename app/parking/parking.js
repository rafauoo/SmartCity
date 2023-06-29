import {
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import { MenuButton } from "../../components";
import styles from "./parking.style";
import { fetchParkingReturn, fetchRentParking } from "../../hook";
import { supabase } from "../../lib/supabase/supabase";

const ticket = () => {
    const router = useRouter();
    const { parkingName, places, id } = useSearchParams();
    const [clipDate, setClipDate] = useState();
    const [returnDate, setReturnDate] = useState();
    const [rentalId, setRentalId] = useState();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#e8e3e3" }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.white },
                    headerLeft: () => (
                        <MenuButton
                            icon={icons.backArrow}
                            onPress={() => {
                                router.back();
                            }}
                        />
                    ),

                    headerTitle: "Smart City",
                    headerTitleStyle: {
                        fontFamily: FONT.PoppinsBold,
                        fontSize: 22,
                        color: COLORS.blue,
                    },
                }}
            />

            <ScrollView contentContainerStyle={styles.root}>
                <View style={styles.parking}>
                    <Image source={icons.parking} style={styles.image} />
                    <Text style={styles.text}>{parkingName}</Text>
                    <Text style={[styles.text, styles.textSmall]}>
                        Pojemność: {places}
                    </Text>
                    {clipDate && (
                        <Text style={[styles.text, styles.textSmall]}>
                            Zarezerwowano {"\n" + clipDate.toLocaleString()}
                        </Text>
                    )}
                    {returnDate && (
                        <>
                            <Text style={[styles.text, styles.textSmall]}>
                                Zwolniono {"\n" + returnDate.toLocaleString()}
                            </Text>
                            <Text style={[styles.text, styles.textSmall]}>Cena: 0zł</Text>
                        </>
                    )}
                </View>
                {!clipDate && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            const { data, error } = await supabase.auth.refreshSession();
                            if (error || !data) return;
                            const { user } = data;
                            const { value, rental_id } = await fetchRentParking(id, user.id);
                            setClipDate(new Date(value));
                            setRentalId(rental_id);
                        }}
                    >
                        <Text>Zarezerwuj miejsce</Text>
                    </TouchableOpacity>
                )}
                {clipDate && !returnDate && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            const { data, error } = await supabase.auth.refreshSession();
                            if (error || !data) return;
                            const { user } = data;
                            const { value } = await fetchParkingReturn(rentalId, user.id);
                            setReturnDate(new Date(value));
                        }}
                    >
                        <Text>Zwolnij miejsce</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ticket;
