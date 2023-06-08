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

const ticket = () => {
  const router = useRouter();
  const { parkingName, freePlaces } = useSearchParams();
  const [clipDate, setClipDate] = useState();

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
        <View style={styles.parking}>
          <Image source={icons.parking} style={styles.image} />
          <Text style={styles.text}>{parkingName}</Text>
          <Text style={[styles.text, styles.textSmall]}>
            Wolne miejsca: {freePlaces}
          </Text>
          {clipDate && (
            <Text style={[styles.text, styles.textSmall]}>
              Zarezerwowano {"\n" + clipDate.toLocaleString()}
            </Text>
          )}
        </View>
        {!clipDate && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setClipDate(new Date())}
          >
            <Text>Zarezerwuj miejsce</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ticket;
