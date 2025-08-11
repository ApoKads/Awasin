import React from "react";
import { View, Text, Image, Pressable, Modal } from "react-native";
import { useRouter } from "expo-router"; // kalau pakai expo-router

const AlertCustom = ({
  visible,
  onClose,
  title = "Ay ay Captain!",
  message = "Kerusakan berhasil dilaporkan, Tim kami akan segera meninjau laporan Anda.",
  buttonText = "Lanjut",
  redirectTo = "/postPage",
}) => {
  const router = useRouter();

  const handlePress = () => {
    onClose(); // tutup modal dulu
    router.replace(redirectTo); // pindah halaman
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 pb-10 w-2/3 items-center">
          <Image
            source={require("../../assets/helmet.jpg")} // ganti sesuai path ikon helm
            className="w-[100] h-[100] mb-4"
            resizeMode="contain"
          />
          <Text className="text-green-600 text-xl mb-2 font-poppins-bold">{title}</Text>
          <Text className="text-center text-gray-700 mb-6 text-sm font-poppins">{message}</Text>
          <Pressable
            className="bg-green-600 px-6 py-2 rounded-full"
            onPress={handlePress}
          >
            <Text className="text-white font-poppins-semibold">{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AlertCustom;
