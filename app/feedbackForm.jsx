import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import UploadImage from "./components/UploadImage";
import { router, useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlertCustom from "./components/alertCustom";

const FeedbackForm = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState({
    title: "",
    desc: "",
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
    if (validateForm()) {
      setShowAlert(true);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: insets.top }}>
      <View className="flex-1 items-center">
        <AlertCustom
          visible={showAlert}
          onClose={() => setShowAlert(false)}
          title="Siap Tuan Muda!"
          message="Feedback berhasil dikirimkan, Terima kasih sudah peduli dengan fasilitas umum!"
          buttonText="Mengerti"
          redirectTo="/postPage"
        />

        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-4 top-4 p-2 rounded-full z-50"
        >
          <Image
            source={require("../assets/icons/vectorart-backblue.png")}
            className="w-[30] h-[30]"
          />
        </TouchableOpacity>

        <Text className="text-3xl text-gray-800 font-bold mt-12 mb-[10] font-poppins-bold">
          Balas Laporan
        </Text>

        <View className="flex-1 items-center w-[90%] p-[5%] rounded-lg mb-[10]">
          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] mb-[20] font-poppins"
            placeholder="Title"
            placeholderTextColor="#A0AEC0"
            value={form.title}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, title: text }))
            }
          />

          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full h-[100] mb-5 font-poppins"
            placeholder="Description"
            placeholderTextColor="#A0AEC0"
            multiline
            textAlignVertical="top"
            value={form.desc}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, desc: text }))
            }
          />

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

export default FeedbackForm;
