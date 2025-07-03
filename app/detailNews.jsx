import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export const options = {
    headerShown: false,
};

const DetailNews = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <ScrollView className="flex-1 bg-black">
            <View style={{ width, height: 300 }} className="relative">
                <Image
                    source={require('../assets/berita1.png')}
                    style={{ width, height: '100%' }}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ top: insets.top + 8 }}
                    className="absolute left-4 bg-black/50 p-2 rounded-full"
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <View className="absolute bottom-6 left-4 right-4 gap-2">
                    <Text className="bg-[#6B9EBD] text-white px-3 py-1 rounded-xl self-start mb-1 text-sm font-bold">
                        Category
                    </Text>
                    <Text className="text-white font-bold text-2xl">
                        Bogor diserang akatsuki, Siapa yang akan menjadi pahlawan?
                    </Text>
                    <Text className="text-gray-200 text-sm mb-4">
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
                <Text className="text-gray-800 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                <Text className="text-gray-800 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
