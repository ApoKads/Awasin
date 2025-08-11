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
                    source={require("../assets/berita4.jpg")}
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
                        Politik
                    </Text>
                    <Text className="text-white font-poppins-bold text-2xl">
                        Bogor Rayakan Ulang Tahun dengan Pesta Meriah, Pejabat dan Warga Tumpah Ruah di Alun-Alun
                    </Text>
                    <Text className="text-gray-200 font-poppins-medium mb-4">
                        May 2, 2025 09.00 AM
                    </Text>
                </View>
            </View>

            <View className="bg-white mt-[-20px] rounded-t-3xl p-6">
                <Text className="text-gray-800 font-poppins-medium leading-relaxed">
                    Bogor, 11 Agustus 2025 – Kota Hujan hari ini berubah menjadi kota pesta. Ulang tahun Bogor yang ke-XXX dirayakan dengan gegap gempita sejak pagi, menampilkan parade budaya, karnaval bunga, dan pesta rakyat yang membuat pusat kota dipenuhi warna-warni kemeriahan.
                </Text>
                <Text className="text-gray-800 font-poppins-medium leading-relaxed mt-4">
                    Sejak pukul 07.00, ratusan penari tradisional berlenggak-lenggok di Jalan Juanda, disusul iring-iringan kendaraan hias bertema “Bogor Bersinar”. Warga yang memadati trotoar tak henti-hentinya bersorak, sementara anak-anak berebut balon dan bendera kecil yang dibagikan panitia.
                </Text>
                <Text className="text-gray-800 font-poppins-medium leading-relaxed mt-4">
                    Puncak acara berlangsung di Alun-Alun Bogor, di mana para pejabat daerah, tokoh masyarakat, hingga selebritas lokal turut hadir. Tenda VIP megah berdiri di sisi panggung utama, lengkap dengan hidangan prasmanan mewah yang menyajikan kuliner khas Nusantara dan hidangan modern. Senyum lebar dan tawa para pejabat terlihat jelas saat mereka bergantian memberikan sambutan dan berfoto bersama di tengah kilatan kamera.
                </Text>
                <Text className="text-gray-800 font-poppins-medium leading-relaxed mt-4">
                    Menjelang malam, pesta kembang api selama 15 menit menerangi langit Bogor, menandai berakhirnya perayaan hari jadi kota ini. Warga pun pulang dengan wajah gembira, membawa cerita tentang kemeriahan yang jarang terjadi.
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
