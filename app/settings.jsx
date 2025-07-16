import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavbar from './components/BottomNavbar';

export default function SettingScreen() {
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
            console.log("User logged out");
            router.replace('/login');
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-4">
        {/* Akun */}
        <Text className="text-xl font-bold mb-4">Akun</Text>

        <TouchableOpacity
          onPress={() => router.push('/editProfile')}
          className="flex-row items-center justify-between mb-4"
        >
          <View className="flex-row items-center space-x-3">
            <Image
              source={require('../assets/default-avatar.jpg')}
              className="w-14 h-14 rounded-full"
            />
            <View>
              <Text className="text-lg font-semibold ml-5">Nama User</Text>
              <Text className="text-sm text-gray-600 ml-5">Informasi Pribadi</Text>
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
          className="flex-row items-center justify-between mb-4"
        >
          <View className="flex-row items-center space-x-3">
            <View className="w-12 h-12 rounded-full bg-[#102E4A] items-center justify-center">
              <Image
                source={require('../assets/icons/vectorart-history.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
            <Text className="text-lg font-medium ml-5">Riwayat</Text>
          </View>
          <Text className="text-2xl text-gray-500">{'>'}</Text>
        </TouchableOpacity>

        {/* Kontak Kami */}
        <TouchableOpacity
          onPress={() => router.push('/contactUs')}
          className="flex-row items-center justify-between mb-4"
        >
          <View className="flex-row items-center space-x-3">
            <View className="w-12 h-12 rounded-full bg-[#102E4A] items-center justify-center">
              <Image
                source={require('../assets/icons/vectorart-phone.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
            <Text className="text-lg font-medium ml-5">Kontak Kami</Text>
          </View>
          <Text className="text-2xl text-gray-500">{'>'}</Text>
        </TouchableOpacity>

        {/* FAQ */}
        <TouchableOpacity
          onPress={() => router.push('/faq')}
          className="flex-row items-center justify-between mb-4"
        >
          <View className="flex-row items-center space-x-3">
            <View className="w-12 h-12 rounded-full bg-[#102E4A] items-center justify-center">
              <Image
                source={require('../assets/icons/vectorart-message.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
            <Text className="text-lg font-medium ml-5">FAQ</Text>
          </View>
          <Text className="text-2xl text-gray-500">{'>'}</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-600 py-3 rounded-xl mt-10"
        >
          <Text className="text-white text-center font-bold text-base">Keluar</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}
