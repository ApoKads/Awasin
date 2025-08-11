import React, { useState } from "react";
import { router, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
const reportsData = [
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

// fungsi edit yang sudah ada
const handleEdit = (report) => {
  router.push({
    pathname: "/laporanFormEdit",
    params: {
      id: report.id,
      title: report.title,
      desc: "test",
      type: report.type || "Jalanan",
      location: report.location || "Babakan Madang",
      latitude: report.latitude || -6.2,
      longitude: report.longitude || 106.816666,
      images: JSON.stringify(
        report.images || ["../assets/berita1.png", "jalanRusak.png"]
      ),
    },
  });
};

const ReportCard = ({ report, onDelete }) => {
  const [isOptionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuButtonRef = React.useRef(null);

  const handleEditReport = () => {
    setOptionsMenuVisible(false);
    handleEdit(report);
  };

  const handleDeleteReport = () => {
    setOptionsMenuVisible(false);
    Alert.alert(
      "Hapus Laporan?",
      "Aksi ini tidak bisa dibatalkan.",
      [
        { text: "Batal" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => onDelete(report),
        },
      ]
    );
  };

  const openMenu = () => {
    if (menuButtonRef.current) {
      menuButtonRef.current.measureInWindow((x, y, width, height) => {
        setMenuPosition({ top: y + height, right: 16 });
        setOptionsMenuVisible(true);
      });
    }
  };

  return (
    <View className="mt-4 rounded-xl py-2 bg-white border-gray-500 border-[0.25px] pr-2">
      <View className="px-7 flex-row justify-between items-center">
        <Text className="font-poppins text-sm text-gray-500 mb-2">
          {report.date}
        </Text>

        {report.status === "Menunggu" && (
          <TouchableOpacity ref={menuButtonRef} onPress={openMenu}>
            <Ionicons name="ellipsis-vertical" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* isi kartu */}
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

      {/* Modal Opsi */}
      <Modal
        transparent
        visible={isOptionsMenuVisible}
        animationType="fade"
        onRequestClose={() => setOptionsMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOptionsMenuVisible(false)}>
          <View className="flex-1 bg-black/20">
            <View
              className="absolute bg-white rounded-lg shadow-xl w-40"
              style={{ top: menuPosition.top, right: menuPosition.right }}
            >
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={handleEditReport}
              >
                <Text className="text-base text-gray-700">Edit Laporan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center p-3"
                onPress={handleDeleteReport}
              >
                <Text className="text-base text-red-500">Hapus Laporan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};


const history = () => {
  const [reportList, setReportList] = useState(reportsData);
  const router = useRouter();

  const onDelete = (report) => {
    setReportList((prev) => prev.filter((r) => r.id !== report.id));
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

        {/* Judul */}
        <Text className="text-2xl font-poppins-bold mb-1">Laporan Anda</Text>

        {statuses.map((status) => {
          const filtered = reportList.filter((r) => r.status === status);
          if (filtered.length === 0) return null;

          return (
            <View key={status}>
              {filtered.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onDelete={onDelete}
                />
              ))}
            </View>
          );
        })}

        <View className="w-full h-[200px]" />
      </ScrollView>
    </ImageBackground>
  );
};

export default history;
