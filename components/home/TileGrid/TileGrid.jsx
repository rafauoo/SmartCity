import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tile from '../Tile/tile';
import styles from './TileGrid.styles'

export default function TileGrid() {
    return (
        <View style={styles.tileContainer}>
            <Tile title="Wypożycz Rower" />
            <Tile title="Wypożycz Hulajnogę" />
            <Tile title="Parking" />
            <Tile title="Bilety" />
            <Tile title="Wypożycz Samochód" />
            <Tile title="Pomoc" />
        </View>
    );
}