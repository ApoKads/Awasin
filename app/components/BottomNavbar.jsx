import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const BottomNavbar = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => router.push('/postPage')} style={styles.navItem}>
                    <Ionicons name="home" size={24} color="#FFFFFF" />
                    <Text style={styles.navText}>Beranda</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/news')} style={styles.navItem}>
                    <MaterialIcons name="article" size={24} color="#FFFFFF" />
                    <Text style={styles.navText}>Berita</Text>
                </TouchableOpacity>

                <View style={styles.spacer} />

                <TouchableOpacity onPress={() => router.push('/notifications')} style={styles.navItem}>
                    <Ionicons name="notifications" size={24} color="#FFFFFF" />
                    <Text style={styles.navText}>Notifikasi</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/profile')} style={styles.navItem}>
                    <Feather name="user" size={24} color="#FFFFFF" />
                    <Text style={styles.navText}>Profil</Text>
                </TouchableOpacity>
            </View>

            {/* Floating center button */}
            <TouchableOpacity
                onPress={() => router.push('/laporanForm')}
                style={styles.floatingButton}
            >
                <LinearGradient
                    colors={['#0891b2', '#3b82f6']}
                    style={styles.gradientButton}
                >
                    <Ionicons name="add" size={32} color="#FFFFFF" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        paddingBottom: 20,
        backgroundColor: '#0C4A6E',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
    },
    navText: {
        color: '#F2EAD3',
        fontSize: 12,
        marginTop: 4,
    },
    spacer: {
        flex: 1,
    },
    floatingButton: {
        position: 'absolute',
        top: -28,
        left: '50%',
        marginLeft: -32,
        zIndex: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    gradientButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomNavbar;
