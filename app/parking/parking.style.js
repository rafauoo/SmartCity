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
    width: 250,
    height: 50,
    alignItems: "center",
    borderRadius: 15,
    borderColor: COLORS.blue,
    borderWidth: 2,
    justifyContent: "center",
  },
  parking: {
    backgroundColor: COLORS.blue,
    margin: 40,
    padding: 40,
    borderRadius: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default styles;
