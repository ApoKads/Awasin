import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import BottomNavbar from './components/BottomNavbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import jsonData from '../assets/data/newsData.json';
import { LinearGradient } from 'expo-linear-gradient';


const { width: windowWidth } = Dimensions.get('window');

const imageMap = {
    "../assets/berita1.png": require('../assets/berita1.png'),
    "../assets/berita2.png": require('../assets/berita2.png'),
    "../assets/berita3.png": require('../assets/berita3.png')
};

const News = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View className="flex-1 bg-white px-4 w-full" style={{ paddingTop: insets.top }}>
            <ScrollView
                className="flex-1 w-full"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text className="text-2xl font-bold mb-4">Berita Harian</Text>

                {/* ✅ Carousel DENGAN kategori di atas judul */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                >
                    {jsonData.map((item) => (
                        <View
                            key={item.id}
                            style={{
                                width: windowWidth * 0.8,
                                height: 200,
                                borderRadius: 16,
                                overflow: 'hidden',
                                marginRight: 16,
                                backgroundColor: '#ccc',
                                position: 'relative',
                            }}
                        >
                            {/* Background image */}
                            <Image
                                source={imageMap[item.image]}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />

                            {/* Overlay bawah dengan kategori dan judul */}
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.7)']}
                                start={{ x: 0, y: 0.4 }}
                                end={{ x: 0, y: 1 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '100%',
                                    padding: 16,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <View
                                    style={{
                                        alignSelf: 'flex-start',
                                        backgroundColor: '#102E4A',
                                        paddingHorizontal: 10,
                                        paddingVertical: 4,
                                        borderRadius: 10,
                                        marginBottom: 6,
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                                        {item.category}
                                    </Text>
                                </View>

                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 14,
                                        fontWeight: '600',
                                        lineHeight: 18,
                                    }}
                                    numberOfLines={2}
                                >
                                    {item.title}
                                </Text>
                            </LinearGradient>
                        </View>
                    ))}
                </ScrollView>

                {/* 🔽 Berita terbaru list */}
                <View className="mt-8 w-full">
                    <View className="flex-row justify-between items-center mb-4 w-full">
                        <Text className="text-lg font-bold">Berita Terbaru</Text>
                        <Link href="/listNews">
                            <Text className="text-sm text-gray-500">Lihat Semua</Text>
                        </Link>
                    </View>
                    <View className="w-full">
                        {jsonData.map((item) => (
                            <Link key={item.id} href="/detailNews" asChild>
                                <TouchableOpacity className="flex-row mb-4 w-full border-b border-b-gray-100 pb-4">
                                    <Image
                                        source={imageMap[item.image]}
                                        className="w-16 h-16 rounded-lg mr-4"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1">
                                        <Text className="font-poppins-semibold">{item.title}</Text>
                                        <Text className="text-gray-400 text-xs font-poppins-medium">{item.date}</Text>
                                        <Text className="bg-[#6B9EBD] text-white text-xs px-2 py-1 rounded mt-1 w-24 text-center font-poppins-semibold">
                                            {item.category}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* 🧭 Bottom Nav */}
            <BottomNavbar />
        </View>
    );
};

export default News;