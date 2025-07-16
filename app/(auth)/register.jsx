import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView, ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/AuthLayout';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  // Ubah inisialisasi dob menjadi null atau new Date()
  // Kita akan menggunakan null untuk menunjukkan belum dipilih
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  // Format tanggal ke "DD-MM-YYYY"
  const formatDate = (date) => {
    // Jika date adalah null (belum dipilih), kembalikan teks default
    if (!date) {
      return 'Tanggal Lahir (DD-MM-YYYY)'; // Teks default Anda
    }
    // Jika date adalah objek Date, format
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleRegister = () => {
    // Cek apakah dob sudah berupa objek Date atau string kosong (sekarang null)
    if (!email || !username || !dob || !city || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok!');
      return;
    }

    console.log({
      email,
      username,
      dob: formatDate(dob), // Sekarang aman karena formatDate sudah menangani null
      city,
      password,
    });

    navigation.navigate('facescan');
  };

  // Fungsi yang dipanggil saat tanggal dikonfirmasi atau dibatalkan
  const handleConfirmDate = (date) => {
    setDob(date); // Simpan objek Date
    setShowDatePicker(false);
  };

  const handleCancelDate = () => {
    setShowDatePicker(false);
  };

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={'padding'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center p-6 px-10 z-10">
            <Text className="text-3xl font-poppins-bold text-gray-800 mb-8">Buat Akun</Text>

            {/* Input Fields */}
            <TextInput
              className={`w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg leading-[1.5] text-black`}
              placeholder="Email"
              placeholderTextColor="#9CA3AF" // Warna gray-400
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TextInput
              className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg leading-[1.5] text-black"
              placeholder="Username"
              placeholderTextColor="#9CA3AF" // Warna gray-400
              value={username}
              onChangeText={setUsername}
            />

            <View className="w-full">
              {/* Tombol Trigger untuk Date Picker */}
              <TouchableOpacity
                className=""
                onPress={() => setShowDatePicker(true)}
              >
                {/* Tampilkan teks yang diformat atau teks default */}
                <Text className={`w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg ${dob ? 'text-black' : 'text-gray-400'}`}>
                  {formatDate(dob)}
                </Text>
              </TouchableOpacity>

              {/* DateTimePickerModal untuk iOS */}
              {Platform.OS === 'ios' && (
                <DateTimePickerModal
                  isVisible={showDatePicker} // Gunakan showDatePicker
                  mode="date"
                  // Pastikan date prop selalu objek Date yang valid
                  date={dob || new Date()} // Gunakan dob jika ada, atau tanggal saat ini sebagai default
                  onConfirm={handleConfirmDate}
                  onCancel={handleCancelDate}
                  display="inline" // Tampilan inline (iOS 14+)
                  locale="id_ID" // Format Indonesia
                  themeVariant="light" // Tema light
                  // iOS biasanya tidak membutuhkan container tambahan untuk inline display,
                  // modal akan muncul di atas View.
                />
              )}

              {/* DateTimePickerModal untuk Android */}
              {Platform.OS === 'android' && (
                <DateTimePickerModal
                  isVisible={showDatePicker}
                  mode="date"
                  // Pastikan date prop selalu objek Date yang valid
                  date={dob || new Date()} // Gunakan dob jika ada, atau tanggal saat ini sebagai default
                  onConfirm={handleConfirmDate}
                  onCancel={handleCancelDate}
                  // Untuk Android, display='default' atau 'spinner' biasanya
                  // lebih sesuai karena 'inline' tidak didukung atau memiliki perilaku berbeda.
                />
              )}
            </View>

            <TextInput
              className={`w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg leading-[1.5]text-black`}
              placeholder="Kota"
              placeholderTextColor="#9CA3AF" // Warna gray-400
              value={city}
              onChangeText={setCity}
            />

            <TextInput
              className={`w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg leading-[1.5] text-black`}        
              placeholder="Password"
              placeholderTextColor="#9CA3AF" // Warna gray-400

              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              className={`w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg text-lg leading-[1.5] text-black`}       
              placeholder="Konfirmasi Password"
              placeholderTextColor="#9CA3AF" // Warna gray-400
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* Tombol Register */}
            <TouchableOpacity
              className="w-full p-4 bg-[#102E4A] rounded-lg items-center mb-4 mt-10"
              onPress={handleRegister}
            >
              <Text className="text-white text-xl uppercase font-poppins-medium">Register</Text>
            </TouchableOpacity>

            {/* Link Sign In */}
            <View className="flex-row items-center">
              <Text className="text-gray-600 font-poppins">Sudah punya akun? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text className="text-blue-600 font-poppins underline">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
    </Layout>
  );
};

export default Register;

const styles = StyleSheet.create({});