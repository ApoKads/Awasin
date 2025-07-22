import React, { useState, useMemo } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    SectionList,
    Alert,
    Modal,
    Image,
    FlatList,
} from 'react-native';
import NotificationItem from './components/notificationItem'; // Ganti dengan path yang sesuai
import BottomNavbar from './components/BottomNavbar'

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
        <SafeAreaView className="flex-1 bg-white">
            {/* Header Kustom */}
            <View className="flex-row justify-between items-center p-4 bg-white mt-10">
                <Text className="text-2xl font-poppins-bold text-gray-800">Notifikasi</Text>
                <TouchableOpacity onPress={() => setOptionsMenuVisible(true)}>
                     <Image 
                        source={require('../assets/icons/vectorart-menu.png')}
                        className="w-6 h-6"
                        style={{ tintColor: 'black' }}
                    />
                </TouchableOpacity>
            </View>

            {/* Bar Filter */}
            <View className="flex-row justify-between items-center bg-[#1E3A5F] px-4 py-3">
                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => setDropdownVisible(true)}
                 >
                    <Text className="text-white font-poppins mr-1">{filter}</Text>
                    {/* Ikon sudah tidak memiliki className, aman */}
                    <Image
                        source={require('../assets/icons/vectorart-dropdown.png')}
                        className="w-4 h-4"
                        style={{marginBottom: 3}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMarkAllAsRead}>
                    <Text className="text-white font-poppins">Mark All As Read</Text>
                </TouchableOpacity>
            </View>

            {/* Modal Dropdown Filter */}
            <Modal transparent={true} visible={isDropdownVisible} animationType="fade" onRequestClose={() => setDropdownVisible(false)}>
                <TouchableOpacity className="flex-1" activeOpacity={1} onPressOut={() => setDropdownVisible(false)}>
                    <View className="absolute top-36 left-4 bg-white rounded-lg shadow-xl w-40">
                        <FlatList data={filterOptions} keyExtractor={(item) => item} renderItem={({ item }) => ( <TouchableOpacity className="p-3 border-b border-gray-100" onPress={() => handleSelectFilter(item)}><Text className={`text-base ${filter === item ? 'font-bold text-sky-600' : 'text-gray-700'}`}>{item}</Text></TouchableOpacity> )} />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modal Menu Opsi (Tiga Titik) */}
            <Modal transparent={true} visible={isOptionsMenuVisible} animationType="fade" onRequestClose={() => setOptionsMenuVisible(false)}>
                <TouchableOpacity className="flex-1" activeOpacity={1} onPressOut={() => setOptionsMenuVisible(false)}>
                    <View className="absolute top-16 right-4 bg-white rounded-lg shadow-xl w-60">
                        <TouchableOpacity className="flex-row items-center p-3 border-b border-gray-100" onPress={handleClearReadNotifications}>
                            <Image 
                                source={require('../assets/icons/vectorart-trashblue.png')}
                                className="w-5 h-5"
                                style={{ marginRight: 12}}
                            />
                            <Text className="text-base text-gray-700">Hapus Notifikasi Terbaca</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center p-3" onPress={() => { setOptionsMenuVisible(false); Alert.alert("Hapus Semua?", "Aksi ini tidak bisa dibatalkan.", [{ text: "Batal" }, { text: "Hapus", style: "destructive", onPress: () => setNotifications([]) }]); }}>
                            <Image 
                                source={require('../assets/icons/vectorart-trash.png')}
                                className="w-5 h-5"
                                style={{ marginRight: 12}}
                            />
                            <Text className="text-base text-red-500">Hapus Semua Notifikasi</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Daftar Notifikasi */}
            <SectionList
                sections={processedData}
                keyExtractor={(item) => item.id}
                
                // --- PERUBAHAN 1: LOGIKA SEPARATOR DIPINDAHKAN KE SINI ---
                renderItem={({ item }) => (
                    <View className="bg-white">
                        <TouchableOpacity onPress={() => handleMarkAsRead(item.id)}>
                            <NotificationItem
                                title={item.title}
                                message={item.message}
                                time={item.time}
                                isRead={item.isRead}
                            />
                        </TouchableOpacity>
                        {/* Garis separator dirender setelah setiap item */}
                        <View className="px-4">
                            <View className="h-px bg-gray-200" />
                        </View>
                    </View>
                )}

                renderSectionHeader={({ section: { title } }) => (<Text className="text-lg font-bold text-gray-700 px-4 pt-6 pb-2 bg-white">{title}</Text>)}

                // --- PERUBAHAN 2: PADDING UNTUK BOTTOM NAVBAR ---
                contentContainerStyle={{ paddingBottom: 100 }} // Memberi ruang agar tidak tertutup navbar

                ListEmptyComponent={<View className="flex-1 justify-center items-center mt-20"><Text className="text-gray-500 text-lg">Tidak ada notifikasi</Text></View>}
            />
            
            <BottomNavbar />
        </SafeAreaView>
    );
};

export default NotificationScreen;