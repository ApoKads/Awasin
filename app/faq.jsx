import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Tambahkan ini

const faqData = [
  {
    question: "Apa itu aplikasi AWASIN?",
    answer: "AWASIN merupakan sebuah aplikasi yang memungkinkan warga Bogor untuk melaporkan kerusakan fasilitas publik seperti jalan, lampu, dan taman langsung ke pihak pemerintah. Aplikasi ini juga menyediakan informasi berita terkini serta fitur upvote laporan agar laporan penting bisa mendapat prioritas."
  },
  {
    question: "Siapa saja yang bisa menggunakan AWASIN?",
    answer: "AWASIN dapat digunakan oleh seluruh warga Bogor yang peduli terhadap kondisi fasilitas umum. Pengguna hanya perlu mengakses aplikasi melalui smartphone."
  },
  {
    question: "Apa saja fitur utama yang tersedia untuk warga",
    answer: "Pelaporan Fasilitas Rusak (Upload laporan dan foto), Bogor News (berita resmi dari pemerintah), Upvote Laporan (memprioritaskan laporan penting), dan Notifikasi Status Laporan."
  },
  {
    question: "Apakah laporan saya akan langsung ditindaklanjuti oleh pemerintah?",
    answer: "Pemerintah akan mendapatkan notifikasi atas laporan yang dikirim dan dapat mengubah statusnya (dalam proses, selesai, dll). Warga juga bisa melihat progres penanganannya secara real-time melalui fitur notifikasi dan status."
  },
  {
    question: "Apa manfaat fitur voting (upvote) dalam laporan?",
    answer: "Fitur upvote membantu menandai laporan mana yang dianggap penting oleh banyak warga. Ini membantu pemerintah menentukan prioritas penanganan berdasarkan tingkat urgensi komunitas."
  }
];

export default function FAQScreen() {
  const router = useRouter(); // Tambahkan ini
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleDropdown = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView className="bg-white/70 px-4 pt-12 pb-10">
        {/* Tombol Back */}
        <TouchableOpacity className="-ml-2 mt-5 mb-5" onPress={() => router.back()}>
          <Image
            source={require("../assets/icons/vectorart-backblue.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text className="text-2xl font-poppins-bold text-center mb-6">FAQ</Text>

        {faqData.map((item, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <View key={index} className="mb-4">
              <TouchableOpacity
                onPress={() => toggleDropdown(index)}
                className={`rounded-xl border px-4 py-3 shadow-sm ${
                  isOpen ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'
                }`}
              >
                <Text className="text-base font-poppins-semibold text-gray-800">{item.question}</Text>
              </TouchableOpacity>

              {isOpen && (
                <View className="bg-blue-50 px-4 py-3 border-l border-r border-b border-blue-800 rounded-b-xl">
                  <Text className="text-gray-700 font-poppins text-sm">{item.answer}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
}
