// app/_layout.js
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Impor semua varian Poppins yang Anda butuhkan
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

// PENTING: Pertahankan splash screen tetap terlihat sampai aset dimuat
SplashScreen.preventAutoHideAsync();

const RootLayout = () => { // Ganti nama StackLayout menjadi RootLayout agar lebih deskriptif
  const [fontsLoaded, fontError] = useFonts({
    // Muat semua varian yang Anda butuhkan di sini
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    // Jika Anda hanya ingin varian tertentu, hapus yang tidak perlu untuk mengoptimalkan bundle size
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Sembunyikan splash screen setelah font dimuat (atau ada error)
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Tampilkan null atau komponen loading jika font belum dimuat
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,   
        animation: 'none',    // nonaktifkan animasi transisi antar screen
      }}
    >
      {/* Semua Stack.Screen tetap bisa didefinisikan di sini */}
      <Stack.Screen name="index" />
      <Stack.Screen name="listNews" />
      <Stack.Screen name="detailNews" />
      <Stack.Screen name="news" />
      <Stack.Screen name="about" />
      <Stack.Screen name="newsPemerintah" />
      <Stack.Screen name="formNews" />
      <Stack.Screen name="postPage" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="feedbackForm" />
      <Stack.Screen name="laporanForm" />
      <Stack.Screen name="maps" />
      <Stack.Screen name="postDetail" />
      <Stack.Screen name="editProfile" />
    </Stack>
  );
};

export default RootLayout;