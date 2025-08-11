import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../components/AuthLayout';
import { CameraView, useCameraPermissions } from 'expo-camera';

const FaceScan = () => {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [scanComplete, setScanComplete] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleStartScan = () => {
    setShowCamera(true);
    setIsScanning(true);
    setCountdown(3);
    setScanComplete(false);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsScanning(false);
          setScanComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNext = () => {
    navigation.navigate('ktpscan');
  };

  if (!permission) {
    return (
      <Layout>
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-gray-800 text-lg font-poppins">Requesting camera permission...</Text>
        </View>
      </Layout>
    );
  }

  if (!permission.granted) {
    return (
      <Layout>
        <View className="flex-1 justify-center items-center p-6 gap-4">
          <Text className="text-red-500 text-lg font-poppins">Camera permission denied</Text>
          <TouchableOpacity 
            className="w-[80%] bg-[#102E4A] px-8 py-3 rounded-xl flex items-center"
            onPress={requestPermission}
          >
            <Text className="text-white font-medium font-poppins">Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header dengan back button */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2 mr-2"
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>
      
      {/* Konten utama */}
      <View className="flex-1 justify-start items-center p-6 pt-0 gap-4">
        <View className="flex items-center justify-start">
          <Text className="text-[25px] font-poppins-bold">Scan Wajah</Text>
          <Text className="text-sm font-poppins text-center text-gray-600">
            Pastikan wajah Anda terlihat jelas dalam frame dan pencahayaan cukup
          </Text>
        </View>
        
        {/* Area pemindaian wajah */}
        <View className="w-full h-[50%] rounded-lg overflow-hidden justify-center items-center bg-gray-100">
          {showCamera ? (
            scanComplete ? (
              <View className="w-full h-full justify-center items-center bg-green-50">
                <Ionicons name="checkmark-circle" size={72} color="#10b981" />
                <Text className="mt-4 text-green-600 font-poppins-medium">Scan Berhasil!</Text>
              </View>
            ) : (
              <View className="w-full h-full relative justify-center items-center">
                <CameraView 
                  style={{ flex: 1, width: '100%' }}
                  facing="front"
                >
                  {isScanning && (
                    <View className="absolute inset-0 justify-center items-center bg-black/30">
                      <View className="w-64 h-80 border-2 border-white rounded-lg" />
                      <Text className="mt-6 text-white text-4xl font-ooppins-bold">{countdown}</Text>
                    </View>
                  )}
                </CameraView>
              </View>
            )
          ) : (
            <View className="w-full h-full justify-center items-center border-2 border-dashed border-gray-300 rounded-lg">
              <Ionicons name="camera" size={48} color="#9ca3af" />
              <Text className="mt-2 text-gray-500 text-center font-poppins px-4">
                Posisikan wajah Anda dalam frame
              </Text>
            </View>
          )}
        </View>
        
        {/* Tombol action */}
        <View className="mt-6 flex gap-4 w-full items-center">
          {!scanComplete ? (
            <TouchableOpacity 
              className={`w-[80%] bg-[#102E4A] px-8 py-3 rounded-xl flex items-center ${isScanning ? 'opacity-50' : ''}`}
              onPress={handleStartScan}
              disabled={isScanning}
            >
              <Text className="text-white font-medium font-poppins">
                {isScanning ? 'Memindai...' : 'Scan Wajah'}
              </Text>
            </TouchableOpacity>
          ) : null}
          
          <TouchableOpacity 
            className={`w-[80%] bg-[#102E4A] px-8 py-3 rounded-xl flex items-center ${!scanComplete ? 'opacity-50' : ''}`}
            onPress={handleNext}
            disabled={!scanComplete}
          >
            <Text className="text-white font-medium font-poppins">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default FaceScan;