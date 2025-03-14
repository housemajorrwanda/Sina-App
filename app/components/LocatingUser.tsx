import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";

const API_KEY = "AIzaSyDPn_ruf8ZU47SAarpAiOj9RaSl_2q75qY"; // Replace with your actual API key

const LocationScreen = ({color="third"} ) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState("Fetching...");

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("Permission denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    //   console.log(loc);
      // Reverse Geocoding
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.coords.latitude},${loc.coords.longitude}&key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data?.results[0])
      if (data.results.length > 0) {
        const formattedAddress=data.results[0].formatted_address;
        const addressParts = formattedAddress.split(", ").slice(1);
        const cleanedAddress = addressParts.join(", ");
        setAddress(cleanedAddress);
      } else {
        setAddress("Address not found");
      }
    };

    getLocation();
  }, []);

  return (
    <View className="flex-1 items-start justify-start">
      {/* <Text className="text-white" style={{ fontSize: 12, fontWeight: "bold" }}>Current Location:</Text> */}
      <Text className={`text-${color}`} style={{ fontSize: 12 }}>{address}</Text>
    </View>
  );
};

export default LocationScreen;
