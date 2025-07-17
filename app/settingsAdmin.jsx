import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavbarAdmin from './components/BottomNavbarAdmin';

export default function SettingScreenAdmin() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            'Konfirmasi Logout',
            'Apakah Anda yakin ingin keluar?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Ya',
                    onPress: () => {
                        console.log('Admin logged out');
                        router.replace('/landing');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>

            <View style={{ backgroundColor: 'white', marginTop: 8, paddingHorizontal: 24, paddingVertical: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Admin</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/default-avatar.jpg')}
                        style={{ width: 56, height: 56, borderRadius: 28 }}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>Admin</Text>
                        <Text style={{ fontSize: 14, color: '#4B5563' }}>Akun Admin</Text>
                    </View>
                </View>
            </View>

            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
                <TouchableOpacity
                    onPress={handleLogout}
                    style={{ backgroundColor: '#DC2626', paddingVertical: 12, borderRadius: 12 }}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Keluar</Text>
                </TouchableOpacity>
            </View>

            <BottomNavbarAdmin />
        </SafeAreaView>
    );
}
