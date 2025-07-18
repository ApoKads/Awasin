import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const BottomNavbar = () => {
    const router = useRouter();
    const pathname = usePathname(); // untuk tahu path saat ini

    const navItems = [
        {
            label: 'Beranda',
            icon: require('../../assets/icons/vectorart-home.png'),
            path: '/postPage',
        },
        {
            label: 'Berita',
            icon: require('../../assets/icons/vectorart-news.png'),
            path: '/news',
        },
        {
            label: 'Notifikasi',
            icon: require('../../assets/icons/vectorart-notification.png'),
            path: '/notification',
        },
        {
            label: 'Profil',
            icon: require('../../assets/icons/vectorart-profile.png'),
            path: '/settings',
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                {navItems.slice(0, 2).map((item, index) => {
                    const isActive = pathname === item.path;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => router.push(item.path)}
                            style={styles.navItem}
                        >
                            <View style={styles.iconWrapper}>
                                <Image
                                    source={item.icon}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: isActive ? '#FFFFFF' : '#94A3B8',
                                    }}
                                />
                                {isActive && <View style={styles.underline} />}
                            </View>

                            <Text style={[styles.navText, isActive && styles.activeText]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}

                <View style={styles.spacer} />

                {navItems.slice(2).map((item, index) => {
                    const isActive = pathname === item.path;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => router.push(item.path)}
                            style={styles.navItem}
                        >
                            <View style={styles.iconWrapper}>
                                <Image
                                    source={item.icon}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: isActive ? '#FFFFFF' : '#94A3B8',
                                    }}
                                />
                                {isActive && <View style={styles.underline} />}
                            </View>

                            <Text style={[styles.navText, isActive && styles.activeText]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

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
    underline: {
        marginTop: 4,
        width: 20,
        height: 3,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        paddingBottom: 20,
        backgroundColor: '#102E42',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
    },
    navText: {
        color: '#94A3B8', // slate-400
        fontSize: 12,
        marginTop: 4,
    },
    activeText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
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
    iconWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeDot: {
        position: 'absolute',
        bottom: -6,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
    },
});

export default BottomNavbar;