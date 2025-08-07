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
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AlertCustom from '../components/alertCustom';

export const options = {
    headerShown: false,
};

const SignInScreen = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const primaryDark = '#102E4A'; 

    // --- PERUBAHAN UTAMA ADA DI DALAM FUNGSI INI ---
    const handleSignIn = () => {
        // Reset error setiap kali tombol ditekan
        setError('');

        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        // 1. Validasi: Cek jika KEDUA field kosong
        if (!trimmedUsername && !trimmedPassword) {
            setError('Username dan Password harus diisi.');
            return;
        }
        
        // 2. Validasi: Cek jika HANYA username yang kosong
        if (!trimmedUsername) {
            setError('Username tidak boleh kosong.');
            return;
        }

        // 3. Validasi: Cek jika HANYA password yang kosong
        if (!trimmedPassword) {
            setError('Password tidak boleh kosong.');
            return;
        }

        // Jika semua validasi lolos, lanjutkan ke logika redirect
        
        // Role-based Redirect: Cek kredensial admin
        if (trimmedUsername.toLowerCase() === 'admin' && trimmedPassword === 'admin') {
            Alert.alert('Login Berhasil', 'Selamat datang, Admin!');
            router.replace('/postPageAdmin');
            return;
        }
        setShowAlert(true);
    };

    return (
        <ImageBackground
            source={require('../../assets/bgbuilding.png')}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <StatusBar barStyle="light-content" />

                <AlertCustom
                    visible={showAlert}
                    onClose={() => setShowAlert(false)}
                    title="Login Berhasil!"
                    message={`Selamat datang ${username.trim()}, Setiap laporan kerusakan dari Anda berarti menjadikan Bogor selangkah lebih baik.`}
                    buttonText="Mengerti"
                    redirectTo="/postPage"
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 justify-center items-center px-4"
                >
                    <View className="w-full max-w-sm bg-white/90 rounded-2xl p-8 shadow-lg">
                        
                        <Text className={`text-4xl font-bold text-center text-[${primaryDark}]`}>
                            Hi, Awasers!
                        </Text>

                        <Image
                            source={require('../../assets/logo-awasin-dark.png')}
                            className="h-40 self-center mt-3 mb-4"
                            resizeMode="contain"
                        />

                        <Text className={`text-center font-bold text-gray-600 mb-6 text-[${primaryDark}]`}>
                            Harap masuk ke akun Anda
                        </Text>

                        <View>
                            {/* Styling border merah ini akan tetap berfungsi dengan benar */}
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
                        
                        {/* Tampilkan pesan error spesifik jika ada */}
                        {error ? (
                            <Text className="text-red-500 text-center mt-4">{error}</Text>
                        ) : null}

                        <TouchableOpacity className="self-end mt-2">
                            <Text className={`text-sm underline text-gray-500`}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`bg-[${primaryDark}] w-full py-4 rounded-xl mt-6`}
                            activeOpacity={0.8}
                            onPress={handleSignIn} 
                        >
                            <Text className="text-white text-center font-bold text-lg">
                                SIGN IN
                            </Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center items-center mt-8">
                            <Text className="text-gray-600">Belum punya akun? </Text>
                            <TouchableOpacity onPress={() => router.push('/register')}>
                                <Text className={`font-bold text-[${primaryDark}] underline`}>
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