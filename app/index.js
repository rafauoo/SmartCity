import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { Text } from 'react-native';

export default function Index() {
    let [fontsLoaded] = useFonts({
        "PoppinsBold": require("./../assets/fonts/Poppins-Bold.ttf"),
        "PoppinsLight": require("./../assets/fonts/Poppins-Light.ttf")
    })
    if (!fontsLoaded) {
        return <Text>Loading</Text>
    }
    return <Redirect href="/home" />;
}