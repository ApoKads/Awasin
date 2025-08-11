import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const options = {
  headerShown: false,
};

const DetailNewsAdmin = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isOptionsMenuVisible, setOptionsMenuVisible] = useState(false);

  const handleEditNews = () => {
    setOptionsMenuVisible(false);
    // Arahkan ke halaman edit
    router.push("/formNews");
  };

  const handleDeleteNews = () => {
    setOptionsMenuVisible(false);
    Alert.alert("Hapus Berita?", "Aksi ini tidak bisa dibatalkan.", [
      { text: "Batal" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          Alert.alert("Berhasil", "Berita telah dihapus", [
            {
              text: "OK",
              onPress: () => {
                router.replace("/newsPemerintah");
              },
            },
          ]);
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-black">
      {/* Gambar Berita */}
      <View style={{ width, height: 300 }} className="relative">
        <Image
          source={require("../assets/berita1.png")}
          style={{ width, height: "100%" }}
          resizeMode="cover"
        />

        {/* Tombol Back */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ top: insets.top + 8 }}
          className="absolute left-4 bg-black/50 p-2 rounded-full"
        >
          <Image
            source={require("../assets/icons/vectorart-back.png")}
            className="w-[30] h-[30]"
          />
        </TouchableOpacity>

        {/* Tombol Menu */}
        <TouchableOpacity
          onPress={() => setOptionsMenuVisible(true)}
          style={{ top: insets.top + 8 }}
          className="absolute right-4 bg-black/50 p-2 rounded-full"
        >
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>

        {/* Modal Opsi */}
        <Modal
          transparent
          visible={isOptionsMenuVisible}
          animationType="fade"
          onRequestClose={() => setOptionsMenuVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setOptionsMenuVisible(false)}
          >
            <View className="flex-1 bg-black/20">
              <View
                className="absolute bg-white rounded-lg shadow-xl w-60"
                style={{ top: insets.top + 50, right: 16 }}
              >
                <TouchableOpacity
                  className="flex-row items-center p-3 border-b border-gray-100"
                  onPress={handleEditNews}
                >
                  <Text className="text-base text-gray-700">Edit Berita</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center p-3"
                  onPress={handleDeleteNews}
                >
                  <Text className="text-base text-red-500">Hapus Berita</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Info Berita */}
        <View className="absolute bottom-6 left-4 right-4 gap-2">
          <Text className="bg-[#6B9EBD] text-white px-3 py-1 rounded-xl self-start mb-1 text-sm font-poppins-bold">
            Category
          </Text>
          <Text className="text-white font-poppins-bold text-2xl">
            Bogor diserang akatsuki, Siapa yang akan menjadi pahlawan?
          </Text>
          <Text className="text-gray-200 font-poppins-medium mb-4">
            May 2, 2025 09.00 AM
          </Text>
        </View>
      </View>

      {/* Konten Berita */}
      <View className="bg-white mt-[-20px] rounded-t-3xl p-6">
        <Text className="text-gray-800 font-poppins-medium leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure quae
          ullam cumque libero, blanditiis dolore perspiciatis quia, eaque ex
          temporibus maxime qui eos quisquam voluptatibus expedita dolores
          reiciendis atque! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ea iure quae ullam cumque libero, blanditiis dolore perspiciatis
          quia, eaque ex temporibus maxime qui eos quisquam voluptatibus
          expedita dolores reiciendis atque!
        </Text>
        <Text className="text-gray-800 font-poppins-medium leading-relaxed mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure quae
          ullam cumque libero, blanditiis dolore perspiciatis quia, eaque ex
          temporibus maxime qui eos quisquam voluptatibus expedita dolores
          reiciendis atque!
        </Text>
        <Text className="text-gray-800 font-poppins-medium leading-relaxed mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure quae
          ullam cumque libero, blanditiis dolore perspiciatis quia, eaque ex
          temporibus maxime qui eos quisquam voluptatibus expedita dolores
          reiciendis atque!
        </Text>
        <Text className="text-gray-800 font-poppins-medium leading-relaxed mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure quae
          ullam cumque libero, blanditiis dolore perspiciatis quia, eaque ex
          temporibus maxime qui eos quisquam voluptatibus expedita dolores
          reiciendis atque!
        </Text>
        <Text className="text-gray-800 font-poppins-medium leading-relaxed mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure quae
          ullam cumque libero, blanditiis dolore perspiciatis quia, eaque ex
          temporibus maxime qui eos quisquam voluptatibus expedita dolores
          reiciendis atque!
        </Text>
        <Text className="text-gray-800 font-poppins-medium leading-relaxed mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure quae
          ullam cumque libero, blanditiis dolore perspiciatis quia, eaque ex
          temporibus maxime qui eos quisquam voluptatibus expedita dolores
          reiciendis atque!
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailNewsAdmin;
