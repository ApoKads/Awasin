import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router"; // gunakan router dari expo-router

const history = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const router = useRouter(); // inisialisasi router

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    Alert.alert("Pesan terkirim!", "Kami akan segera menghubungi Anda.");
    console.log(form);
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView className="px-6 pt-12 pb-10 bg-white/80">
        {/* Tombol Back */}
        <TouchableOpacity
          className="-ml-2 mt-5 mb-5"
          onPress={() => router.back()}
        >
          <Image
            source={require("../assets/icons/vectorart-backblue.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Judul dan Deskripsi */}
        <Text className="text-2xl font-poppins-bold mb-1">Laporan Anda</Text>

        <View className="mt-4 h-[135px] rounded-xl py-2 bg-white flex border-gray-500 border-[0.25px]">
          <View className="w-[30%] h-[25%] flex justify-center items-center gap-1">
            <Text className="font-poppins text-sm">31 May, 2018</Text>
          </View>

          <View className="flex w-[100%] h-[75%] flex-row">
            <View className="w-[30%]  justify-start items-center">
              <Image
                source={require("../assets/feedback.jpg")}
                className="h-20 w-20 rounded-xl"
                style={{ width: 85, height: 85 }}
              />
            </View>
            <View className="w-[70%] flex flex-col justify-start">
              <Text className="font-poppins-semibold text-2xl">Judul</Text>

              <View className="w-28 flex justify-center items-center px-4 py-2 bg-yellow-200 rounded-3xl mt-2">
                <Text className="text-yellow-700 font-poppins-semibold">
                  Proses
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 h-[135px] rounded-xl py-2 bg-white flex border-gray-500 border-[0.25px]">
          <View className="w-[30%] h-[25%] flex justify-center items-center gap-1">
            <Text className="font-poppins text-sm">31 May, 2018</Text>
          </View>

          <View className="flex w-[100%] h-[75%] flex-row">
            <View className="w-[30%]  justify-start items-center">
              <Image
                source={require("../assets/feedback.jpg")}
                className="h-20 w-20 rounded-xl"
                style={{ width: 85, height: 85 }}
              />
            </View>
            <View className="w-[70%] flex flex-col justify-start">
              <Text className="font-poppins-semibold text-2xl">Judul</Text>

              <View className="w-28 flex justify-center items-center px-4 py-2 bg-red-200 rounded-3xl mt-2">
                <Text className="text-red-700 font-poppins-semibold">
                  Cancel
                </Text>
              </View>
            </View>
          </View>
        </View>


        <View className="mt-4 h-[135px] rounded-xl py-2 bg-white flex border-gray-500 border-[0.25px]">
          <View className="w-[30%] h-[25%] flex justify-center items-center gap-1">
            <Text className="font-poppins text-sm">31 May, 2018</Text>
          </View>

          <View className="flex w-[100%] h-[75%] flex-row">
            <View className="w-[30%]  justify-start items-center">
              <Image
                source={require("../assets/feedback.jpg")}
                className="h-20 w-20 rounded-xl"
                style={{ width: 85, height: 85 }}
              />
            </View>
            <View className="w-[70%] flex flex-col justify-start">
              <Text className="font-poppins-semibold text-2xl">Judul</Text>

              <View className="w-28 flex justify-center items-center px-4 py-2 bg-green-200 rounded-3xl mt-2">
                <Text className="text-green-700 font-poppins-semibold">
                  Selesai
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 h-[135px] rounded-xl py-2 bg-white flex border-gray-500 border-[0.25px]">
          <View className="w-[30%] h-[25%] flex justify-center items-center gap-1">
            <Text className="font-poppins text-sm">31 May, 2018</Text>
          </View>

          <View className="flex w-[100%] h-[75%] flex-row">
            <View className="w-[30%]  justify-start items-center">
              <Image
                source={require("../assets/feedback.jpg")}
                className="h-20 w-20 rounded-xl"
                style={{ width: 85, height: 85 }}
              />
            </View>
            <View className="w-[70%] flex flex-col justify-start">
              <Text className="font-poppins-semibold text-2xl">Judul</Text>

              <View className="w-28 flex justify-center items-center px-4 py-2 bg-green-200 rounded-3xl mt-2">
                <Text className="text-green-700 font-poppins-semibold">
                  Selesai
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 h-[135px] rounded-xl py-2 bg-white flex border-gray-500 border-[0.25px]">
          <View className="w-[30%] h-[25%] flex justify-center items-center gap-1">
            <Text className="font-poppins text-sm">31 May, 2018</Text>
          </View>

          <View className="flex w-[100%] h-[75%] flex-row">
            <View className="w-[30%]  justify-start items-center">
              <Image
                source={require("../assets/feedback.jpg")}
                className="h-20 w-20 rounded-xl"
                style={{ width: 85, height: 85 }}
              />
            </View>
            <View className="w-[70%] flex flex-col justify-start">
              <Text className="font-poppins-semibold text-2xl">Judul</Text>

              <View className="w-28 flex justify-center items-center px-4 py-2 bg-green-200 rounded-3xl mt-2">
                <Text className="text-green-700 font-poppins-semibold">
                  Selesai
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 h-[135px] rounded-xl py-2 bg-white flex border-gray-500 border-[0.25px]">
          <View className="w-[30%] h-[25%] flex justify-center items-center gap-1">
            <Text className="font-poppins text-sm">31 May, 2018</Text>
          </View>

          <View className="flex w-[100%] h-[75%] flex-row">
            <View className="w-[30%]  justify-start items-center">
              <Image
                source={require("../assets/feedback.jpg")}
                className="h-20 w-20 rounded-xl"
                style={{ width: 85, height: 85 }}
              />
            </View>
            <View className="w-[70%] flex flex-col justify-start">
              <Text className="font-poppins-semibold text-2xl">Judul</Text>

              <View className="w-28 flex justify-center items-center px-4 py-2 bg-green-200 rounded-3xl mt-2">
                <Text className="text-green-700 font-poppins-semibold">
                  Selesai
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full h-[200px]"></View>
      </ScrollView>
    </ImageBackground>
  );
};

export default history;
