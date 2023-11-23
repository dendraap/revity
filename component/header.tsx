import { View, Text, Image } from 'react-native'
import React from 'react'
import Avatar from '../../revity/component/avatar'

const Header = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={require('../../revity/assets/images/icon_revity_text.png')} style={{ resizeMode: 'contain', width: 100, alignSelf: 'center' }} />
            <Avatar />
        </View>
    )
}

export default Header