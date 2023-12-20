import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, TextInput, Pressable, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../constants/Colors'
import { defaultStyles } from '../../constants/Style'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  useWarmUpBrowser();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
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

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      // console.log('login.tsx:24 ~ onSignInPress ~ completeSignIn', completeSignIn)
    } catch (err: any) {
      // return <Text>{err.errors[0].message}</Text>
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();
      // console.log("login~onSelectAuth~createSessionId:", createdSessionId)

      if (createdSessionId) {
        setActive!({ session: createdSessionId });

      }
    } catch (err) {
      console.error('OAuth error: ', err)
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SafeAreaView style={[defaultStyles.containerFluid, { gap: 20 }]}>
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
        <TextInput autoCapitalize="none" placeholder="Email" value={emailAddress} onChangeText={setEmailAddress} style={defaultStyles.input} />
      </View>

      <View style={[defaultStyles.inputGroup]}>
        <TextInput
          autoCapitalize='none'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
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
      <TouchableOpacity style={defaultStyles.btnPrimary} onPress={onSignInPress}>
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
  );
};
export default Login;
