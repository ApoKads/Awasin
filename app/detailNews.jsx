import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export const options = {
    headerShown: false,
};

const DetailNews = () => {
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-black">
            <View style={{ width, height: 300 }} className="relative">
                <Image
                    source={require('../assets/berita1.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-6 left-4 bg-black/50 p-2 rounded-full"
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <View className="absolute bottom-6 left-4 right-4">
                    <Text className="bg-[#6B9EBD] text-white px-3 py-1 rounded-xl self-start mb-2 text-xs font-bold">
                        Category
                    </Text>
                    <Text className="text-white font-bold text-2xl">
                        Bogor diserang akatsuki, Siapa yang akan menjadi pahlawan?
                    </Text>
                    <Text className="text-gray-200 text-xs mt-1">
                        May 2, 2025 09.00 AM
                    </Text>
                </View>
            </View>

            <View className="bg-white mt-[-20px] rounded-t-3xl p-6">
                <Text className="text-gray-800 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ea iure quae ullam cumque libero, blanditiis dolore perspiciatis quia,
                    eaque ex temporibus maxime qui eos quisquam voluptatibus expedita dolores
                    reiciendis atque! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ea iure quae ullam cumque libero, blanditiis dolore perspiciatis quia,
                    eaque ex temporibus maxime qui eos quisquam voluptatibus expedita dolores
                    reiciendis atque!
                </Text>
                <Text className="text-gray-800 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ea iure quae ullam cumque libero, blanditiis dolore perspiciatis quia,
                    eaque ex temporibus maxime qui eos quisquam voluptatibus expedita dolores
                    reiciendis atque!
                </Text>
            </View>
        </ScrollView>
    );
};

export default DetailNews;
