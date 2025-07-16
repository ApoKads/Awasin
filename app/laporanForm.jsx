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
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const LaporanForm = () => {
  const params = useLocalSearchParams();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    type: "",
    location: "",
    customType: "",
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
    if (!form.title || !form.desc || form.images.length === 0 || !form.type) {
      Alert.alert("Error", "Semua field harus diisi");
      return false;
    }
    if(form.type === "lainnya" && !form.customType ){
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center px-6 pt-4">
        {/* Tombol Back */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-4 top-4 bg-black/50 p-2 rounded-full z-50"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-3xl text-gray-800 font-bold mb-10 mt-12 font-poppins-bold">
          Buat Laporan
        </Text>

        <View className="w-full flex-1">
          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] text-[1rem] mb-5 font-poppins"
            placeholder="Title"
            placeholderTextColor="#A0AEC0"
            value={form.title}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, title: text }))
            }
          />

          <View className="border border-gray-400 rounded-lg w-full mb-5">
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
              placeholder={{ label: "Pilih Jenis", value: "" }}
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: "#4A5568",
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                },
                inputAndroid: {
                  fontSize: 16,
                  color: "#4A5568",
                  paddingHorizontal: 10,
                },
              }}
            />
          </View>
          {form.type === "lainnya" && (
            <TextInput
              className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] text-[1rem] mb-5 font-poppins"
              placeholder="Tulis jenis fasilitas lainnya"
              placeholderTextColor="#A0AEC0"
              value={form.customType}
              onChangeText={(text) =>
                setForm((prevForm) => ({ ...prevForm, customType: text }))
              }
            />
          )}


          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full h-[100] mb-5 font-poppins"
            placeholder="Description"
            placeholderTextColor="#A0AEC0"
            multiline
            value={form.desc}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, desc: text }))
            }
          />

          <TouchableOpacity
            className="flex flex-row justify-between items-center w-full mb-5"
            onPress={handleLocation}
          >
            <Text className="text-md text-black font-poppins">Tambah Lokasi</Text>
            <View className="flex justify-center items-center w-[35] h-[35] rounded-md bg-[#102E4A]">
              <Text className="text-white font-bold">+</Text>
            </View>
          </TouchableOpacity>

          {form.location && (
            <Text className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] mb-5 font-poppins">
              {form.location}
            </Text>
          )}

          <UploadImage images={form.images} setForm={setForm} />

          <TouchableOpacity
            className="rounded-lg bg-[#102E4A] py-3 w-full mt-6"
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
