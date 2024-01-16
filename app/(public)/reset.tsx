import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import React, { useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { defaultStyles } from '../../lib/constants/Style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../lib/constants/Colors';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailFocused, setEmailFocused] = useState(false)
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const inputRefs = useRef<any>([]);
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

  const handleEmailFocused = () => {
    setEmailFocused(true)
  }
  const handleEmailUnFocused = () => {
    setEmailFocused(false)
  }
  const handleEmailChange = (text: any) => {
    const isValidInput = !text.startsWith(' ');
    if (isValidInput) {
      setEmailAddress(text)
    }
  }
  const emailValidationLive = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAddress.length == 0 && emailFocused === true) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.danger }]}>*Masukkan email</Text>
      )
    } else {
      if (!emailRegex.test(emailAddress)) {
        return (
          <Text style={[defaultStyles.textRegular, { color: Colors.danger }]}>*Format email tidak valid</Text>
        )
      } else {
        return (
          <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>*</Text>
        )
      }
    }
  }

  const handlePasswordFocused = () => {
    setPasswordFocused(true)
  }
  const handlePasswordUnFocused = () => {
    setPasswordFocused(false)
  }
  const handlePasswordChange = (text: any) => {
    const isValidInput = !text.startsWith(' ');
    if (isValidInput) {
      setPassword(text)
    }
  };
  const passwordValidationLive = () => {
    if (password.length < 8 && passwordFocused === true) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.danger }]}>*Password minimal 8 karakter</Text>
      )
    } else {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>*</Text>
      )
    }
  }

  const handleCodeChange = (text: any, index: any) => {
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = text;
      if (text.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      return newCode.join('');
    });
  };

  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={defaultStyles.containerFluid}>
      <View style={[defaultStyles.containerFluid, { gap: 20 }]}>
        <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />
        {!successfulCreation && (
          <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/images/search.png')} style={{ resizeMode: 'contain', width: 200, height: 150 }} />
              <Text style={defaultStyles.h3}>Reset Password</Text>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={defaultStyles.textRegular}>Masukkan email untuk mereset password akunmu</Text>
              </View>
            </View>
            <View>
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                value={emailAddress}
                onChangeText={handleEmailChange}
                onFocus={handleEmailFocused}
                onBlur={handleEmailUnFocused}
                style={defaultStyles.input}
              />
              <View style={{ marginBottom: 0, marginLeft: 5, display: emailFocused && (emailAddress.length === 0 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress))) ? 'flex' : 'none' }}>
                {emailValidationLive()}
              </View>
            </View>
            <TouchableOpacity
              style={
                emailAddress?.length !== 0 && ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)))
                  ? defaultStyles.btnPrimary
                  : defaultStyles.btnPrimaryDisabled2
              }
              onPress={onRequestReset}>
              <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
                Kirim Reset Email
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 0.015 }}></View>
          </>
        )}
        {successfulCreation && (
          <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/images/man.png')} style={{ resizeMode: 'contain', width: 200, height: 200 }} />
              <Text style={defaultStyles.h3}>Password Baru</Text>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={defaultStyles.textRegular}>Masukkan KODE dan password barumu</Text>
              </View>
            </View>
            <View>
              <View style={defaultStyles.containerPin}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={defaultStyles.inputPin}
                    value={code[index]}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    maxLength={1}
                    keyboardType="numeric"
                  />
                ))}
              </View>
            </View>
            <View>
              <View style={[defaultStyles.inputGroup]}>
                <TextInput
                  autoCapitalize='none'
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={handlePasswordChange}
                  onFocus={handlePasswordFocused}
                  onBlur={handlePasswordUnFocused}
                  placeholder='Kata Sandi baru'
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
              <View style={{ marginBottom: 0, marginLeft: 5, display: passwordFocused === true ? password.length < 8 ? 'flex' : 'none' : 'none' }}>{passwordValidationLive()}</View>
            </View>
            <TouchableOpacity
              style={
                code.length === 6 && password?.length >= 8
                  ? defaultStyles.btnPrimary
                  : defaultStyles.btnPrimaryDisabled2
              }
              onPress={onReset}
              disabled={
                code.length === 6 && password?.length >= 8
                  ? false
                  : true
              }
            >
              <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
                Ubah Kata Sandi
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 0.015 }}></View>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default PwReset;