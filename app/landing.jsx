import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

// Cara yang benar untuk menyembunyikan header untuk screen ini
export const options = {
    headerShown: false,
};

const WelcomeScreen = () => {
    // Dengan router, Anda bisa membuat tombolnya berfungsi
    const router = useRouter();

    return (
        // Menggunakan SafeAreaView untuk menghindari notch dan status bar
        <SafeAreaView className="flex-1 bg-[#1E3A5F]">
            {/* Mengatur warna ikon di status bar menjadi terang */}
            <StatusBar barStyle="light-content" />

            {/* Container utama untuk menengahkan semua konten */}
            <View className="flex-1 justify-center items-center p-6 pt-32">

                {/* Bagian Logo */}
                <Image
                    source={require('../assets/logo-awasin.png')} // pastikan path ini benar
                    className="absolute top-4 w-40 h-40"
                    resizeMode="contain"

                />

                {/* Bagian Ilustrasi dengan gambar-gambar yang mengorbit */}
                <View className="relative mb-8 items-center justify-center">
                    {/* Lingkaran utama */}
                    <View className="w-64 h-64 rounded-full overflow-hidden bg-sky-200">
                        <Image
                            source={require('../assets/monument.png')} // pastikan path ini benar
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Gambar-gambar kecil yang diposisikan secara absolut */}
                    <Image
                        source={require('../assets/gedung.png')} // pastikan path ini benar
                        className="w-14 h-14 rounded-full absolute top-8 left-0 border-2 border-white"
                        resizeMode="cover"
                    />
                    <Image
                        source={require('../assets/gedung.png')} // pastikan path ini benar
                        className="w-14 h-14 rounded-full absolute top-4 right-[-10px] border-2 border-white"
                        resizeMode="cover"
                    />
                    <Image
                        source={require('../assets/gedung.png')} // pastikan path ini benar
                        className="w-14 h-14 rounded-full absolute bottom-8 right-6 border-2 border-white"
                        resizeMode="cover"
                    />
                </View>

                {/* Bagian Teks */}
                <Text className="text-white text-3xl font-bold text-center">
                    Bersama Awasin, Kita Beresin
                </Text>
                <Text className="text-slate-300 text-base text-center mt-4 px-4">
                    Laporkan fasilitas yang rusak, untuk kota yang lebih baik. Setiap laporan mu membuat perbedaan!
                </Text>

                {/* Bagian Tombol */}
                <View className="w-full mt-10">
                    <TouchableOpacity
                        className="bg-[#6B9EBD] w-full py-4 rounded-xl shadow-lg"
                        activeOpacity={0.8}
                        // ↓↓↓ Ini akan mengarahkan ke halaman sign-in (misalnya, app/sign-in.js) ↓↓↓
                        onPress={() => router.push('/login')} 
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            SIGN IN
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="border border-slate-300 w-full py-4 rounded-xl mt-4"
                        activeOpacity={0.8}
                        // ↓↓↓ Ini akan mengarahkan ke halaman register (misalnya, app/register.js) ↓↓↓
                        onPress={() => router.push('/register')} 
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;