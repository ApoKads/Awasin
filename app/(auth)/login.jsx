import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    Alert, // Kita akan gunakan Alert untuk feedback
} from 'react-native';
import { useRouter } from 'expo-router';

export const options = {
    headerShown: false,
};

const SignInScreen = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // 1. State baru untuk menyimpan pesan error
    const [error, setError] = useState('');

    const primaryDark = '#102E4A'; 

    // 2. Fungsi baru untuk menangani logika Sign In
    const handleSignIn = () => {
        // Reset error setiap kali tombol ditekan
        setError('');

        // Validasi: Cek apakah field kosong
        if (!username.trim() || !password.trim()) {
            setError('Username dan password tidak boleh kosong.');
            return; // Hentikan fungsi jika ada yang kosong
        }

        // Role-based Redirect: Cek kredensial admin
        if (username.toLowerCase() === 'admin' && password === 'admin') {
            Alert.alert('Login Berhasil', 'Selamat datang, Admin!');
            router.replace('/postPageAdmin'); // Gunakan replace agar tidak bisa kembali ke login
            return;
        }
        
        // Redirect untuk user biasa
        // Di sini Anda biasanya akan memanggil API untuk verifikasi user
        Alert.alert('Login Berhasil', `Selamat datang, ${username}!`);
        router.replace('/postPage'); // Gunakan replace agar tidak bisa kembali ke login
    };

    return (
        <ImageBackground
            source={require('../../assets/bgbuilding.png')}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <StatusBar barStyle="light-content" />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 justify-center items-center px-4"
                >
                    <View className="w-full max-w-sm bg-white/90 rounded-2xl p-8 shadow-lg">
                        
                        <Text className={`text-4xl font-poppins-bold text-center text-[${primaryDark}]`}>
                            Hi, Awasers!
                        </Text>

                        <Image
                            source={require('../../assets/logo-awasin-dark.png')}
                            className="w-64 h-64 self-center"
                            resizeMode="contain"
                        />

                        <Text className={`text-center font-poppins-bold text-gray-600 mb-6 text-[${primaryDark}]`}>
                            Please sign in to your account
                        </Text>

                        <View>
                            <TextInput
                                className={`bg-white/80 rounded-xl px-4 py-3 text-base border ${error && !username.trim() ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Username"
                                placeholderTextColor="#888"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                            <TextInput
                                className={`bg-white/80 rounded-xl px-4 py-3 text-base border ${error && !password.trim() ? 'border-red-500' : 'border-gray-300'} mt-4`}
                                placeholder="Password"
                                placeholderTextColor="#888"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                            />
                        </View>
                        
                        {/* 3. Tampilkan pesan error jika ada */}
                        {error ? (
                            <Text className="text-red-500 text-center mt-4">{error}</Text>
                        ) : null}

                        <TouchableOpacity className="self-end mt-2">
                            <Text className={`text-sm font-poppins underline text-gray-500`}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>

                        {/* 4. Hubungkan tombol Sign In ke fungsi handleSignIn */}
                        <TouchableOpacity
                            className={`bg-[${primaryDark}] w-full py-4 rounded-xl mt-6`}
                            activeOpacity={0.8}
                            onPress={handleSignIn} 
                        >
                            <Text className="text-white font-poppins-medium text-center font-bold text-lg">
                                SIGN IN
                            </Text>
                        </TouchableOpacity>

                        {/* Link ke halaman Register */}
                        <View className="flex-row justify-center items-center mt-8">
                            <Text className="font-poppins text-gray-600">Belum punya akun? </Text>
                            <TouchableOpacity onPress={() => router.push('/register')}>
                                <Text className={`font-poppins-bold text-[${primaryDark}] underline`}>
                                    REGISTER
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default SignInScreen;