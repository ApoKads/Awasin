import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Layout from '../components/AuthLayout';

const KtpScan = () => {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleStartScan = () => {
    setShowCamera(true);
    setIsScanning(true);
    setScanComplete(false);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const handleNext = () => {
    navigation.navigate('postPage'); // Change to your next screen
  };

  if (!permission) {
    return (
      <Layout>
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-gray-800 text-lg">Requesting camera permission...</Text>
        </View>
      </Layout>
    );
  }

  if (!permission.granted) {
    return (
      <Layout>
        <View className="flex-1 justify-center items-center p-6 gap-4">
          <Text className="text-red-500 text-lg">Camera permission denied</Text>
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
          <Text className="text-[25px] font-poppins-bold">Scan KTP</Text>
          <Text className="text-sm font-poppins text-center text-gray-600">
            Pastikan KTP Anda terlihat jelas dalam frame dan pencahayaan cukup
          </Text>
        </View>
        
        {/* Area pemindaian KTP */}
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
                  facing="back"
                >
                  {/* KTP Card Template Overlay */}
                  <View style={styles.ktpOverlay}>
                    <View style={styles.ktpOutline}>
                      {/* KTP Card Header */}
                      <View style={styles.ktpHeader}>
                        <Text style={styles.ktpHeaderText}>KARTU TANDA PENDUDUK</Text>
                        <Text style={styles.ktpSubheaderText}>REPUBLIK INDONESIA</Text>
                      </View>
                      
                      {/* KTP Content Area */}
                      <View style={styles.ktpContent}>
                        <View style={styles.ktpPhotoPlaceholder} />
                        <View style={styles.ktpFields}>
                          <View style={styles.ktpField}>
                            <Text style={styles.ktpFieldLabel}>NIK</Text>
                            <View style={styles.ktpFieldValue} />
                          </View>
                          <View style={styles.ktpField}>
                            <Text style={styles.ktpFieldLabel}>Nama</Text>
                            <View style={styles.ktpFieldValue} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  
                  {isScanning && (
                    <View className="absolute inset-0 justify-center items-center bg-black/30">
                      <Text className="mt-6 text-white text-lg font-bold">Memindai KTP...</Text>
                    </View>
                  )}
                </CameraView>
              </View>
            )
          ) : (
            <View className="w-full h-full justify-center items-center border-2 border-dashed border-gray-300 rounded-lg">
              <Ionicons name="camera" size={48} color="#9ca3af" />
              <Text className="mt-2 text-gray-500 text-center px-4">
                Posisikan KTP Anda dalam frame
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
                {isScanning ? 'Memindai...' : 'Scan KTP'}
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

const styles = StyleSheet.create({
  ktpOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ktpOutline: {
    width: '100%',
    height: 220,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
  },
  ktpHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  ktpHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ktpSubheaderText: {
    color: 'white',
    fontSize: 12,
  },
  ktpContent: {
    flexDirection: 'row',
    flex: 1,
  },
  ktpPhotoPlaceholder: {
    width: 80,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
  },
  ktpFields: {
    flex: 1,
  },
  ktpField: {
    marginBottom: 8,
  },
  ktpFieldLabel: {
    color: 'white',
    fontSize: 10,
    marginBottom: 2,
  },
  ktpFieldValue: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
});

export default KtpScan;