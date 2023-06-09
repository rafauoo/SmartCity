import React from "react";
import { StyleSheet, View } from "react-native";
import Tile from "../Tile/tile";
import styles from "./TileGrid.styles";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons } from "../../../constants";

export default function TileGrid() {
    const router = useRouter();

    return (
        <View style={styles.tileContainer}>
            <Tile
                title="Wypożycz Rower"
                icon={icons.bike}
                color={COLORS.blue}
                onPress={() => {
                    router.push(`/rent-bike/rent-bike`);
                }}
            />
            <Tile
                title="Wypożycz Hulajnogę"
                icon={icons.scooter}
                color={COLORS.blue}
            />
            <Tile
                title="Parking"
                icon={icons.parking}
                color={COLORS.blue}
                onPress={() => router.push(`/parking`)}
            />
            <Tile
                title="Bilety"
                icon={icons.ticket}
                color={COLORS.blue}
                onPress={() => router.push(`/tickets`)}
            />
            <Tile
                title="Wypożycz Samochód"
                icon={icons.car}
                color={COLORS.blue}
                onPress={() => router.push('/rent-car/rent-car')} />
            <Tile
                title="Pomoc"
                icon={icons.help}
                color={COLORS.blue}
            />
        </View>
    );
}
