import { Text, SafeAreaView, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import { MenuButton } from "../../components";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import styles from "./parking.style";
import { fetchParkings } from "../../hook";

const parking = () => {
  const router = useRouter();
  const [location, setLocation] = useState();
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(
      ({ status }) =>
        status === "granted" &&
        Location.getCurrentPositionAsync({}).then(setLocation)
    );
    fetchParkings().then((data) =>
      setParkings(
        data.map((parking) => ({
          id: parking.service_id,
          name: Object.values(parking.city_service_extra_data_value).find(
            (val) => val.data_name === "nazwa parkingu miejskiego"
          ).value,
          coords: Object.values(parking.city_service_extra_data_value)
            .find((val) => val.data_name === "wpółrzędne parkingu miejskiego")
            .value.split(",")
            .map(Number),
          places: Number(
            Object.values(parking.city_service_extra_data_value).find(
              (val) => val.data_name === "pojemność parkingu miejskiego"
            ).value
          ),
        }))
      )
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
        {location?.coords && !!parkings.length && (
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
            {parkings.map((parking) => (
              <Marker
                coordinate={{
                  latitude: parking.coords[0],
                  longitude: parking.coords[1],
                }}
                title={parking.name}
                image={icons.parkingPin}
                onPress={() =>
                  router.push({
                    pathname: "/parking/parking",
                    params: {
                      parkingName: parking.name,
                      places: parking.places,
                      id: parking.id,
                    },
                  })
                }
                key={parking.id}
              />
            ))}
          </MapView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default parking;
