import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import jsonData from '../assets/data/newsData.json';
import BottomNavbarAdmin from './components/BottomNavbarAdmin';

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
                <Text className="text-2xl font-poppins-bold mb-4">Berita Harian</Text>

                {/* ✅ Carousel Berita dengan Kategori & Judul */}
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
                            <Image
                                source={imageMap[item.image]}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />

                            {/* Overlay bawah: kategori & judul */}
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: 12,
                                    backgroundColor: 'rgba(0,0,0,0.4)',
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
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* 🔽 Berita Terbaru */}
                <View className="mt-8 w-full">
                    <View className="flex-row justify-between items-center mb-4 w-full">
                        <Text className="text-lg font-poppins-bold">Berita Terbaru</Text>
                        <Link href="/listNews">
                            <Text className="text-sm text-gray-500 font-poppins-light">Lihat Semua</Text>
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

            {/* ➕ Floating Add News Button */}
            <TouchableOpacity
                onPress={() => router.push('/formNews')}
                style={{
                    position: 'absolute',
                    bottom: 90,
                    right: 24,
                    backgroundColor: '#0C4A6E',
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 5,
                    zIndex: 50,
                }}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Bottom Navbar */}
            <BottomNavbarAdmin />
        </View>
    );
};

export default News;
