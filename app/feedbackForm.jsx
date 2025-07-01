import React, { useState } from 'react';
import { View, TextInput, Button, Image, FlatList, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UploadImage from './components/UploadImage';

export default function FeedbackForm() {
  const [form, setForm] = useState({
    title: '',
    desc: '',
    images: [],
  });
  
  const halo = () => {
    console.log(form)
  }

  return (
    <SafeAreaView className="flex flex-1">
      <View className="flex flex-1 items-center pt-[100]">
        <Text className="text-[2.5rem] text-black font-bold mb-[20] font-poppins-bold">Balas Laporan</Text>
        <View className="flex items-center w-[90%] p-[5%] rounded-lg mb-[10]">
          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full mb-[20] font-poppins"
            placeholder="Title"
            value={form.title}
            onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, title: text }))}
          />
          
          <TextInput
            className="border border-gray-400 rounded-md px-4 py-2 w-full mb-[25] font-poppins"
            placeholder="Description"
            multiline
            numberOfLines={5}
            value={form.desc}
            onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, desc: text }))}
          />

          <UploadImage images={form.images} setForm={setForm}></UploadImage>

          <TouchableOpacity 
            className="rounded-lg bg-[#102E4A] py-3 w-full"
            onPress={halo}>
            <Text className="text-white text-center font-poppins-bold">Submit Form</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>

  );
}