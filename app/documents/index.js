import { Text, SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { useState, useEffect} from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import { MenuButton } from "../../components";
import styles from "./documents.style";

const documenter = ({}) => {
    const router = useRouter();
    const [documentTypes, setDocumentType] = useState([{"type_name": "Dowód osobisty"}, {"type_name": "Prawo jazdy"}]);

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
                <Text style={styles.title}>Jaki dokument chcesz dodać?</Text>
                {documentTypes.map((document) => (

                    < TouchableOpacity
                        style={styles.button}
                        key={document.type_name}
                        onPress={() =>
                            router.push({
                                pathname: "/documents/document",
                                params: { type: document.type_name },
                            })
                        }
                    >
                        <Text>{document.type_name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView >
    );           
};

export default documenter;