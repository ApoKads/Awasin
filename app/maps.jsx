import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
    setMarker({ latitude, longitude });

    // Perform reverse geocoding
    const [result] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (result) {
      const { street, name, city, region } = result;
      setLocationName(`${street || name}, ${city}, ${region}`);
    } else {
      setLocationName("Unknown location");
    }
  };

  return (
    <View className="flex-1">
      {region && (
        <>
          <MapView
            className="flex-1"
            region={region}
            showsUserLocation
            showsMyLocationButton
            onPress={handleMapPress}
          >
            {marker && <Marker coordinate={marker} />}
          </MapView>
          {locationName && (
            <View className="absolute bottom-5 left-5 right-5 bg-white/90 p-3 rounded-lg shadow-md">
              <Text className="text-base font-semibold text-gray-800">{locationName}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}
