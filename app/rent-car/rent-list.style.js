import { StyleSheet } from 'react-native'
import { COLORS, FONT } from '../../constants'

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 20,
    },
    rentBox: {
        marginTop: 10,
        backgroundColor: COLORS.white,
        width: '90%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 15,
        borderColor: COLORS.blue,
        borderWidth: 2,
        display: 'flex',
    },
    objectID: {
        fontSize: 40,
        marginTop: 20,
        marginLeft: 20,
        fontFamily: FONT.PoppinsBold,
        color: COLORS.blue,
    },
    time: {
        textAlign: 'right',
        fontSize: 20,
        marginTop: 10,
        marginRight: 20,
        color: COLORS.blue,
        fontFamily: FONT.PoppinsLight
    },
    carImg: {
        position: 'absolute',
        resizeMode: 'contain',
        height: 100,
        width: 100,
        marginLeft: 20,
        marginTop: 50,
    },
    rentalID: {
        position: 'absolute',
        right: 10,
        top: 10,
        textAlign: 'right',
        fontSize: 18,
        color: COLORS.blue,
        fontFamily: FONT.PoppinsBold
    },
    active: {
        alignSelf: 'flex-end',
        flexWrap: 'wrap',
        fontSize: 20,
        marginTop: 10,
        maxWidth: 130,
        marginRight: 20,
        color: COLORS.red,
        fontFamily: FONT.PoppinsBold
    },
    activeRentBox: {
        marginTop: 10,
        backgroundColor: 'rgba(10,20,156,0.2)',
        width: '90%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 15,
        borderColor: COLORS.blue,
        borderWidth: 2,
        display: 'flex',
    },
})

export default styles;