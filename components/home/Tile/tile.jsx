import React, { useState } from "react";
import { TouchableOpacity, FlatList, Text, View, Image } from "react-native";

import styles from "./tile.style";

function Tile({ title }) {
    return (
        <TouchableOpacity style={styles.tileBackground}>
            <Image />
            <Text style={styles.tileText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Tile;