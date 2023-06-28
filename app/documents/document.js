import {
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import { MenuButton } from "../../components";
import styles from "./documents.style";
import { fetchDocumentAdd } from "../../hook";
import { supabase } from "../../lib/supabase/supabase";
import { Alert } from "react-native";

const document = ({}) => {
  const router = useRouter();
  const { type } = useSearchParams();
  const [value, onChangeText] = useState("");
  const params = useSearchParams();
  const { code, other } = params;
  async function yesPressed(valueType, documentType) {
    const { data, error } = await supabase.auth.refreshSession();
    const { session, user } = data;
    const rentData = await fetchDocumentAdd(
      session.user.id,
      documentType,
      valueType,
      value
    );
    if (rentData) {
      Alert.alert(
        "Dodano dokument",
        "Dokument został dodany pomyślnie",
        [
          {
            text: "Ok",
            onPress: () => {},
            style: "default",
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        "Błąd",
        "Wystąpił nieoczekiwany błąd przy próbie dodania. Spróbuj ponownie później",
        [
          {
            text: "Ok",
            onPress: () => {},
            style: "default",
          },
        ],
        { cancelable: true }
      );
    }
  }
  useEffect(() => {
    if (code) {
      onChangeText(code);
    }
  }, [code]);
  if (type == "Dowód osobisty")
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

        <ScrollView>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>Wprowadź Twój numer dowodu</Text>
            <TextInput
              editable
              keyboardType="default"
              numberOfLines={1}
              maxLength={9}
              placeholder={"000000000"}
              onChangeText={(number) => onChangeText(number)}
              value={value}
              style={styles.numberInput}
            />
          </View>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              if (value) {
                Alert.alert(
                  "Dodanie dowodu",
                  `Czy numer dowodu: ${value} jest prawidłowy?`,
                  [
                    {
                      text: "Nie",
                      onPress: () => {},
                      style: "destructive",
                    },
                    {
                      text: "Tak",
                      onPress: () =>
                        yesPressed("numer dowodu", "dowód osobisty"),
                      style: "default",
                    },
                  ],
                  { cancelable: true }
                );
              }
            }}
          >
            <Text style={styles.acceptText}>Dodaj</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  else if (type == "Prawo jazdy")
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

        <ScrollView>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>
              Wprowadź Twój numer prawa jazdy
            </Text>
            <TextInput
              editable
              keyboardType="default"
              numberOfLines={1}
              maxLength={7}
              placeholder={"000000000"}
              onChangeText={(number) => onChangeText(number)}
              value={value}
              style={styles.numberInput}
            />
          </View>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              if (value) {
                Alert.alert(
                  "Dodanie prawa jazdy",
                  `Czy numer prawa jazdy: ${value} jest prawidłowy?`,
                  [
                    {
                      text: "Nie",
                      onPress: () => {},
                      style: "destructive",
                    },
                    {
                      text: "Tak",
                      onPress: () =>
                        yesPressed("numer prawa jazdy", "prawo jazdy"),
                      style: "default",
                    },
                  ],
                  { cancelable: true }
                );
              }
            }}
          >
              <Text style={styles.acceptText}>Dodaj</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    else if (type == "Karta dużej rodziny")
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

          <ScrollView>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>
                Wprowadź Twój numer KDR
              </Text>
              <TextInput
                editable
                keyboardType="default"
                numberOfLines={1}
                maxLength={7}
                placeholder={"000000000"}
                onChangeText={(number) => onChangeText(number)}
                value={value}
                style={styles.numberInput}
              />
            </View>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                if (value) {
                  Alert.alert(
                    "Dodanie Karty Dużej Rodziny",
                    `Czy numer KDR: ${value} jest prawidłowy?`,
                    [
                      {
                        text: "Nie",
                        onPress: () => {},
                        style: "destructive",
                      },
                      {
                        text: "Tak",
                        onPress: () =>
                          yesPressed("numer karty dużej rodziny", "karta dużej rodziny"),
                        style: "default",
                      },
                    ],
                    { cancelable: true }
                  );
                }
              }}
            >
              <Text style={styles.acceptText}>Dodaj</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
    );
    else if (type == "Paszport")
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

          <ScrollView>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>
                Wprowadź Twój numer paszportu
              </Text>
              <TextInput
                editable
                keyboardType="default"
                numberOfLines={1}
                maxLength={7}
                placeholder={"000000000"}
                onChangeText={(number) => onChangeText(number)}
                value={value}
                style={styles.numberInput}
              />
            </View>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                if (value) {
                  Alert.alert(
                    "Dodanie Paszportu",
                    `Czy numer Paszportu: ${value} jest prawidłowy?`,
                    [
                      {
                        text: "Nie",
                        onPress: () => {},
                        style: "destructive",
                      },
                      {
                        text: "Tak",
                        onPress: () =>
                          yesPressed("numer paszportu", "paszport"),
                        style: "default",
                      },
                    ],
                    { cancelable: true }
                  );
                }
              }}
            >
              <Text style={styles.acceptText}>Dodaj</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
    );
};

export default document;
