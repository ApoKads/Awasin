import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Tambahkan logika logout (hapus token, clear storage, dll)
    Alert.alert("Logout", "Kamu telah logout");
    router.replace('/login'); // Ganti ke halaman login
  };

  return (
    <ScrollView className="bg-white px-6 pt-12">
      {/* Akun */}
      <Text className="text-xl font-bold mb-4">Akun</Text>

      <TouchableOpacity
        onPress={() => router.push('/editProfile')}
        className="flex-row items-center justify-between bg-white mb-2"
      >
        <View className="flex-row items-center space-x-3">
          <Image
            source={require('../assets/default-avatar.jpg')} // Ganti dengan avatar default
            className="w-14 h-14 rounded-full"
          />
          <View>
            <Text className="text-lg font-semibold">Nama User</Text>
            <Text className="text-sm text-gray-600">Informasi Pribadi</Text>
          </View>
        </View>
        <Text className="text-2xl text-gray-500">{'>'}</Text>
      </TouchableOpacity>

      <View className="border-b border-gray-300 my-4" />

      {/* Settings */}
      <Text className="text-xl font-bold mb-4">Settings</Text>

      {/* Riwayat */}
      <TouchableOpacity
        onPress={() => router.push('/history')}
        className="flex-row items-center justify-between bg-white mb-4"
      >
        <View className="flex-row items-center space-x-3">
          <Image
            source={require('../assets/icons/vectorart-history.png')}
            className="w-10 h-10"
          />
          <Text className="text-lg font-medium">Riwayat</Text>
        </View>
        <Text className="text-2xl text-gray-500">{'>'}</Text>
      </TouchableOpacity>

      {/* Kontak Kami */}
      <TouchableOpacity
        onPress={() => router.push('/contact')}
        className="flex-row items-center justify-between bg-white mb-4"
      >
        <View className="flex-row items-center space-x-3">
          <Image
            source={require('../assets/icons/vectorart-phone.png')}
            className="w-10 h-10"
          />
          <Text className="text-lg font-medium">Kontak kami</Text>
        </View>
        <Text className="text-2xl text-gray-500">{'>'}</Text>
      </TouchableOpacity>

      {/* FAQ */}
      <TouchableOpacity
        onPress={() => router.push('/faq')}
        className="flex-row items-center justify-between bg-white mb-6"
      >
        <View className="flex-row items-center space-x-3">
          <Image
            source={require('../assets/icons/vectorart-message.png')}
            className="w-10 h-10"
          />
          <Text className="text-lg font-medium">FAQ</Text>
        </View>
        <Text className="text-2xl text-gray-500">{'>'}</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-600 py-3 rounded-xl"
      >
        <Text className="text-white text-center font-bold text-base">Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
