import React, { useState, useMemo } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    SectionList,
    Alert,
    Modal,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NotificationItem from './components/notificationItem';
import BottomNavbar from './components/BottomNavbar';

export const options = {
    headerShown: false,
};

const initialNotificationsData = [
    { id: '1', title: 'Status diperbarui', message: 'Laporan Anda #123 sedang dalam proses perbaikan.', time: '18.00 WIB', isRead: false, category: 'Today' },
    { id: '2', title: 'Laporan Ditanggapi', message: 'Pemerintah kota telah menanggapi laporan Anda.', time: '17.30 WIB', isRead: false, category: 'Today' },
    { id: '3', title: 'Upvote Baru', message: 'Laporan Anda #120 mendapatkan upvote baru!', time: 'Kemarin', isRead: false, category: 'Last 7 Days' },
    { id: '4', title: 'Selamat Datang!', message: 'Terima kasih telah bergabung dengan Awasin.', time: '2 hari lalu', isRead: true, category: 'Last 7 Days' },
    { id: '5', title: 'Update Aplikasi', message: 'Versi baru tersedia, perbarui sekarang!', time: '1 bulan lalu', isRead: true, category: 'Older' },
];

const NotificationScreen = () => {
    // ... State dan fungsi-fungsi lain tidak berubah ...
    const [notifications, setNotifications] = useState(initialNotificationsData);
    const [filter, setFilter] = useState('All');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isOptionsMenuVisible, setOptionsMenuVisible] = useState(false);

    const filterOptions = ['All', 'Unread'];

    const handleMarkAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const handleMarkAllAsRead = () => {
        Alert.alert("Konfirmasi", "Tandai semua sebagai dibaca?", [{ text: "Batal" }, { text: "OK", onPress: () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true }))) }]);
    };

    const handleClearReadNotifications = () => {
        setOptionsMenuVisible(false);
        Alert.alert("Hapus Notifikasi Terbaca?", "Aksi ini tidak dapat dibatalkan.", [{ text: "Batal", style: "cancel" }, { text: "Hapus", style: "destructive", onPress: () => { setNotifications(prevNotifications => prevNotifications.filter(notif => !notif.isRead)); } }]);
    };

    const handleSelectFilter = (selectedFilter) => {
        setFilter(selectedFilter);
        setDropdownVisible(false);
    };

    const processedData = useMemo(() => {
        const filtered = filter === 'Unread' ? notifications.filter(n => !n.isRead) : notifications;
        const grouped = filtered.reduce((acc, notif) => {
            const category = notif.category;
            if (!acc[category]) acc[category] = [];
            acc[category].push(notif);
            return acc;
        }, {});
        const sections = Object.keys(grouped).map(key => ({ title: key, data: grouped[key] }));
        const sectionOrder = { 'Today': 1, 'Last 7 Days': 2, 'Older': 3 };
        sections.sort((a, b) => sectionOrder[a.title] - sectionOrder[b.title]);
        return sections;
    }, [notifications, filter]);

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            {/* Header Kustom */}
            <View className="flex-row justify-between items-center p-4 bg-white">
                <Text className="text-2xl font-bold text-gray-800">Notifikasi</Text>
                <TouchableOpacity onPress={() => setOptionsMenuVisible(true)}>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Bar Filter - DENGAN PERBAIKAN */}
            <View className="flex-row justify-between items-center bg-[#1E3A5F] px-4 py-3">
                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => setDropdownVisible(true)}
                >
                    <Text className="text-white font-semibold mr-1">{filter}</Text>
                    {/* Ikon sudah tidak memiliki className, aman */}
                    <Ionicons name="chevron-down" size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMarkAllAsRead}>
                    <Text className="text-white font-semibold">Mark All As Read</Text>
                </TouchableOpacity>
            </View>

            {/* Modal Dropdown Filter */}
            <Modal transparent={true} visible={isDropdownVisible} animationType="fade" onRequestClose={() => setDropdownVisible(false)}>
                <TouchableOpacity className="flex-1" activeOpacity={1} onPressOut={() => setDropdownVisible(false)}>
                    <View className="absolute top-36 left-4 bg-white rounded-lg shadow-xl w-40">
                        <FlatList data={filterOptions} keyExtractor={(item) => item} renderItem={({ item }) => (<TouchableOpacity className="p-3 border-b border-gray-100" onPress={() => handleSelectFilter(item)}> <Text className={`text-base ${filter === item ? 'font-bold text-sky-600' : 'text-gray-700'}`}>{item}</Text> </TouchableOpacity>)} />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modal Menu Opsi (Tiga Titik) - DENGAN PERBAIKAN */}
            <Modal
                transparent={true}
                visible={isOptionsMenuVisible}
                animationType="fade"
                onRequestClose={() => setOptionsMenuVisible(false)}
            >
                <TouchableOpacity
                    className="flex-1"
                    activeOpacity={1}
                    onPressOut={() => setOptionsMenuVisible(false)}
                >
                    <View className="absolute top-16 right-4 bg-white rounded-lg shadow-xl w-60">
                        <TouchableOpacity
                            className="flex-row items-center p-3 border-b border-gray-100"
                            onPress={handleClearReadNotifications}
                        >
                            <Ionicons name="trash-bin-outline" size={20} color="#4B5563" style={{ marginRight: 12 }} />
                            <Text className="text-base text-gray-700">Hapus Notifikasi Terbaca</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row items-center p-3"
                            onPress={() => {
                                setOptionsMenuVisible(false);
                                Alert.alert("Hapus Semua?", "Aksi ini tidak bisa dibatalkan.", [{ text: "Batal", style: "cancel" }, { text: "Hapus", style: "destructive", onPress: () => setNotifications([]) }]);
                            }}
                        >
                            <Ionicons name="trash-outline" size={20} color="#EF4444" style={{ marginRight: 12 }} />
                            <Text className="text-base text-red-500">Hapus Semua Notifikasi</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Daftar Notifikasi */}
            <SectionList
                sections={processedData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleMarkAsRead(item.id)}>
                        <NotificationItem
                            title={item.title}
                            message={item.message}
                            time={item.time}
                            isRead={item.isRead}
                        />
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (<Text className="text-lg font-bold text-gray-700 px-4 pt-6 pb-2">{title}</Text>)}
                ItemSeparatorComponent={() => <View className="h-px bg-gray-200" />}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={<View className="flex-1 justify-center items-center mt-20"><Text className="text-gray-500 text-lg">Tidak ada notifikasi</Text></View>}
            />
            <BottomNavbar />
        </SafeAreaView>
    );
};

export default NotificationScreen;