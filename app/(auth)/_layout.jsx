// app/(auth)/_layout.jsx
import { Stack } from 'expo-router'; // Pastikan Anda mengimpor Stack

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ini akan menyembunyikan header untuk semua layar di dalam grup (auth)
      }}
    >
    </Stack>
  );
};

export default AuthLayout;