import { View, Text, Image } from 'react-native'
import React from 'react'
import { defaultStyles } from '../../revity/constants/Style'
import { useUser } from '@clerk/clerk-expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import Colors from '../constants/Colors';

const Avatar = () => {
  const { user } = useUser();
  let photoProfile = null;

  const profilePage = () => {
    router.push('/(auth)/profile')
  }

  if (user && user.profileImageUrl) {
    const linkPhotoProfile = user.profileImageUrl;
    photoProfile = { uri: linkPhotoProfile };
  }
  return (
    <View style={{ alignSelf: 'center' }}>
      {photoProfile ? (
        <TouchableOpacity onPress={profilePage}>
          <Image source={photoProfile} style={defaultStyles.avatarContainer} />
        </TouchableOpacity>
      ) : (
        <View style={defaultStyles.avatarContainer}></View>
      )}
    </View>
  )
}

export default Avatar