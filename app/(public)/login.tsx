import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, TextInput, Pressable, Text, Image, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../lib/constants/Colors'
import { defaultStyles } from '../../lib/constants/Style'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWarmUpBrowser } from '../../lib/hooks/useWarmUpBrowser';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  useWarmUpBrowser();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [emailFocused, setEmailFocused] = useState(false)
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [hidden, setHidden] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error: ', err)
    } finally {
      setLoading(false);
    }
  }, []);

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
  };

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

  return (
    <KeyboardAvoidingView behavior="padding" style={defaultStyles.containerFluid}>
      <SafeAreaView style={[defaultStyles.container, { gap: 20 }]}>
        <Spinner visible={loading} />
        <StatusBar
          animated={true}
          backgroundColor={Colors.primary}
          hidden={hidden}
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image source={require('../../assets/images/icon_revity_text.png')} style={{ resizeMode: 'contain', width: 200, alignSelf: 'center' }} />
        </View>
        <View>
          <Text style={[defaultStyles.h1]}>
            Masuk
          </Text>
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
        <View>
          <View style={[defaultStyles.inputGroup]}>
            <TextInput
              autoCapitalize='none'
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
              onFocus={handlePasswordFocused}
              onBlur={handlePasswordUnFocused}
              placeholder='Kata Sandi'
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
            emailAddress?.length !== 0 && password?.length >= 8 && ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)))
              ? defaultStyles.btnPrimary
              : defaultStyles.btnPrimaryDisabled2
          }
          onPress={onSignInPress}
          disabled={
            emailAddress?.length !== 0 && password?.length >= 8 && ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)))
              ? false
              : true
          }
        >
          <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
            Masuk
          </Text>
        </TouchableOpacity>
        <View >
          <TouchableOpacity style={[defaultStyles.btnOutline, { gap: 10 }]} onPress={handleGoogleSignIn}>
            <Ionicons name='logo-google' size={24} style={[defaultStyles.btnIcon]} />
            <Text style={defaultStyles.btnOutlineText}>
              Masuk dengan Google
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.015 }}></View>
        <View style={[{ justifyContent: 'center', alignItems: 'center', gap: 10 }]}>
          <Link href="/reset" asChild>
            <Pressable>
              <Text style={{ color: Colors.primary, fontFamily: 'Poppins-Regular' }}>Forgot password?</Text>
            </Pressable>
          </Link>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>
              Tidak punya akun?
            </Text>
            <Link href="/register" asChild style={{ color: Colors.primary, fontFamily: 'Poppins-Regular' }}>
              <Text>
                Mendaftar
              </Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default Login;
