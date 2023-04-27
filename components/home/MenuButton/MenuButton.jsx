import React, { useState } from "react";
import { TouchableOpacity, FlatList, Text, View, Image } from "react-native";

import styles from "./MenuButton.style";
import { icons } from "../../../constants";

function MenuButton({ icon }) {
    return (
        <TouchableOpacity style={styles.menuButtonContainer}>
            <Image source={icon} style={styles.menuButton} />
        </TouchableOpacity>
    )
}

export default MenuButton;