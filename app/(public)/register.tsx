import { TextInput, View, Image, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRef, useState } from 'react';
import { Stack, router } from 'expo-router';
import Colors from '../../lib/constants/Colors'
import { defaultStyles } from '../../lib/constants/Style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWarmUpBrowser } from '../../lib/hooks/useWarmUpBrowser'

const Register = () => {
  useWarmUpBrowser();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [firstNameFocused, setFirstNameFocused] = useState(false)
  const [emailAddress, setEmailAddress] = useState('');
  const [emailFocused, setEmailFocused] = useState(false)
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRefs = useRef<any>([]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      await signUp.create({
        firstName,
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

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
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const sudahPunyaAkun = () => {
    router.back();
  }

  const handleNamalFocused = () => {
    setFirstNameFocused(true)
  }

  const handleNamaUnFocused = () => {
    setFirstNameFocused(false)
  }

  const handleNamaChange = (text: any) => {
    const isValidInput = !text.startsWith(' ');
    if (isValidInput) {
      setFirstName(text)
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

  const namaValidationLive = () => {
    if (firstName.length == 0 && firstNameFocused === true) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.danger }]}>*Masukkan nama</Text>
      )
    } else {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>*</Text>
      )
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
      <View style={[defaultStyles.container, { gap: 20 }]}>
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
              <TextInput
                placeholder="Nama"
                value={firstName}
                onChangeText={handleNamaChange}
                onFocus={handleNamalFocused}
                onBlur={handleNamaUnFocused}
                style={[defaultStyles.input]}
              />
              <View style={{ marginBottom: 0, marginLeft: 5, display: firstNameFocused === true ? firstName.length == 0 ? 'flex' : 'none' : 'none' }}>{namaValidationLive()}</View>
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
                firstName?.length !== 0 && emailAddress?.length !== 0 && password?.length >= 8 && ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)))
                  ? defaultStyles.btnPrimary
                  : defaultStyles.btnPrimaryDisabled2
              }
              onPress={onSignUpPress}
              disabled={
                firstName?.length !== 0 && emailAddress?.length !== 0 && password?.length >= 8 && ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)))
                  ? false
                  : true
              }
            >
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/images/search.png')} style={{ resizeMode: 'contain', width: 200, height: 150 }} />
              <Text style={[defaultStyles.h3, {marginTop: 10}]}>Verifikasi Email</Text>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={defaultStyles.textRegular}>Masukkan kode verifikasi yang telah dikirim melalui email</Text>
              </View>
            </View>
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
            <TouchableOpacity
              style={
                code.length === 6
                  ? defaultStyles.btnPrimary
                  : defaultStyles.btnPrimaryDisabled2
              }
              onPress={onPressVerify}
              disabled={
                code.length === 6
                  ? false
                  : true
              }
            >
              <Text style={[defaultStyles.btnText, { fontSize: 17 }]}>
                Verifikasi Email
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 0.015 }}></View>
          </>
        )}
      </View>

    </KeyboardAvoidingView>
  );
};

export default Register;