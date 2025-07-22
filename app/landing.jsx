import React, { useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Animated,
    Easing,
} from 'react-native';
import { useRouter } from 'expo-router';

// Cara yang benar untuk menyembunyikan header untuk screen ini
export const options = {
    headerShown: false,
};

const WelcomeScreen = () => {
    const router = useRouter();

    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(progress, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear, 
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const float1 = progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -10, 0], 
    });
    const float2 = progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-5, 5, -5], 
    });
    const float3 = progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [5, -5, 5], 
    });

    return (
        <SafeAreaView className="flex-1 bg-[#1E3A5F]">
            <StatusBar barStyle="light-content" />
            <View className="flex-1 justify-center items-center p-6 pt-32">
                <Image
                    source={require('../assets/logo-awasin.png')}
                    className="absolute top-4 w-40 h-40"
                    resizeMode="contain"
                />
                <View className="relative mb-8 items-center justify-center">
                    <View className="w-64 h-64 rounded-full overflow-hidden bg-sky-200">
                        <Image
                            source={require('../assets/monument.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Gambar-gambar kecil dengan floating */}
                    <Animated.Image
                        source={require('../assets/gedung.png')}
                        className="w-12 h-12 rounded-full absolute top-20 left-[-20] border-2 border-white"
                        resizeMode="cover"
                        style={{ transform: [{ translateY: float1 }] }}
                    />
                    <Animated.Image
                        source={require('../assets/gedung.png')}
                        className="w-12 h-12 rounded-full absolute top-4 right-0 border-2 border-white"
                        resizeMode="cover"
                        style={{ transform: [{ translateY: float2 }] }}
                    />
                    <Animated.Image
                        source={require('../assets/gedung.png')}
                        className="w-12 h-12 rounded-full absolute bottom-0 right-8 border-2 border-white"
                        resizeMode="cover"
                        style={{ transform: [{ translateY: float3 }] }}
                    />
                </View>

                <Text className="text-white text-2xl font-poppins-bold text-center">
                    Bersama Awasin, Kita Beresin
                </Text>
                <Text className="text-slate-300 font-poppins text-base text-center mt-4 px-4">
                    Laporkan fasilitas yang rusak, untuk kota yang lebih baik. Setiap laporanmu membuat perbedaan!
                </Text>

                <View className="w-full mt-20">
                    <TouchableOpacity
                        className="bg-[#6B9EBD] w-full py-4 rounded-xl shadow-lg"
                        activeOpacity={0.8}
                        onPress={() => router.push('/login')}
                    >
                        <Text className="text-white text-center font-poppins-bold text-lg">
                            SIGN IN
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="border border-slate-300 w-full py-4 rounded-xl mt-4"
                        activeOpacity={0.8}
                        onPress={() => router.push('/register')}
                    >
                        <Text className="text-white text-center font-poppins-bold text-lg">
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
