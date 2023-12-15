import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { defaultStyles } from '../../constants/Style'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      alert('Password reset successfully');
      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={[defaultStyles.containerFluid, { gap: 20 }]}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <View style={{ flex: 1 }}></View>
          <TextInput autoCapitalize="none" placeholder="Email" value={emailAddress} onChangeText={setEmailAddress} style={defaultStyles.input} />
          <TouchableOpacity style={defaultStyles.btnPrimary} onPress={onRequestReset}>
            <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
              Kirim Reset Email
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.015 }}></View>
        </>
      )}

      {successfulCreation && (
        <>
          <View style={{ flex: 1 }}></View>
          <TextInput autoCapitalize="none" placeholder="Masukkan Kode" value={code} onChangeText={setCode} style={defaultStyles.input} />
          <View style={[defaultStyles.inputGroup]}>
            <TextInput
              autoCapitalize='none'
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder='Kata Sandi Baru'
              style={[defaultStyles.inputGroupInput, { width: '85%' }]}
            />
            <View style={[{ width: '15%', height: '100%', justifyContent: "center", alignSelf: "center" }]}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#aaa"
                style={[defaultStyles.inputGroupRightIcon, { width: '100%', height: '100%' }]}
                onPress={toggleShowPassword}
              />
            </View>
          </View>
          <TouchableOpacity style={defaultStyles.btnPrimary} onPress={onReset}>
            <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
              Ubah Kata Sandi
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.015 }}></View>
        </>
      )}
    </View>
  );
};

export default PwReset;