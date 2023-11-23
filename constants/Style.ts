import { StyleSheet } from "react-native";
import Colors from '../constants/Colors'

export const defaultStyles = StyleSheet.create({
    // Container
    containerFluid: {
        flex: 1,
        padding: 26,
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
    },
    separatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    separator: {
        fontFamily: 'Poppins-SemiBold',
        color: Colors.dark
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        height: 50,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontFamily: 'Poppins-Regular',
        // borderTopColor: Colors.primary,
        // borderTopWidth: StyleSheet.hairlineWidth,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white', // Warna teks pada avatar
        fontSize: 20, // Ukuran teks pada avatar
    },


    //  Input
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 8,
        backgroundColor: Colors.white,
    },
    inputGroupInput: {
        height: 44,
        padding: 8,
        fontFamily: 'Poppins-Regular',
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 8,
        padding: 10,
        backgroundColor: Colors.white,
        fontFamily: 'Poppins-Regular',
    },
    inputGroupRightIcon: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },


    //  Button
    btnPrimary: {
        backgroundColor: Colors.primary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    btnOutline: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.secondary,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnText: {
        color: Colors.white,
        fontFamily: 'Poppins-Regular',
    },
    btnOutlineText: {
        color: Colors.dark,
        fontSize: 16,
        justifyContent: 'center',
        fontFamily: 'Poppins-Regular'
    },
    btnIcon: {
        // position: 'absolute',
        // left: 16,
    },


    // TypoGraphy
    h1: {
        fontFamily: 'Poppins-Medium',
        fontSize: 30
    },
    textSm: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10
    },
    textSmBold: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14
    },
})