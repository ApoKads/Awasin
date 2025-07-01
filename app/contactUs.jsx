import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ImageBackground
} from 'react-native';

export default function ContactUsScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    Alert.alert("Pesan terkirim!", "Kami akan segera menghubungi Anda.");
    console.log(form);
  };

  return (
    <ImageBackground
      source={require('../assets/Background.png')} // Ganti sesuai gambar background kamu
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView className="px-6 pt-12 pb-10 bg-white/80">
        {/* Judul dan Deskripsi */}
        <Text className="text-2xl font-bold mb-1">Kontak Kami</Text>
        <Text className="text-gray-700 mb-5">
          Silakan hubungi kami jika Anda membutuhkan bantuan
        </Text>

        {/* Info Kontak */}
        <View className="gap-4 mb-8">
          {/* Email */}
          <View className="flex-row items-start gap-2">
            <Image
              source={require('../assets/default-avatar.jpg')}
              className="w-5 h-5 mt-1"
            />
            <View>
              <Text className="font-semibold">E-mail</Text>
              <Text className="text-gray-700">awasin@gmail.com</Text>
            </View>
          </View>

          {/* Telepon */}
          <View className="flex-row items-start gap-2">
            <Image
              source={require('../assets/default-avatar.jpg')}
              className="w-5 h-5 mt-1"
            />
            <View>
              <Text className="font-semibold">Nomor Telepon</Text>
              <Text className="text-gray-700">08123456789</Text>
            </View>
          </View>

          {/* Alamat */}
          <View className="flex-row items-start gap-2">
            <Image
              source={require('../assets/default-avatar.jpg')}
              className="w-5 h-5 mt-1"
            />
            <View className="flex-1">
              <Text className="font-semibold">Alamat</Text>
              <Text className="text-gray-700">
                Sentul City, Jl. Pakuan No.3, Sumur Batu, Babakan Madang, Bogor Regency, West Java 16810
              </Text>
            </View>
          </View>
        </View>

        {/* Form Input */}
        <View className="gap-4 mb-6">
          <TextInput
            placeholder="Nama"
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 text-base"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            placeholder="Email"
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 text-base"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          <TextInput
            placeholder="Nomor Telepon"
            keyboardType="phone-pad"
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 text-base"
            value={form.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />
          <TextInput
            placeholder="Pesan"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 text-base h-32"
            value={form.message}
            onChangeText={(text) => handleChange('message', text)}
          />
        </View>

        {/* Tombol Kirim */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#102E4A] py-3 rounded-lg items-center"
        >
          <Text className="text-white text-lg font-semibold">Kirim</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
