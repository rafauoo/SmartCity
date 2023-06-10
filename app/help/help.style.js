import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants";

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },
    title: {
        margin: 40,
        fontSize: 30,
        fontFamily: FONT.PoppinsLight,
        color: COLORS.blue,
    },
    text: {
        fontSize: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.white,
        textAlign: "center",
    },
    textSmall: {
        fontSize: 16,
    },
    button: {
        backgroundColor: COLORS.white,
        margin: 8,
        width: 300,
        height: 50,
        alignItems: "center",
        borderRadius: 15,
        borderColor: COLORS.blue,
        borderWidth: 2,
        justifyContent: "center",
    },
    help: {
        backgroundColor: COLORS.blue,
        margin: 30,
        padding: 20,
        borderRadius: 16,
    },
    textHeader: {
        //textAlign: left, dac na lewo jakos bo zle wyglada
        color: COLORS.blue,
        fontFamily: FONT.PoppinsBold,
        fontSize: 20,
    },

    header: {
        backgroundColor: COLORS.white,
        margin: 10,
        width: 350,
        height: 40,
        fontSize: 20,
        borderRadius: 8,
        fontFamily: FONT.PoppinsLight,
        marginBottom: 30
    },

    mess: {
        backgroundColor: COLORS.white,
        fontFamily: FONT.PoppinsLight,
        margin: 10,
        width: 350,
        height: 450,
        fontSize: 20,
        borderRadius: 8,
        textAlignVertical: 'top'
    },
    textHelp: {
        color: COLORS.blue,
        fontFamily: FONT.PoppinsLight,
        fontSize: 16,
        textAlign: "center",
        marginBottom: 25,
    }

});

export default styles;
