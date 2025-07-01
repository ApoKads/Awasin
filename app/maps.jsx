import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"; // Impor StyleSheet & ActivityIndicator
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
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading Map...</Text>
      </View>
    );
  }

  return (
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
      {locationName && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>{locationName}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject, 
  },
  locationInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  locationText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Maps;