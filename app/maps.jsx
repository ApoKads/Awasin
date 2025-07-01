import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";


const Maps = () => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);

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

    try {
      const [result] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result) {
        const { street, name, city, region: addressRegion } = result;
        setLocationName(`${street || name}, ${city}, ${addressRegion}`);
      } else {
        setLocationName("Unknown location");
      }
    } catch (error) {
      console.error("Reverse geocoding failed: ", error);
      setLocationName("Could not find address");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2">Loading Map...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <MapView
        className="absolute inset-0"
        region={region}
        showsUserLocation
        showsMyLocationButton
        onPress={handleMapPress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      {locationName && (
        <View className="absolute bottom-5 left-5 right-5 bg-white p-4 rounded-lg shadow-md">
          <Text className="text-base text-center">{locationName}</Text>
        </View>
      )}
    </View>
  );
};

export default Maps;
