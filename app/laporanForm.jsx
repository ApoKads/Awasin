import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import UploadImage from "./components/UploadImage";
import RNPickerSelect from "react-native-picker-select";

const LaporanForm = () => {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    type: "",
    location: "",
    images: [],
  });

  const validateForm = () => {
    if (!form.title || !form.desc || form.images.length == 0) {
      Alert.alert("Error", "Semua field harus diisi");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if(validateForm()){
      Alert.alert("Success", "Form submitted successfully!");
      navigation.navigate("/");
    }
  };

  return (
    <SafeAreaView className="flex flex-1">
      <View className="flex flex-1 items-center pt-[80]">
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

          <UploadImage
            images={form.images}
            setForm={setForm}
          />

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
