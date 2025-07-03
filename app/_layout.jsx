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
    <Stack>
      {/*
        Set headerShown: false secara global untuk Stack ini jika Anda tidak ingin ada header sama sekali.
        Jika Anda ingin beberapa header, Anda bisa menentukannya per Stack.Screen.
      */}
      {/*
        Contoh global headerShown: false
        <Stack screenOptions={{ headerShown: false }}>
      */}

      {/*
        Definisikan Stack.Screen hanya untuk rute-rute *langsung* di level ini
        atau jika Anda ingin mengoverride konfigurasi default mereka.
      */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Beranda Utama', // Opsional, jika headerShown: false
          headerShown: false, // Sembunyikan header untuk halaman 'index'
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
          title: 'Tentang Kami', // Opsional, jika headerShown: false
          headerShown: false, // Sembunyikan header untuk halaman 'about'
        }}
      />

      <Stack.Screen
        name="newsPemerintah"
        options={{
          title: 'Tentang Kami', // Opsional, jika headerShown: false
          headerShown: false, // Sembunyikan header untuk halaman 'about'
        }}
      />

      <Stack.Screen
        name="formNews"
        options={{
          title: 'Tentang Kami', // Opsional, jika headerShown: false
          headerShown: false, // Sembunyikan header untuk halaman 'about'
        }}
      />

      <Stack.Screen
        name="(auth)"
        options={{
          title: 'Tentang Kami', // Opsional, jika headerShown: false
          headerShown: false, // Sembunyikan header untuk halaman 'about'
        }}
      />

      <Stack.Screen
        name="feedbackForm"
        options={{
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

      <Stack.Screen
        name="laporanForm"
        options={{
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

      <Stack.Screen
        name="maps"
        options={{
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />

      <Stack.Screen
        name="postDetail"
        options={{
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />
      <Stack.Screen
        name="postDetail_Admin"
        options={{
          headerShown:false,
          // Menambahkan tombol kustom di header kanan
        }}
      />



      {/*
        JANGAN DEKLARASIKAN GRUP SEBAGAI Stack.Screen seperti ini:
        <Stack.Screen name="(auth)" options={{ headerShown:false }} />

        Karena:
        1. (auth) adalah grup folder, bukan file layar tunggal.
        2. Grup (auth) seharusnya memiliki _layout.jsx sendiri yang mengatur navigasi di dalamnya.
           Jika app/(auth)/_layout.jsx sudah ada Stack Navigatornya, maka ini akan konflik.

        Expo Router akan secara otomatis menyertakan grup (auth)
        dan menggunakan _layout.jsx di dalamnya sebagai layout untuk rute-rute tersebut.
      */}

      {/* Jika Anda ingin secara eksplisit mengecualikan grup dari Stack ini,
          Anda bisa menggunakan `unstable_settings` atau penamaan rute.
          Tapi untuk kasus umum, tidak perlu mendeklarasikan grup di sini.
      */}

    </Stack>
  );
};

export default RootLayout;