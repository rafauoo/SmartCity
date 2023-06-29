import { Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import { MenuButton } from "../../components";
import { supabase } from "../../lib/supabase/supabase";
import styles from "./tickets.style";

const tickets = ({ }) => {
    const router = useRouter();
    const [ticketTypes, setTicketTypes] = useState([]);

    useEffect(() => {
        supabase
            .from("ticket_type")
            .select("type_name")
            .then(({ data }) => setTicketTypes(data));
    }, []);

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
                <Text style={styles.title}>Wybierz rodzaj biletu</Text>
                {ticketTypes.map((ticket) => (
                    <TouchableOpacity
                        style={styles.button}
                        key={ticket.type_name}
                        onPress={() =>
                            router.push({
                                pathname: "/tickets/ticket",
                                params: { type: ticket.type_name },
                            })
                        }
                    >
                        <Text>{ticket.type_name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default tickets;
