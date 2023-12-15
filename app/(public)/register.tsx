import { TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack, router } from 'expo-router';
import Colors from '../../constants/Colors'
import { defaultStyles } from '../../constants/Style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'

const Register = () => {
  useWarmUpBrowser();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        firstName,
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      console.log('register.tsx:24 ~ onPressVerify ~ completeSignUp', completeSignUp)
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const sudahPunyaAkun = () => {
    router.back();
  }

  return (
    <View style={[defaultStyles.containerFluid, { gap: 20 }]}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image source={require('../../assets/images/icon_revity_text.png')} style={{ resizeMode: 'contain', width: 200, alignSelf: 'center' }} />
          </View>
          <View>
            <Text style={[defaultStyles.h1]}>
              Daftar
            </Text>
            <TextInput placeholder="Nama" value={firstName} onChangeText={setFirstName} style={[defaultStyles.input]} />
          </View>
          <TextInput autoCapitalize="none" placeholder="Email" value={emailAddress} onChangeText={setEmailAddress} style={[defaultStyles.input]} />
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
          <TouchableOpacity style={defaultStyles.btnPrimary} onPress={onSignUpPress}>
            <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
              Daftar
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.015 }}></View>
          <View style={[{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 5 }]}>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>
              Sudah punya akun?
            </Text>
            <Text style={{ color: Colors.primary, fontFamily: 'Poppins-Regular' }} onPress={sudahPunyaAkun}>
              Login
            </Text>
          </View>
        </>
      )}

      {pendingVerification && (
        <>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image source={require('../../assets/images/icon_revity_text.png')} style={{ resizeMode: 'contain', width: 250, alignSelf: 'center' }} />

          </View>
          <View>
            <TextInput value={code} placeholder="Masukkan Kode Verifikasi" style={[defaultStyles.input]} onChangeText={setCode} />
          </View>
          <TouchableOpacity style={defaultStyles.btnPrimary} onPress={onPressVerify}>
            <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
              Verifikasi Email
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.015 }}></View>
        </>
      )}
    </View>
  );
};

export default Register;