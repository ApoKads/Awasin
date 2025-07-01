import React from 'react';
import { View, SafeAreaView } from 'react-native';

const Layout = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Background */}
      <View className="absolute inset-0 z-0">
        <View className="absolute -top-24 -left-56 w-[500px] h-[500px] rounded-full bg-blue-100 opacity-30" />
        <View className="absolute -bottom-20 -right-10 w-[400px] h-[400px] rounded-full bg-blue-100 opacity-20" />
      </View>
      
      {/* Konten Utama */}
      <View className="flex-1 z-10">
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Layout;