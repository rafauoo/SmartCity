import { StyleSheet } from 'react-native'
import { COLORS, FONT } from '../../../constants'

const styles = StyleSheet.create({
    tileBackground: (color) => ({
        height: 0,
        backgroundColor: color,
        width: '49%',
        aspectRatio: 1,
        borderRadius: 6,
        marginBottom: 5,
        elevation: 5,
    }),
    tileText: {
        color: COLORS.white,
        fontFamily: FONT.PoppinsBold,
        fontSize: 17,
        textAlign: 'center'
    },
    tileImage: {
        width: '50%',
        height: '50%',
        marginTop: 15,
        marginBottom: 30,
        alignSelf: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
})

export default styles;