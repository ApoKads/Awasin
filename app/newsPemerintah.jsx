import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import BottomNavbar from './components/BottomNavbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import jsonData from '../assets/data/newsData.json';

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
        <View
            className="flex-1 bg-white px-4 w-full"
            style={{ paddingTop: insets.top }}
        >
            <ScrollView
                className="flex-1 w-full"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text className="text-2xl font-bold mb-4">Berita Harian</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                >
                    {jsonData.map((item) => (
                        <View
                            key={item.id}
                            style={{
                                width: windowWidth * 0.9,
                                height: 200,
                                borderRadius: 15,
                                overflow: 'hidden',
                                backgroundColor: '#ccc',
                                marginRight: 16
                            }}
                        >
                            <Image
                                source={imageMap[item.image]}
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
                </ScrollView>

                {/* Berita terbaru */}
                <View className="mt-8 w-full">
                    <View className="flex-row justify-between items-center mb-4 w-full">
                        <Text className="text-lg font-bold">Berita Terbaru</Text>
                        <Link href="/listNews">
                            <Text className="text-sm text-gray-500">Lihat Semua</Text>
                        </Link>
                    </View>
                    <View className="gap-4 w-full">
                        {jsonData.map((item) => (
                            <Link key={item.id} href="/detailNews" asChild>
                                <TouchableOpacity className="flex-row items-center mb-4 w-full">
                                    <Image
                                        source={imageMap[item.image]}
                                        className="w-16 h-16 rounded-lg mr-4"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1">
                                        <Text className="font-semibold">{item.title}</Text>
                                        <Text className="text-gray-400 text-xs">{item.date}</Text>
                                        <Text className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mt-1 w-20 text-center">
                                            {item.category}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Floating Add News Button */}
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
                    zIndex: 50
                }}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
            <BottomNavbar />
        </View>
    );
};

export default News;