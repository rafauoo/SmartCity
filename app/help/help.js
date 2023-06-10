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
import styles from "./help.style";

const help = () => {
    const router = useRouter();
    const { type } = useSearchParams();
    const [sendDate, setSendDate] = useState();
    const [header, setHeader] = useState('');
    const [message, setMessage] = useState('');

    console.log(type);
    if (type == "Zgłoś błąd" || type == "Odwołaj się od mandatu" || type == "Zgłoś uwagi do stanu pojazdu")
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
                    <View style={styles.help}>
                        <Text style={styles.text}>{type}</Text>
                        {sendDate && (
                            <Text style={[styles.text, styles.textSmall]}>
                                Wysłano zgłoszenie {"\n" + sendDate.toLocaleString()}
                            </Text>
                        )}
                    </View>

                    {!sendDate && (
                        <>
                            <Text style={styles.textHeader}>Nazwij zgłoszenie
                            </Text>
                            <TextInput style={styles.header} ></TextInput>

                            <Text style={styles.textHeader}>Wiadomość</Text>
                            <TextInput style={styles.mess} multiline={true}
                                numberOfLines={4}></TextInput>
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
    else if (type == "Pomoc z wypożyczeniem")
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
                    <View style={styles.help}>
                        <Text style={styles.text}>{type}</Text>
                        {sendDate && (
                            <Text style={[styles.text, styles.textSmall]}>
                                Wysłano zgłoszenie {"\n" + sendDate.toLocaleString()}
                            </Text>
                        )}
                    </View>

                    {!sendDate && (
                        <>
                            <Text style={styles.textHeader}>Wypożyczanie pojazdów</Text>
                            <Text style={styles.textHelp}>Aby wypożyczyć pojazd, w menu głównym wybierz kafelek z pojazdem, który chcesz wypożyczyć. Następnie wprowadź numer pojazdu i kliknij przycisk "Wypożycz". Potwierdź wypożyczenie klikając przycisk "Tak". Pojazd został wypożyczony.
                            </Text>
                            <Text style={styles.textHeader}>Zwroty</Text>
                            <Text style={styles.textHelp}>Aby zwrócić wypożyczony pojazd, kliknij przycisk "Zwróć". Potwierdź zwrot pojazdu klikając przycisk "Tak". Po kliknięciu przycisku "Tak", wyświetli się informacja o kwocie pobranej z Twojego konta, a pojazd zostanie zwrócony.
                            </Text>
                            <Text style={styles.textHeader}>Dodatkowe informacje</Text>
                            <Text style={styles.textHelp}>W razie dalszych problemów skontaktuj się z nami. Informacje kontaktowe znajdują się w zakładce "Kontakt".
                            </Text>

                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        )
    else if (type == "Kontakt")
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
                    <View style={styles.help}>
                        <Text style={styles.text}>{type}</Text>
                    </View>

                    {!sendDate && (
                        <>
                            <Text style={styles.textHeader}>E-mail: john.doe@example.com
                            </Text>
                            <Text style={styles.textHeader}>Numer telefonu: 123456789</Text>
                            <Text style={styles.textHeader}>Adres firmy: Plac Politechniki 1, Warszawa</Text>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        );
};

export default help;
