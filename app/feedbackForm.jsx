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
import { useNavigation } from "expo-router";

const FeedbackForm = () => {
  const navigation = useNavigation();
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
    if(validateForm()){
      Alert.alert("Success", "Form submitted successfully!");
      navigation.navigate("/");
    }
  };

  return (
    <SafeAreaView className="flex flex-1">
      <View className="flex flex-1 items-center pt-[80]">
        <Text className="text-3xl text-gray-800 font-bold mb-[20] font-poppins-bold">
          Balas Laporan
        </Text>
        <View className="flex-1 items-center w-[90%] p-[5%] rounded-lg mb-[10]">
          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] mb-[20] font-poppins"
            placeholder="Title"
            value={form.title}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, title: text }))
            }
          />

          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] mb-[25] font-poppins"
            placeholder="Description"
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
            onPress={handleSubmit}>
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
