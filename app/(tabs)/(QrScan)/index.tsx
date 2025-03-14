import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  Image
} from "react-native";
import axios from "axios";
import Confirmed from '@/assets/images/Confirmed.svg'
import { url } from "@/app/components/url";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window"); // Get screen dimensions
const frameSize = width * 0.7; // Make scanner frame 70% of screen width

export default function QRScanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  
  const [loading,setLoading]=useState(false)
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const checkQrCode = async (payment_id: string) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken")
      const result = await axios.post(
        `${url}/payments/qrscan/`,
        { payment_id }, // Wrap payment_id in an object
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`, // Include CSRF token
          },
        }
      );
      console.log("QR CODE RESULT", result.data?.message);
      setScannedData(result?.data)
      setLoading(false);
    } catch (error: any) {
      console.log("Error in QR check:", error);
      if (error.response) {
        // Handle specific HTTP errors
        console.log("Response data:", error.response.data);
        console.log("Status code:", error.response.status);
      } else if (error.request) {
        // Handle network errors
        console.log("No response received:", error.request);
      } else {
        // Handle other errors
        console.log("Error:", error.message);
      }
      setLoading(false);
    }
  };
  const handleBarCodeScanned = ({ data }: any) => {
    console.log("Raw QR Data:", data); // Debugging: Log the raw QR content

    try {
      // First, try parsing the data as JSON
      const parsedData = JSON.parse(data.trim());

      // Validate required fields in the parsed JSON
      if (
        !parsedData?.customer_id ||
        !parsedData?.amount ||
        !parsedData?.status ||
        !parsedData?.transaction_id
      ) {
        throw new Error("Missing required fields in the QR code");
      }
      checkQrCode(parsedData?.payment_id)
      // If successful, set the scanned data
      setScanned(true);
      // setScannedData(parsedData);
    } catch (error) {
      // If JSON parsing fails, alert the user and show the raw data
      console.error("QR Parsing Error:", error);

      // If it's not JSON, attempt to handle it as plain text or another format
      if (error instanceof SyntaxError) {
        Alert.alert(
          "Invalid QR Code",
          `The QR code contains invalid data: ${data}`
        );
      }

      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} color="#2B6128" size="large" />
      {!scanned ? (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          style={styles.camera}
          facing={facing}
        >
          {/* Rectangle Overlay */}
          <View style={styles.overlay}>
            <View
              style={[
                styles.scannerFrame,
                { width: frameSize, height: frameSize }
              ]}
            />
          </View>

          {/* Flip Camera Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.scannedContainer}>
          <View className="rounded-full bg-gray-300 flex flex-col items-center justify-center p-6 my-2">
            {scannedData?.valid?<Confirmed />:<AntDesign name="exclamation" size={30} color="red" />}
          </View>
          <Text className="text-black">{scannedData?.message}</Text>
          <TouchableOpacity  className="bg-dark_green py-3 my-2 px-7 rounded-lg" onPress={() => setScanned(false)} >
            <Text className="text-white">Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white"
  },
  camera: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  scannerFrame: {
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "transparent"
  },
  buttonContainer: {
    position: "absolute",
    bottom: height * 0.1, // 10% from bottom
    width: "100%",
    alignItems: "center"
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: height * 0.02, // Adjust padding based on screen size
    paddingHorizontal: width * 0.1,
    borderRadius: 10
  },
  text: {
    fontSize: width * 0.05, // Scalable font size
    fontWeight: "bold",
    color: "white"
  },
  scannedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05
  },
  scannedText: {
    fontSize: width * 0.045,
    marginBottom: 5,
    color: "white"
  }
});
