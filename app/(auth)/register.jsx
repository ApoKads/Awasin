import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView, 
  Platform, 
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Layout from '../components/AuthLayout';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [showDatePicker, setShowDatePicker] = useState(false); // Untuk date picker

  const handleRegister = () => {
    // Validate all fields
    if (!email || !username || !dob || !city || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    console.log({ email, username, dob, city, password });
    navigation.navigate('facescan');
  };



  return (
    <Layout>
        {/* BG */}
      <View className="absolute inset-0 z-0">
        <View className="absolute -top-24 -left-56 w-[500px] h-[500px] rounded-full bg-blue-100 opacity-30 blur-3xl"></View>
        <View className="absolute -bottom-20 -right-10 w-[400px] h-[400px] rounded-full bg-blue-100 opacity-20 blur-3xl"></View>
      </View>



      <View className="flex-1 justify-center items-center p-6 px-10 z-10">
        {/* Header/Title */}
        <View className="w-full h-[100px] justify-center items-center">
          <Text className="text-3xl font-poppins-bold text-gray-800 mb-8">Buat Akun</Text>
        </View>

        {/* Input Fields */}
        <TextInput
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        {/* Input Tanggal Lahir (Contoh sederhana dengan TextInput, lebih baik pakai Date Picker) */}
        <TextInput
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          placeholder="Tanggal Lahir (YYYY-MM-DD)"
          value={dob}
          onChangeText={setDob}
          keyboardType="numeric" // Contoh, bisa diatur ke date picker
          // onPressIn={() => setShowDatePicker(true)} // Jika menggunakan Date Picker
          // editable={!Platform.OS === 'ios'} // Jika iOS date picker muncul sendiri
        />
        {/* {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={new Date()} // Nilai awal
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )} */}

        <TextInput
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          placeholder="Kota"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          placeholder="Password"
          secureTextEntry // Menyembunyikan teks password
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="w-full p-4 mb-6 bg-white border border-gray-300 rounded-lg text-lg"
          placeholder="Konfirmasi password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Register Button */}
        <TouchableOpacity
          className="w-full p-4 bg-[#102E4A] rounded-lg items-center mb-4 mt-10"
          onPress={handleRegister}
        >
          <Text className="text-white text-xl uppercase font-poppins-medium">Register</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex items-center justify-center">
          <Text className="text-gray-600 font-poppins">Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => console.log('Go to Sign In')}>
            <Text className="text-gray-600 font-poppins text-base underline">SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Register;

// Anda mungkin masih butuh StyleSheet.create untuk gaya yang lebih kompleks
// atau untuk properti yang NativeWind belum support langsung (jarang terjadi sekarang).
const styles = StyleSheet.create({});