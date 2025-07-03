import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  SafeAreaView,
} from "react-native";
import UploadImage from "./components/UploadImage";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useLocalSearchParams, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

const LaporanForm = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    type: "",
    location: "",
    images: [],
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const { title, desc, type, images, latitude, longitude, address } = params;

    if (title || desc || type || images || latitude || longitude || address) {
      setForm((prevForm) => ({
        ...prevForm,
        title: title || prevForm.title,
        desc: desc || prevForm.desc,
        type: type || prevForm.type,
        images: images ? JSON.parse(images) : prevForm.images,
        latitude: latitude ? parseFloat(latitude) : prevForm.latitude,
        longitude: longitude ? parseFloat(longitude) : prevForm.longitude,
        location: address || prevForm.location,
      }));
    }
  }, [
    params.title,
    params.desc,
    params.type,
    params.images,
    params.latitude,
    params.longitude,
    params.address,
  ]);

  const handleLocation = () => {
    router.push({
      pathname: "/maps",
      params: {
        ...form,
        images: JSON.stringify(form.images),
      },
    });
  };

  const validateForm = () => {
    if (!form.title || !form.desc || form.images.length === 0) {
      Alert.alert("Error", "Semua field harus diisi");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert("Success", "Form submitted successfully!");
      router.replace("/news");
    }
  };

  return (
    <SafeAreaView className="flex flex-1">
      <View className="flex flex-1 items-center pt-[80]">
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ top: insets.top + 8 }} // safe area + sedikit jarak
          className="absolute left-4 bg-black/50 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-3xl text-gray-800 font-bold mb-[40] font-poppins-bold">
          Buat Laporan
        </Text>
        <View className="flex-1 items-center w-[90%] px-[5%] rounded-lg mb-[10]">
          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] text-[1rem] mb-[20] font-poppins"
            placeholder="Title"
            placeholderTextColor="#A0AEC0"
            value={form.title}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, title: text }))
            }
          />

          <View className="border border-gray-400 rounded-lg w-full mb-[20]">
            <RNPickerSelect
              onValueChange={(value) =>
                setForm((prevForm) => ({ ...prevForm, type: value }))
              }
              value={form.type}
              items={[
                { label: "Jalanan", value: "jalanan" },
                { label: "Gedung", value: "gedung" },
                { label: "Taman", value: "taman" },
                { label: "Lainnya", value: "lainnya" },
              ]}
              placeholder={{ label: "Pilih Bahasa Pemrograman", value: "" }}
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: "#4A5568",
                  paddingHorizontal: 10,
                },
                inputAndroid: {
                  fontSize: 16,
                  color: "#4A5568",
                  paddingHorizontal: 10,
                },
              }}
            />
          </View>

          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] mb-[25] font-poppins"
            placeholder="Description"
            placeholderTextColor="#A0AEC0"
            multiline
            numberOfLines={5}
            value={form.desc}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, desc: text }))
            }
          />

          <TouchableOpacity
            className="flex flex-row justify-between items-center w-full mb-5"
            onPress={handleLocation}
          >
            <View>
              <Text className="text-md text-black font-poppins">
                Tambah Lokasi
              </Text>
            </View>
            <View className="flex justify-center items-center w-[35] h-[35] rounded-md bg-[#102E4A]">
              <Text className="text-white">a</Text>
            </View>
          </TouchableOpacity>

          {form.location && (
            <Text className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] mb-[25] font-poppins">
              {form.location}
            </Text>
          )}

          <UploadImage images={form.images} setForm={setForm} />

          <TouchableOpacity
            className="rounded-lg bg-[#102E4A] py-3 w-full"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-poppins-bold">
              Submit Form
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LaporanForm;
