import React, { useState } from "react";
import { TouchableOpacity, FlatList, Text, View, Image } from "react-native";

import styles from "./tile.style";

function Tile({ title, icon, color, onPress }) {
    return (
        <TouchableOpacity style={styles.tileBackground(color)}
            onPress={onPress}>
            <Image source={icon} style={styles.tileImage} />
            <Text style={styles.tileText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Tile;