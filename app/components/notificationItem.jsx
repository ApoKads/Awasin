import React from 'react';
import { View, Text } from 'react-native';

const NotificationItem = ({ title, message, time, isRead }) => {
    // Tentukan warna bar indikator berdasarkan status isRead
    const indicatorColor = isRead ? 'bg-gray-300' : 'bg-sky-400';

    return (
        <View className="flex-row items-center bg-white p-4">
            {/* Bar Indikator Kiri */}
            <View className={`w-1 h-full rounded-full mr-4 ${indicatorColor}`} />

            {/* Konten Notifikasi */}
            <View className="flex-1">
                <Text className="text-base font-bold text-gray-800">{title}</Text>
                <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
                    {message}
                </Text>
                <Text className="text-xs text-gray-400 self-end mt-2">{time}</Text>
            </View>
        </View>
    );
};

export default NotificationItem;