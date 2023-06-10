import { Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import { MenuButton } from "../../components";
import { supabase } from "../../lib/supabase/supabase";
import styles from "./help.style";

const helper = ({ }) => {
    const router = useRouter();
    const [helpTypes, setHelpType] = useState([{ "type_name": "Zgłoś błąd" }, { "type_name": "Odwołaj się od mandatu" }, { "type_name": "Zgłoś uwagi do stanu pojazdu" }, { "type_name": "Pomoc z wypożyczeniem" }, { "type_name": "Kontakt" }]);

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
                    headerRight: () => <MenuButton icon={icons.profile} />,
                    headerTitle: "Smart City",
                    headerTitleStyle: {
                        fontFamily: FONT.PoppinsBold,
                        fontSize: 22,
                        color: COLORS.blue,
                    },
                }}
            />

            <ScrollView contentContainerStyle={styles.root}>
                <Text style={styles.title}>Jakiej pomocy potrzebujesz?</Text>
                {helpTypes.map((help) => (

                    < TouchableOpacity
                        style={styles.button}
                        key={help.type_name}
                        onPress={() =>
                            router.push({
                                pathname: "/help/help",
                                params: { type: help.type_name },
                            })
                        }
                    >
                        <Text>{help.type_name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView >
    );
};

export default helper;
