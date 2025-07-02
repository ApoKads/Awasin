import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import BottomNavbar from './components/BottomNavbar';
import { TouchableOpacity } from 'react-native';


export const screenOptions = {
    headerShown: false,
};


const newsData = [
    {
        id: 1,
        image: require('../assets/berita1.png'),
        title: 'Bogor Siapkan Destinasi Wisata Baru',
        category: 'Travel',
        date: 'July 1, 2025 09.00 AM'
    },
    {
        id: 2,
        image: require('../assets/berita2.png'),
        title: 'Persiapan MotoGP Mandalika',
        category: 'Sport',
        date: 'June 28, 2025 14.00 PM'
    },
    {
        id: 3,
        image: require('../assets/berita3.png'),
        title: 'Festival Kuliner Nusantara',
        category: 'Food',
        date: 'June 27, 2025 11.00 AM'
    },
    {
        id: 4,
        image: require('../assets/berita3.png'),
        title: 'Festival Kuliner Nusantara',
        category: 'Food',
        date: 'June 27, 2025 11.00 AM'
    },
    {
        id: 5,
        image: require('../assets/berita3.png'),
        title: 'Festival Kuliner Nusantara',
        category: 'Food',
        date: 'June 27, 2025 11.00 AM'
    },
    {
        id: 6,
        image: require('../assets/berita3.png'),
        title: 'Festival Kuliner Nusantara',
        category: 'Food',
        date: 'June 27, 2025 11.00 AM'
    },
    {
        id: 7,
        image: require('../assets/berita3.png'),
        title: 'Festival Kuliner Nusantara',
        category: 'Food',
        date: 'June 27, 2025 11.00 AM'
    },
];

const News = () => {
    return (
        <View className="flex-1 bg-white pt-12 px-4">
            <ScrollView className="flex-1">
                <Text className="text-2xl font-bold mb-4">Berita Harian</Text>

                {/* Carousel */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                >
                    <View className="flex-row space-x-4 gap-4">
                        {newsData.map((item) => (
                            <View
                                key={item.id}
                                className="w-80 h-48 rounded-xl overflow-hidden bg-gray-300"
                            >
                                <Image
                                    source={item.image}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                />
                                <View className="absolute bottom-0 left-0 right-0 bg-black/40 p-2">
                                    <Text className="text-white font-bold">
                                        {item.title}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Berita terbaru */}
                <View className="mt-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold">Berita Terbaru</Text>
                        <Link href="/listNews">
                            <Text className="text-sm text-gray-500">Lihat Semua</Text>
                        </Link>
                    </View>
                    <View className="gap-4">
                        {newsData.map((item) => (
                            <Link key={item.id} href="/detailNews" asChild>
                                <TouchableOpacity className="flex-row items-center mb-4">
                                    <Image
                                        source={item.image}
                                        className="w-16 h-16 rounded-lg mr-4"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1">
                                        <Text className="font-semibold">{item.title}</Text>
                                        <Text className="text-gray-400 text-xs">{item.date}</Text>
                                        <Text className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mt-1 w-16 text-center">
                                            {item.category}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </View>

                </View>
            </ScrollView>
            <BottomNavbar />
        </View>

    );
};

export default News;
