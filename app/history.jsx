import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router"; // gunakan router dari expo-router


  const statuses = ["Menunggu", "Ditinjau", "Ditolak", "Diproses", "Selesai"];
  const statusColors = {
  Menunggu: "#EAC1EA",
  Ditinjau: "#AED0FF",
  Ditolak: "#FAD8DD",
  Diproses: "#FFF085",
  Selesai: "#CDF0D7",
};

const fontColors = {
  Menunggu: "#553681",
  Ditinjau: "#33659B",
  Ditolak: "#C77680",
  Diproses: "#7D6630",
  Selesai: "#55B57A",
};
const reports = [
  {
    id: 1,
    title: "Lampu Jalan Mati",
    date: "21 Jul, 2025",
    status: "Menunggu",
    image: require("../assets/feedback.jpg"),
  },
  {
    id: 2,
    title: "Sampah Menumpuk",
    date: "20 Jul, 2025",
    status: "Ditinjau",
    image: require("../assets/feedback.jpg"),
  },
  {
    id: 3,
    title: "Kebocoran Pipa",
    date: "19 Jul, 2025",
    status: "Diproses",
    image: require("../assets/feedback.jpg"),
  },
  {
    id: 4,
    title: "Jalan Berlubang",
    date: "17 Jul, 2025",
    status: "Ditolak",
    image: require("../assets/feedback.jpg"),
  },
  {
    id: 5,
    title: "Pohon Tumbang",
    date: "15 Sep, 2025",
    status: "Selesai",
    image: require("../assets/feedback.jpg"),
  },
];

const ReportCard = ({ report }) => {
  return (
    <View className="mt-4 rounded-xl py-2 bg-white flex border-gray-500 border-[0.25px] h-40">
      <View className="px-7">
        <Text className="font-poppins text-sm text-gray-500 mb-2">
          {report.date}
        </Text>
      </View>
      <View className="flex-row px-4">
        <View className="w-[30%] justify-start items-center">
          <Image
            source={report.image}
            className="rounded-xl"
            style={{ width: 85, height: 85 }}
          />
        </View>
        <View className="w-[70%] flex-col justify-start px-2">
          <Text className="font-poppins-semibold text-lg">{report.title}</Text>
          <View
            className="w-fit px-4 py-1 rounded-3xl mt-2 self-start"
            style={{
              backgroundColor: statusColors[report.status],
            }}
          >
            <Text
              className="font-poppins-semibold text-sm"
              style={{
                color: fontColors[report.status],
              }}
            >
              {report.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const history = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const router = useRouter(); // inisialisasi router

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    Alert.alert("Pesan terkirim!", "Kami akan segera menghubungi Anda.");
    console.log(form);
  };



  
  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView className="px-6 pt-12 pb-10 bg-white/80">
        {/* Tombol Back */}
        <TouchableOpacity
          className="-ml-2 mt-5 mb-5"
          onPress={() => router.back()}
        >
          <Image
            source={require("../assets/icons/vectorart-backblue.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Judul dan Deskripsi */}
        <Text className="text-2xl font-poppins-bold mb-1">Laporan Anda</Text>

         {/* Render laporan berdasarkan kategori status */}
        {statuses.map((status) => {
          const filtered = reports.filter((r) => r.status === status);
          if (filtered.length === 0) return null;

          return (
            <View key={status} className="">
              {/* <Text className="text-xl font-poppins-semibold mb-2">{status}</Text> */}
              {filtered.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </View>
          );
        })}

        <View className="w-full h-[200px]"></View>
      </ScrollView>
    </ImageBackground>
  );
};

export default history;
