import { Text, SafeAreaView, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import { MenuButton } from "../../components";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import styles from "./parking.style";

const mockParkings = [
  {
    coords: { latitude: 52.2202777, longitude: 21.0105555 },
    name: "Parking Politechnika Warszawska",
    freePlaces: 21,
  },
];
const parking = () => {
  const router = useRouter();
  const [location, setLocation] = useState();
  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(
      ({ status }) =>
        status === "granted" &&
        Location.getCurrentPositionAsync({}).then(setLocation)
    );
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
        <Text style={styles.title}>Wybierz parking</Text>
        {location?.coords && (
          <MapView
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            style={{ width: 300, height: 300 }}
            showsUserLocation
          >
            {mockParkings.map((parking) => (
              <Marker
                coordinate={parking.coords}
                title={parking.name}
                image={icons.parkingPin}
                onPress={() =>
                  router.push({
                    pathname: "/parking/parking",
                    params: {
                      parkingName: parking.name,
                      freePlaces: parking.freePlaces,
                    },
                  })
                }
                key={parking.name}
              />
            ))}
          </MapView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default parking;
