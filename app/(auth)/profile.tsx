import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors'
import { defaultStyles } from '../../constants/Style'

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const {signOut, isSignedIn} = useAuth();

  const onSaveUser = async () => {
    try {
      // This is not working!
      const result = await user?.update({
        firstName: firstName!,
        // lastName: lastName!,
      });
      console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
    } catch (e) {
      console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
    }
  };

  return (
    <View style={[defaultStyles.containerFluid, {gap: 20}]}>
      <Text style={{ textAlign: 'center' }}>
        Good morning {user?.firstName} {user?.lastName}!
      </Text>
      <TextInput placeholder="Ubah nama" value={firstName || ''} onChangeText={setFirstName} style={defaultStyles.input} />
      <TouchableOpacity style={defaultStyles.btnPrimary} onPress={onSaveUser}>
        <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
          Simpan Perubahan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Profile;