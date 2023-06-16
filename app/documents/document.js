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
import { fetchDocumentAdd } from '../../hook';
import { supabase } from '../../lib/supabase/supabase';

const document = ({}) => {
    const router = useRouter();
    const { type } = useSearchParams();
    const [sendDate, setSendDate] = useState();
    const [documentType, setDocumentType] = useState('');
    const [valueType, setValueType] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const params = useSearchParams();
    const { code, other } = params;
    async function yesPressed() {
        const { data, error } = await supabase.auth.refreshSession()
        const { session, user } = data
        const rentData = await fetchDocumentAdd(session.user.id, documentType, idNumber, valueType)
        if (rentData) {
            Alert.alert('Dodano dokument', 'Dokument został dodany pomyślnie', [
                {
                    text: 'Ok',
                    onPress: () => { },
                    style: 'default',
                },
            ],
                { cancelable: true })
        }
        else {
            console.log("Car not available")
            Alert.alert('Błąd', 'Wystąpił nieoczekiwany błąd przy próbie dodania. Spróbuj ponownie później', [
                {
                    text: 'Ok',
                    onPress: () => { },
                    style: 'default',
                },
            ],
                { cancelable: true })
        }

    }
    useEffect(() => {
        if (code) {
            onChangeText(code);
        }
    }, [code])
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

                <ScrollView>
                    <View style={styles.numberContainer}>
                        <Text style={styles.numberText}>Wprowadź Twój numer dowodu</Text>
                        <TextInput
                            editable
                            keyboardType='default'
                            numberOfLines={1}
                            maxLength={7}
                            placeholder={"000000000"}
                            onChangeText={number => setIdNumber(number)}
                            value={value}
                            style={styles.numberInput}
                        />
                    </View>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => {
                        setDocumentType('Dowód osobisty');
                        setValueType('Numer dowodu');
                        if (value) {
                            Alert.alert('Dodanie dowodu', `Czy numer dowodu: ${value} jest prawidłowy?`,
                                [
                                    {
                                        text: 'Nie',
                                        onPress: () => { },
                                        style: 'destructive'
                                    },
                                    {
                                        text: 'Tak',
                                        onPress: () => yesPressed(),
                                        style: 'default',
                                    },
                                ],
                                { cancelable: true })
                        }
                    }}>
                        <Text style={styles.acceptText}>Dodaj</Text>
                    </TouchableOpacity>
                    </ScrollView>
            </SafeAreaView>
        )
    else if (type == "Prawo jazdy")
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
                            <Text style={styles.textHeader}> NR PRAWA JAZDY </Text>
                            <TextInput 
                                style={styles.header}>
                                placeholder="Wpisz numer prawa jazdy"
                                onChangeText={newIdNumber => setIdNumber(newIdNumber)}
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
        );
};

export default document;