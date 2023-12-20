import { StyleSheet } from "react-native";
import Colors from '../constants/Colors'

export const defaultStyles = StyleSheet.create({
    // Container
    containerFluid: {
        flex: 1,
        padding: 16,
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
    sheetContainer: {
        marginHorizontal: 24,
        // borderColor: Colors.orange,
        // borderWidth: 2,
        borderRadius: 17
    },
    sheetcontainerP: {
        flex: 1,
        backgroundColor: Colors.grey,
        padding: 24,
    },
    modalContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 26,
        paddingBottom: 26,
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
        width: 37,
        height: 37,
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
    inputGroupSm: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
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

    // Drop Down
    dropdownSelector: {
        width: 100,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    flatList: {
        flexDirection: 'row',
        padding: 14,
        borderWidth: 1,
        // borderColor: Colors.orange,
        borderRadius: 10,
        // marginBottom: 10,
        backgroundColor: Colors.white,
        // gap: 5,
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    flatlistCategory: {
        borderRadius: 10,
        // marginTop: 15,
        // marginBottom: 15,
        // marginLeft: 3,
        // marginRight: 3,
        margin: 5,
        borderWidth: 1,
        borderColor: Colors.grey,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    flatlistCategoryPill: {
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    //  Button
    btnPrimary: {
        backgroundColor: Colors.primary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    btnPrimaryPill: {
        backgroundColor: Colors.primary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    btnPrimarySecondaryPill: {
        backgroundColor: Colors.primarySecondary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    btnSuccess: {
        backgroundColor: Colors.success,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    btnDanger: {
        backgroundColor: Colors.danger,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8

    },
    btnSecondary: {
        backgroundColor: Colors.secondary,
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
    floatingBtnStyle: {
        backgroundColor: Colors.primarySecondary,
        width: 65,
        height: 65,
        borderRadius: 100,
    },
    floatinBtnPosition: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },


    // TypoGraphy
    h1: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30
    },
    h2: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24
    },
    h3: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    },
    h4: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16
    },
    h5: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14
    },
    h6: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12
    },
    textSm: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10
    },
    textRegular: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    textMd: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14
    },
    textLg: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16
    },
    textXl: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18
    },
    textSmBold: {
        fontFamily: 'Poppins-Medium',
        fontSize: 10
    },
    textRegularBold: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12
    },
    textMdBold: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    textLgBold: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16
    },
    textXlBold: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },

    // CheckBox
    checkbox: {
        width: 25,
        height: 25,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.grey,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      checked: {
        backgroundColor: 'green', // Warna ketika checkbox checked
      },
      unchecked: {},
      checkboxText: {
        fontSize: 16,
      },

    // Swipeable
    swipeableContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: 120,
        borderRadius: 10,
        justifyContent: 'flex-end',
        backgroundColor: Colors.primary,
      },
    
      swipeAction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
      },
    
    deleteAction: {
        backgroundColor: Colors.danger,
        width: 60,
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },

      actionIcon: {
        width: 30,
        marginHorizontal: 10,
        backgroundColor: 'plum',
        height: 20,
      },

      rightAction: {
        alignItems: 'center',
        // flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#dd2c00',
        flex: 1,
        justifyContent: 'flex-end',
      },
})