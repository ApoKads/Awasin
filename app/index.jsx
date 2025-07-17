import { View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/landing'); // langsung redirect
    }, 500); // kasih delay 500ms biar lebih smooth

    return () => clearTimeout(timeout); // clear timeout saat unmount
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <ActivityIndicator size="large" color="#0C4A6E" />
    </View>
  );
};

export default index;
