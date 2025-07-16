import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import jsonData from '../assets/data/newsData.json';

const categories = ['All', 'Jalan', 'Gedung', 'Taman', 'Lampu jalan', 'Halte', 'Alun-alun'];

// Mapping agar path JSON bisa load ke require()
const imageMap = {
    "../assets/berita1.png": require('../assets/berita1.png'),
    "../assets/berita2.png": require('../assets/berita2.png'),
    "../assets/berita3.png": require('../assets/berita3.png'),
};

const DiscoverNews = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [query, setQuery] = useState('');
    const insets = useSafeAreaInsets();

    // Filter data by category dan search
    const filteredNews = jsonData.filter(item =>
        (activeCategory === 'All' || item.category === activeCategory) &&
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Layer background */}
            <View className="absolute top-0 left-0 right-0 h-40 bg-[#0C4A6E] rounded-b-3xl z-0" />

            {/* Content */}
            <View style={{ paddingTop: insets.top + 10 }} className="px-6 z-10">
                <Text className="text-3xl font-extrabold text-white mb-1">Discover</Text>
                <Text className="text-sm text-[#d0d0d0] mb-4">News from Bogor</Text>

                {/* Search bar */}
                <View className="bg-white rounded-full flex-row items-center px-4 py-2 shadow">
                    <Ionicons name="search" size={20} color="#888" />
                    <TextInput
                        placeholder="Search..."
                        value={query}
                        onChangeText={setQuery}
                        className="flex-1 text-gray-700 ml-2"
                        placeholderTextColor="#888"
                    />
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                    <View className="flex-row space-x-3 gap-2">
                        {categories.map((cat, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full border-2 ${
                                    activeCategory === cat
                                        ? 'bg-[#0C4A6E] border-[#0C4A6E]'
                                        : 'border-[#0C4A6E]'
                                }`}
                            >
                                <Text
                                    className={`font-semibold ${
                                        activeCategory === cat ? 'text-white' : 'text-[#0C4A6E]'
                                    }`}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* List News */}
            <View className="p-6 pt-8">
                {filteredNews.map((item) => (
                    <Link key={item.id} href="/detailNews" asChild>
                        <TouchableOpacity className="flex-row items-center mb-4">
                            <Image
                                source={imageMap[item.image]}
                                className="w-16 h-16 rounded-lg mr-4"
                                resizeMode="cover"
                            />
                            <View className="flex-1">
                                <Text className="font-semibold">{item.title}</Text>
                                <Text className="text-gray-400 text-xs">{item.date}</Text>
                                <Text className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mt-1 w-24 text-center">
                                    {item.category}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
                {filteredNews.length === 0 && (
                    <Text className="text-center text-gray-400">No news found.</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default DiscoverNews;
