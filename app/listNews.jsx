import React from 'react';
import { View, Text, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = ['All', 'Jalan', 'Gedung', 'Taman', 'Lampu jalan', 'Halte', 'Alun-alun'];

const newsData = [
    {
        id: 1,
        image: require('../assets/berita1.png'),
        title: 'Bogor Siapkan Destinasi Wisata Baru untuk Sambut Liburan Akhir',
        category: 'Sport',
        date: 'May 3, 2025 09.00 AM',
    },
    {
        id: 2,
        image: require('../assets/berita2.png'),
        title: 'Bogor Siapkan Destinasi Wisata Baru untuk Sambut Liburan Akhir',
        category: 'Sport',
        date: 'May 3, 2025 09.00 AM',
    },
    {
        id: 3,
        image: require('../assets/berita2.png'),
        title: 'Bogor Siapkan Destinasi Wisata Baru untuk Sambut Liburan Akhir',
        category: 'Sport',
        date: 'May 3, 2025 09.00 AM',
    },
    {
        id: 4,
        image: require('../assets/berita2.png'),
        title: 'Bogor Siapkan Destinasi Wisata Baru untuk Sambut Liburan Akhir',
        category: 'Sport',
        date: 'May 3, 2025 09.00 AM',
    },
    {
        id: 5,
        image: require('../assets/berita2.png'),
        title: 'Bogor Siapkan Destinasi Wisata Baru untuk Sambut Liburan Akhir',
        category: 'Sport',
        date: 'May 3, 2025 09.00 AM',
    },
];

const DiscoverNews = () => {
    return (
        <ScrollView className="flex-1 bg-white">
            {/* Layer background */}
            <View className="absolute top-0 left-0 right-0 h-40 bg-[#0C4A6E] rounded-b-3xl z-0" />

            {/* Content */}
            <View className="px-6 pt-10 z-10">
                <Text className="text-3xl font-extrabold text-white mb-1">Discover</Text>
                <Text className="text-sm text-[#d0d0d0] mb-4">News from Bogor</Text>

                {/* Search bar */}
                <View className="bg-white rounded-full flex-row items-center px-4 py-2 shadow">
                    <Ionicons name="search" size={20} color="#888" />
                    <TextInput
                        placeholder="Search..."
                        className="flex-1 text-gray-700 ml-2"
                        placeholderTextColor="#888"
                    />
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                    <View className="flex-row space-x-3">
                        {categories.map((cat, idx) => (
                            <View
                                key={idx}
                                className={`px-5 py-2 rounded-full border-2 ${
                                    idx === 0
                                        ? 'bg-[#0C4A6E] border-[#0C4A6E]'
                                        : 'border-[#0C4A6E]'
                                }`}
                            >
                                <Text
                                    className={`font-semibold ${
                                        idx === 0 ? 'text-white' : 'text-[#0C4A6E]'
                                    }`}
                                >
                                    {cat}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* List News */}
            <View className="p-6 pt-8">
                {newsData.map((item) => (
                    <View key={item.id} className="flex-row mb-4">
                        <Image
                            source={item.image}
                            className="w-16 h-16 rounded-lg mr-4"
                            resizeMode="cover"
                        />
                        <View className="flex-1">
                            <Text className="font-semibold text-sm">
                                {item.title}
                            </Text>
                            <Text className="text-gray-400 text-xs">
                                {item.date}
                            </Text>
                            <Text className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mt-1 w-16 text-center">
                                {item.category}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default DiscoverNews;
