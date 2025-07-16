import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  TextInput
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useLocalSearchParams, router } from "expo-router";

const Maps = () => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);

  const params = useLocalSearchParams();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(initialRegion);
      setLoading(false);
    })();
  }, []);


  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });

    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
    await searchLocation(latitude, longitude);
  };

  const searchLocation = async (latitude, longitude) => {
    try {
      const [result] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result) {
        const { street, name, city, region: addressRegion } = result;

        const parts = [];

        if (name && name !== street) parts.push(name);
        if (street) parts.push(street);
        if (city) parts.push(city);
        if (addressRegion) parts.push(addressRegion);

        const formattedAddress = parts.join(", ");
        setLocationName(formattedAddress);
      } else {
        setLocationName("Lokasi Tidak Diketahui");
      }
    } catch (error) {
      console.error("Reverse geocoding failed: ", error);
      setLocationName("Lokasi Tidak Bisa Ditemukan");
    }
  };

  const handleConfirm = () => {
    if (!marker) return;
    router.push({
      pathname: "/laporanForm",
      params: {
        ...params,
        latitude: marker.latitude.toString(),
        longitude: marker.longitude.toString(),
        address: locationName,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading Map...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          showsMyLocationButton
          onPress={handleMapPress}
        >
          {marker && <Marker coordinate={marker} />}
        </MapView>

        {/* {locationName && ( */}
        <View className="absolute bottom-[20] left-[20] right-[20] bg-white p-[20] rounded-lg elevation-md">
          <Text className="text-2xl font-bold mb-5">Lokasi Laporan</Text>
          <TextInput
            className="border border-gray-400 rounded-full px-4 py-2 w-full h-[45] text-[1rem] mb-[30] font-poppins"
            placeholder="Search"
            placeholderTextColor="#A0AEC0"
            value={locationName}
            onChange={(text) => setLocationName(text)}
          />
          <TouchableOpacity
            onPress={handleConfirm}
            className="bg-[#102E4A] w-[180] p-4 rounded-full shadow-lg ml-auto"
          >
            <Text className="text-white text-md font-bold text-center">
              Konfirmasi Lokasi
            </Text>
          </TouchableOpacity>
        </View>
        {/* )} */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
