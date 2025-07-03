import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native"; // Tambahkan Dimensions

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window"); // Tetap gunakan ini jika perlu untuk layout responsif
const carouselImages = [
  require("../assets/berita1.png"),
  require("../assets/berita2.png"),
  require("../assets/berita3.png"),
];

const PostDetail = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [status, setStatus] = useState("Diproses");

  // Fungsi untuk mengubah warna berdasarkan status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Belum":
        return "bg-red-200 text-red-800";
      case "Diproses":
        return "bg-yellow-200 text-yellow-800";
      case "Beres":
        return "bg-green-200 text-green-800";
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Belum":
        return "#b91c1c";
      case "Diproses":
        return "#92400e";
      case "Beres":
        return "#166534";
      default:
        return "#92400e";
    }
  };
  return (
    <ScrollView className="flex-1 p-6 pt-10 font-poppins">
      <TouchableOpacity className="-ml-2" onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="#000000" />
      </TouchableOpacity>

      <View className="flex flex-row justify-between items-center mt-4">
        <Text className="py-2 px-4 bg-[#102E4A] text-white rounded-xl font-light">
          Category
        </Text>
        <View
          className={`rounded-xl overflow-hidden ${getStatusStyles(status)}`}
        >
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={{
              height:50,
              width: 150,
              color: getStatusTextColor(status),
              margin: -8,
            }}
            dropdownIconColor={getStatusTextColor(status)}
          >
            <Picker.Item label="Belum" value="Belum" />
            <Picker.Item label="Diproses" value="Diproses" />
            <Picker.Item label="Beres" value="Beres" />
          </Picker>
        </View>
      </View>

      <View className="flex mt-4 gap-2">
        <Text className="font-bold text-3xl text-[#102E4A]">
          Kerusakan Jalan di Jalan Mawar
        </Text>
        <Text className="font-bold text-xl text-[#102E4A] -mt-2">
          May 2, 2025 09.00 AM
        </Text>
        <View className="flex flex-row gap-2 justify-start items-center mb-2">
          <View className="flex w-8 h-8 justify-center items-center bg-[#102E4A] rounded-full">
            <Image
              source={require("../assets/vectorart-profile.png")}
              style={{ width: 24, height: 24 }}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
          <Text>M4ngo</Text>
        </View>
      </View>

      {/* Carousel */}
      <View>
        <FlatList
          data={carouselImages}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item} style={styles.image} resizeMode="cover" />
            </View>
          )}
          style={{ marginTop: 16 }}
          onScroll={(event) => {
            const slide = Math.round(event.nativeEvent.contentOffset.x / width);
            setActiveIndex(slide);
          }}
          scrollEventThrottle={16}
        />
        <View style={styles.dotContainer}>
          {carouselImages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.dotActive]}
            />
          ))}
        </View>
      </View>

      <View className="flex flex-row mt-3 gap-4">
        <View className=" flex flex-row justify-center items-center gap-1">
          <Image
            source={require("../assets/upvote.png")}
            style={{ width: 24, height: 24 }}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className="text-[#102E4A] font-poppins mt-1">
            11,4K upvotes
          </Text>
        </View>
        <View className=" flex flex-row justify-center items-center gap-1">
          <Image
            source={require("../assets/mata.png")}
            style={{ width: 24, height: 24 }}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className="text-[#102E4A] font-poppins mt-1">10,1K seen</Text>
        </View>
      </View>

      <View className="mt-8 gap-4 mb-12">
        <Text className="text-3xl text-[#102E4A] tracking-wide font-poppins-bold">
          Deskripsi
        </Text>
        <Text className="text-justify text-lg">
          Kerusakan parah pada trotoar di sepanjang Jalan Mawar telah menjadi
          ancaman serius bagi pejalan kaki. Banyak bagian trotoar yang retak,
          berlubang dalam, dan permukaannya tidak rata, bahkan ada beberapa
          bagian yang hancur total sehingga menyisakan puing-puing. Kondisi ini
          sangat berbahaya, terutama bagi anak-anak, lansia, dan penyandang
          disabilitas. Beberapa warga telah melaporkan insiden tergelincir dan
          jatuh, yang mengakibatkan luka ringan hingga sedang. Urgent sekali
          dibutuhkan perbaikan menyeluruh untuk memastikan keselamatan dan
          kenyamanan warga yang menggunakan fasilitas umum ini.
        </Text>
      </View>

      <View className="mb-8">
        <Text className="text-3xl text-[#102E4A] tracking-wide font-poppins-bold mb-4">
          Lokasi
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -6.6296,
              longitude: 106.859,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: -6.6296, longitude: 106.859 }} />
          </MapView>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            Jl. Pakuan No.3, Sumur Batu, Kec. Babakan Madang, Kabupaten Bogor,
            Jawa Barat 16810
          </Text>
        </View>
      </View>

      <View className="mt-8 gap-4 mb-28">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-3xl text-[#102E4A] tracking-wide font-poppins-bold">
            Feedback
          </Text>
          <TouchableOpacity className="bg-[#102E4A] px-4 py-1.5 flex justify-center items-center rounded-lg" onPress={() => navigation.navigate('feedbackForm')}>
                          <Text className="font-poppins-semibold text-white ">Tanggapi +</Text>
          </TouchableOpacity>
        </View>

        <View className="w-full h-56 mt-6">
          <Image
            source={require("../assets/feedback.jpg")}
            style={styles.image}
            className="w-full h-full object-cover border-[1px] border-black"
            // resizeMode="contain"
          />
        </View>
        <View className="mb-2">
          <Text className="text-3xl text-[#102E4A] tracking-wide font-poppins-bold mb-2">
            Jalan Sedang Diperbaiki
          </Text>
          <Text className="text-xl text-[#102E4A] tracking-wide font-poppins-bold">
            May 2, 2025 09.00 AM
          </Text>
        </View>

        <Text className="text-justify text-lg">
          Pihak berwenang telah mulai melakukan perbaikan menyeluruh di
          sepanjang Jalan Mawar. Proses pengaspalan ulang dan perbaikan trotoar
          yang sebelumnya rusak kini tengah berlangsung secara bertahap. Alat
          berat dan pekerja lapangan terlihat aktif bekerja untuk meratakan
          permukaan jalan dan mengganti bagian trotoar yang hancur. Warga
          menyambut baik inisiatif ini karena dapat meningkatkan kenyamanan
          serta keselamatan para pejalan kaki, terutama anak-anak, lansia, dan
          penyandang disabilitas. Diharapkan proses ini dapat segera selesai
          agar akses jalan kembali aman dan layak digunakan oleh masyarakat.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1, // Gambar akan mengisi seluruh ruang yang tersedia di dalam parent View
    width: "100%", // Juga bisa ditambahkan untuk memastikan lebar 100%
    height: "100%", // Dan tinggi 100%
  },
  carouselItem: {
    width: width - 56, // agar ada padding sisi kiri-kanan (p-6)
    height: 240,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
  },

  dotContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FFFFFF", // bikin semua dot kelihatan rapi
  },

  dotActive: {
    backgroundColor: "#102E4A",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF", // warna border gelap biar kontras
  },

  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A2E46",
    marginBottom: 10,
  },
  mapContainer: {
    borderRadius: 16,
    overflow: "hidden",
    height: 250,
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addressContainer: {
    backgroundColor: "#1A2E46",
    padding: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  addressText: {
    color: "white",
    fontSize: 13,
    lineHeight: 18,
  },
});

export default PostDetail;
