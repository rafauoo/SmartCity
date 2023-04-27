import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tile from '../Tile/tile';
import styles from './TileGrid.styles'
import { COLORS, icons } from '../../../constants';

export default function TileGrid() {
    return (
        <View style={styles.tileContainer}>
            <Tile title="Wypożycz Rower" icon={icons.bike} color={COLORS.blue} />
            <Tile title="Wypożycz Hulajnogę" icon={icons.scooter} color={COLORS.blue} />
            <Tile title="Parking" icon={icons.parking} color={COLORS.blue} />
            <Tile title="Bilety" icon={icons.ticket} color={COLORS.blue} />
            <Tile title="Wypożycz Samochód" icon={icons.car} color={COLORS.blue} />
            <Tile title="Pomoc" icon={icons.help} color={COLORS.blue} />
        </View>
    );
}