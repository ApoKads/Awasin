import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavbar from './components/BottomNavbarAdmin';

const SettingsAdmin = () => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya",
          onPress: () => {
            console.log("Admin logged out");
            router.replace('/landing'); // Atau '/login' sesuai alur kamu
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">Pengaturan</Text>
      </View>

      {/* Info Admin */}
      <View className="bg-white px-6 py-6 flex-row items-center gap-4">
        <Image
          source={require('../assets/default-avatar.jpg')}
          className="w-16 h-16 rounded-full"
        />
        <View>
          <Text className="text-lg font-semibold">Admin</Text>
          <Text className="text-sm text-gray-500">Akun Admin</Text>
        </View>
      </View>

      {/* Logout */}
      <View className="px-6 mt-6">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-600 py-3 rounded-xl"
        >
          <Text className="text-white text-center font-bold text-base">Keluar</Text>
        </TouchableOpacity>
      </View>

      <BottomNavbar />
    </SafeAreaView>
  );
};

export default SettingsAdmin;
