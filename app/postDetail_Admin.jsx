import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const carouselImages = [
  require("../assets/berita1.png"),
  require("../assets/berita2.png"),
  require("../assets/berita3.png"),
];

// --- NEW: statuses and color maps ---
const statuses = ['Menunggu','Ditinjau','Ditolak','Diproses','Selesai'];
const statusColors = {
  Menunggu: '#EAC1EA',
  Ditinjau: '#AED0FF',
  Ditolak: '#FAD8DD',
  Diproses: '#FFF085',
  Selesai: '#CDF0D7',
};

const fontColors = {
  Menunggu: '#553681',
  Ditinjau: '#33659B',
  Ditolak: '#C77680',
  Diproses: '#7D6630',
  Selesai: '#55B57A',
};
// -----------------------------------------

const PostDetail = () => {
  // upvote state
const [isUpvoted, setIsUpvoted] = useState(false);
// contoh nilai awal, 11400 = 11.4K
const [upvotes, setUpvotes] = useState(11400);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [status, setStatus] = useState("Diproses");

  return (
    <ScrollView className="flex-1 p-6 pt-10 font-poppins">
      <TouchableOpacity className="-ml-2" onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="#000000" />
      </TouchableOpacity>

      <View className="flex flex-row justify-between items-center mt-4">
        <Text className="py-2 px-4 bg-[#102E4A] text-white rounded-xl font-light">
          Category
        </Text>

        {/* Dynamic color wrapper menggunakan inline style */}
        <View
          style={{
            backgroundColor: statusColors[status] || statusColors['Diproses'],
            borderRadius: 16,
            overflow: "hidden",
            paddingLeft: 8,
            paddingRight: 8,
            height: 40, // kunci tinggi wrapper
            justifyContent: "center",
          }}
        >
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={{
              height: 55,        
              width: 150,
              color: fontColors[status] || fontColors['Diproses'],
              paddingLeft: 6,    
              
            }}
            dropdownIconColor={fontColors[status] || fontColors['Diproses']}
          >
            {statuses.map((s) => (
              <Picker.Item key={s} label={s} value={s} />
            ))}
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
              source={require("../assets/icons/vectorart-profile.png")}
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
  <View className="flex flex-row justify-center items-end">
    <TouchableOpacity
      onPress={() => {
        setIsUpvoted(prev => {
          const next = !prev;
          setUpvotes(count => (next ? count + 100 : count - 100));
          return next;
        });
      }}
    >
      <Image
        source={
          isUpvoted
            ? require("../assets/icons/Upvote-birubanget.png")
            : require("../assets/icons/Upvote-WhitebLue.png")
        }
        style={{ 
          width: 30, 
          height: 25,
          opacity: 1 // Pastikan opacity selalu 1
        }}
        resizeMode="contain"
        fadeDuration={0} // Ini yang paling penting - nonaktifkan fade animation
      />
    </TouchableOpacity>

    <Text
      className="text-[#102E4A] font-poppins"
    >
      {/* format 11,4K jika mau, atau tampilkan number */}
      {upvotes >= 1000 ? `${(upvotes / 1000).toFixed(1).replace('.', ',')}K upvotes` : `${upvotes} upvotes`}
    </Text>
  </View>

  <View className="flex flex-row justify-center items-center gap-1">
    <View className="flex w-8 h-8 justify-center items-center">
      <Image
        source={require("../assets/icons/eye-WhiteBlue.png")}
        style={{ width: 35, height: 35 }}
        className="w-6 h-6"
        resizeMode="contain"
      />
    </View>
    <Text className="text-[#102E4A] font-poppins mt-1 ml-2">10,1K seen</Text>
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
    flex: 1,
    width: "100%",
    height: "100%",
  },
  carouselItem: {
    width: width - 56,
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
    borderColor: "#FFFFFF",
  },

  dotActive: {
    backgroundColor: "#102E4A",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
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
