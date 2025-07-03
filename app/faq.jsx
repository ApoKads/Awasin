import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Data untuk FAQ, disimpan dalam array agar mudah dikelola.
// Untuk konten dengan list, kita bisa langsung menggunakan JSX.
const faqData = [
    {
        id: 1,
        title: 'Apa itu aplikasi AWASIN?',
        content: (
            <Text className="text-white leading-relaxed">
                AWASIN adalah aplikasi yang memungkinkan warga Bogor untuk melaporkan kerusakan fasilitas publik seperti jalan, lampu, dan taman langsung ke pihak pemerintah. Aplikasi ini juga menyediakan informasi berita terkini serta fitur upvote laporan agar laporan penting bisa mendapat prioritas.
            </Text>
        ),
    },
    {
        id: 2,
        title: 'Siapa saja yang bisa menggunakan AWASIN?',
        content: (
            <Text className="text-white leading-relaxed">
                AWASIN dapat digunakan oleh seluruh warga Bogor yang peduli terhadap kondisi fasilitas umum. Pengguna hanya perlu mengakses aplikasi melalui smartphone.
            </Text>
        ),
    },
    {
        id: 3,
        title: 'Apa saja fitur utama yang tersedia untuk warga',
        content: (
            <View>
                <Text className="text-white leading-relaxed mb-2">
                    • Pelaporan Fasilitas Rusak (upload laporan + foto).
                </Text>
                <Text className="text-white leading-relaxed mb-2">
                    • Bogor News (berita resmi dari pemerintah).
                </Text>
                <Text className="text-white leading-relaxed mb-2">
                    • Upvote Laporan (memprioritaskan laporan penting).
                </Text>
                <Text className="text-white leading-relaxed">
                    • Notifikasi Status Laporan.
                </Text>
            </View>
        ),
    },
    {
        id: 4,
        title: 'Apakah laporan saya akan langsung ditindaklanjuti oleh pemerintah?',
        content: (
             <Text className="text-white leading-relaxed">
                Pemerintah akan mendapatkan notifikasi atas laporan yang dikirim dan dapat mengubah statusnya (dalam proses, selesai, dll). Warga juga bisa melihat progres penanganannya secara real-time melalui fitur notifikasi dan status.
            </Text>
        ),
    },
    {
        id: 5,
        title: 'Apa manfaat fitur voting (upvote) dalam laporan?',
        content: (
            <Text className="text-white leading-relaxed">
                Fitur upvote membantu menandai laporan mana yang dianggap penting oleh banyak warga. Ini membantu pemerintah menentukan prioritas penanganan berdasarkan tingkat urgensi komunitas.
            </Text>
        ),
    },
];

// Komponen Accordion Item yang bisa digunakan kembali
const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
            <TouchableOpacity
                onPress={toggleAccordion}
                className="p-4 flex-row justify-between items-center"
                activeOpacity={0.8}
            >
                <Text className="font-bold text-base text-gray-800 flex-1 pr-4">{title}</Text>
                <Ionicons 
                    name={isOpen ? 'chevron-up' : 'chevron-down'} 
                    size={20} 
                    color="black" 
                />
            </TouchableOpacity>

             {isOpen && (
                // ↓↓↓ PERUBAHAN HANYA DI BARIS INI ↓↓↓
                <View className="px-4 pb-4 bg-[#6B9EBD]">
                {/* ↑↑↑ PERUBAHAN HANYA DI BARIS INI ↑↑↑ */}
                    <View className="pt-4 border-t border-gray-200">
                        {content}
                    </View>
                </View>
            )}
        </View>
    );
};


// Komponen Halaman FAQ Utama
export const options = {
    headerShown: false,
};

const FaqScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header Kustom */}
            <View className="flex-row items-center p-4 border-b border-gray-200">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-center flex-1 -ml-10">
                    FAQ
                </Text>
            </View>

            {/* Konten FAQ */}
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {faqData.map((item) => (
                    <AccordionItem 
                        key={item.id} 
                        title={item.title} 
                        content={item.content} 
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default FaqScreen;