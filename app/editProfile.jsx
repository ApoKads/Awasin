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
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    username: '',
    email: '',
    dob: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const pickImage = async () => {
    // Minta izin
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Izin diperlukan untuk mengakses galeri');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    Alert.alert("Data berhasil disimpan");
    console.log(form);
  };

  return (
  <ImageBackground
    source={require('../assets/Background.png')} // Ganti path sesuai nama file kamu
    resizeMode="cover"
    className="flex-1"
  >
    <ScrollView className="bg-white/80 px-6 pt-12">
    <TouchableOpacity className="-ml-2 mt-5 mb-5" onPress={() => navigation.navigate("settings")}>
                  <Image
                        source={require("../assets/icons/vectorart-backblue.png")}
                        style={{ width: 30, height: 30 }}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                </TouchableOpacity>
      <TouchableOpacity onPress={pickImage} className="items-center mb-4">
        <Image
          source={
            image
              ? { uri: image }
              : require('../assets/default-avatar.jpg')
          }
          className="w-28 h-28 rounded-full"
        />
        <Text className="text-base font-poppins text-gray-700 mt-2">Ubah Foto</Text>
      </TouchableOpacity>

      {/** Input Fields */}
      <View className="gap-2 mb-8">
        <TextInput
          placeholder="Username"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          value={form.username}
          onChangeText={(text) => handleChange('username', text)}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          placeholder="Tanggal Lahir"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          value={form.dob}
          onChangeText={(text) => handleChange('dob', text)}
        />
        <TextInput
          placeholder="Kota"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          value={form.city}
          onChangeText={(text) => handleChange('city', text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        <TextInput
          placeholder="Konfirmasi password"
          secureTextEntry
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-lg"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="w-full p-3 bg-[#102E4A] rounded-lg items-center mb-4 mt-5"
      >
        <Text className="text-white text-lg font-poppins-medium">Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  </ImageBackground>
);
}
