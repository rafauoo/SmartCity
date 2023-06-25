import { Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, icons } from '../constants'
import { MenuButton } from '../components'


const Menu = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: () => (
                    <MenuButton icon={icons.backArrow} onPress={() => {router.back()}}/>
                ),
                headerTitle: "Menu",
                headerTitleStyle: {
                    fontFamily: FONT.PoppinsBold,
                    fontSize: 22,
                    color: COLORS.blue
                }
            }} />
            <TouchableOpacity onPress={() => {}} style={{
                backgroundColor: COLORS.blue,
                marginTop: 40,
                width: 250,
                height: 50,
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor: COLORS.blue,
                borderWidth: 2,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: FONT.PoppinsBold,
                    color: COLORS.white
                }}>O nas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={{
                    backgroundColor: COLORS.blue,
                    marginTop: 40,
                    width: 250,
                    height: 50,
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    borderColor: COLORS.blue,
                    borderWidth: 2,
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: FONT.PoppinsBold,
                        color: COLORS.white
                    }}>Kontakt</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Menu;