import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-expo';
import Colors from '../../lib/constants/Colors'
import { defaultStyles } from '../../lib/constants/Style'
import AvatarLG from '../../lib/component/avatarLg';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [firstNameFocused, setFirstNameFocused] = useState(false)
  const [lastName, setLastName] = useState(user?.lastName)
  const { signOut, isSignedIn } = useAuth()

  const doLogout = () => {
    signOut()
  }

  const handleNamaFocused = () => {
    setFirstNameFocused(true)
  }

  const handleNamaUnFocused = () => {
    setFirstNameFocused(false)
  }

  const handleInputChangeFirstName = (text: any) => {
    const isValidInput = !text.startsWith(' ')
    if (isValidInput) {
      setFirstName(text)
    }
  }

  const handleInputChangeLastName = (text: any) => {
    const isValidInput = !text.startsWith(' ')
    if (isValidInput) {
      setLastName(text)
    }
  }

  const firstNameValidationLive = () => {
    if (firstName?.length === 0) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.danger }]}>*Masukkan nama depan</Text>
      )
    } else if (firstName?.length === 30) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.secondary }]}>*Maksimal 30 karakter</Text>
      )
    }
    else {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>*</Text>
      )
    }
  }

  const lastNameValidationLive = () => {
    if (lastName?.length === 0) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.danger }]}>*Masukkan nama belakang</Text>
      )
    } else if (lastName?.length === 30) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.secondary }]}>*Maksimal 30 karakter</Text>
      )
    }
    else {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>*</Text>
      )
    }
  }

  const onSaveUser = async () => {
    try {
      const result = await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (e) {
      console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bgProfile.png')} resizeMode="cover" style={{ flex: 1, justifyContent: 'flex-start' }}>
      <View style={[defaultStyles.containerFluidTransparent, { gap: 15 }]}>
        <AvatarLG />
        <Text style={[defaultStyles.textLg, { textAlign: 'center', color: Colors.white }]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <View style={[defaultStyles.container, { borderRadius: 20, padding: 20, justifyContent: 'space-between', gap: 15, elevation: 1.5 }]}>
          <View style={{ gap: 10 }}>
            <Text style={defaultStyles.textMdBold}>
              Pengaturan
            </Text>
            <View style={{ paddingHorizontal: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={defaultStyles.textMd}>
                  Nama depan
                </Text>
                <Text style={[defaultStyles.textMd, { color: Colors.danger }]}>
                  *
                </Text>
              </View>
              <TextInput
                placeholder="Ubah nama depan"
                value={firstName || ''}
                onChangeText={handleInputChangeFirstName}
                onFocus={handleNamaFocused}
                onBlur={handleNamaUnFocused}
                maxLength={30}
                style={[defaultStyles.input, defaultStyles.textMd]}
              />
              <View style={{ marginBottom: 0, marginLeft: 5, display: firstNameFocused === true ? firstName?.length === 0 ? 'flex' : 'none' : 'none'  }}>{firstNameValidationLive()}</View>
            </View>
            <View style={{ paddingHorizontal: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={defaultStyles.textMd}>
                  Nama belakang
                </Text>
              </View>
              <TextInput
                placeholder="Ubah nama belakang"
                value={lastName || ''}
                onChangeText={handleInputChangeLastName}
                maxLength={30}
                style={[defaultStyles.input, defaultStyles.textMd]}
              />
            </View>
            <TouchableOpacity
              style={[
                firstName?.length !== 0
                  ? defaultStyles.btnPrimary
                  : defaultStyles.btnPrimaryDisabled
                , { marginHorizontal: 5 }]}
              onPress={onSaveUser}
              disabled={
                firstName?.length !== 0
                  ? false
                  : true
              }
            >
              <Text style={[defaultStyles.textMd, { color: Colors.white }]}>
                Simpan Perubahan
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[defaultStyles.btnDangerOutline, { flexDirection: 'row', gap: 5, alignItems: 'center' }]}
            onPress={doLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
            <Text style={[defaultStyles.textMd, { color: Colors.danger }]}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Profile;