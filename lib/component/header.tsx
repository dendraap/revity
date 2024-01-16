import { View, Text, Image } from 'react-native'
import React from 'react'
import Avatar from './avatar'

const Header = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={require('../../assets/images/icon_revity_text.png')} style={{ resizeMode: 'center', width: 100, alignSelf: 'center', height: 40 }} />
            <Avatar />
        </View>
    )
}

export default Header