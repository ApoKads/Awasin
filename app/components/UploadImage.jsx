import React, { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, FlatList, TouchableOpacity, Text } from 'react-native';


const UploadImage = ({images, setForm}) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleAddImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setForm((prevForm) => ({
          ...prevForm,
          images: [...prevForm.images, result.assets[0].uri],
        }));
      }
    };
  
    const handleRemoveImage = (uri) => {
      setForm((prevForm) => ({
        ...prevForm,
        images: prevForm.images.filter((imageUri) => imageUri !== uri),
      }));
    };

  return (
    <View className="w-full items-center">
      <TouchableOpacity
        className="flex flex-row justify-between items-center w-full mb-3"
        onPress={handleAddImage}
      >
        <View className="flex flex-row items-center gap-[10] w-[200]">
          <Image 
            source={require("../../assets/icons/vectorart-uploadimageblue.png")}
            className="w-[40] h-[40]"
          />
          <View>
            <Text className="text-md text-black font-poppins">Tambah Gambar</Text>
          </View>
        </View>
        <View className="flex justify-center items-center w-[35] h-[35] rounded-md bg-[#102E4A]">
          <Image 
            source={require('../../assets/icons/vectorart-panahwhite.png')}
            className="w-[10] h-[10]"
          />
        </View>
      </TouchableOpacity>
      
      <View className="flex justify-center w-full mb-[30]">
        <FlatList
          data={images}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          className="flex-grow-0"
          renderItem={({ item }) => (
            <View className="relative mr-4">
              <Image
                source={{ uri: item }}
                className="w-[150] h-[150] rounded-lg"
              />
              <TouchableOpacity
                className="absolute top-3 right-3 bg-red-500 rounded-full flex justify-center items-center w-[30] h-[30]"
                onPress={() => handleRemoveImage(item)}
              >
                <Text className="text-white font-bold">X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default UploadImage