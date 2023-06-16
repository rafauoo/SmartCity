import {
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    View,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import { MenuButton } from "../../components";
import styles from "./documents.style";

const document = ({}) => {
    const router = useRouter();
    const { type } = useSearchParams();
    const [sendDate, setSendDate] = useState();
    const [idNumber, setIdNumber] = useState('');
    
    console.log(type);
    if (type == "Dowód osobisty")
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#e8e3e3"}}>
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
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{type}</Text>
                        {sendDate && (
                            <Text style={[styles.text, styles.textSmall]}>
                                Dodano dokument {"\n" + sendDate.toLocaleString()}
                            </Text>
                        )}
                    </View>

                    {!sendDate && (
                        <>
                            <Text style={styles.textHeader}> NR DOWODU </Text>
                            <TextInput 
                                style={styles.header}>
                                placeholder="Wpisz numer dowodu"
                                onChangeText={newIdNumber => setIdNumber(nexIdNumber)}
                                defaultValue={idNumber}
                            </TextInput>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setSendDate(new Date())}
                            >
                                <Text>Wyślij</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        )
    else if (type == "Prawo jazdy")
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#e8e3e3"}}>
            </SafeAreaView>
        );
};

export default document;