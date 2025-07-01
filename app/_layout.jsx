// app/_layout.js
import React from 'react';
import { Stack } from 'expo-router'; // Atau { createNativeStackNavigator } dari '@react-navigation/native-stack'
import { TouchableOpacity, Text } from 'react-native';

const StackLayout = () => {
  return (
    <Stack
    >
      {/* Mengatur opsi khusus untuk layar 'index' (Home) */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Beranda',
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

      <Stack.Screen
        name="listNews"
        options={{
          title: 'List news',
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

      <Stack.Screen
        name="detailNews"
        options={{
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

      <Stack.Screen
        name="news"
        options={{
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

      <Stack.Screen
        name="about"
        options={{
          title: 'Beranda',
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

      <Stack.Screen
        name="(auth)"
        options={{
          title: 'Beranda',
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

    </Stack>
  );
};

export default StackLayout;