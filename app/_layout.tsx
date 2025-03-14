import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, Text } from 'react-native';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "@/global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import store from './store';
import { Akshar_400Regular, Akshar_500Medium, Akshar_700Bold } from "@expo-google-fonts/akshar";
import GlobalText from './GlobalText';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Akshar_400Regular,
    Akshar_500Medium,
    Akshar_700Bold,
  });

  useEffect(() => {
    if (loaded) {
     
     
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {/* ✅ Place StatusBar at the top for global styling */}
      <StatusBar
        barStyle="light-content"  // "dark-content" or "light-content"
        backgroundColor="#F1A10C" // Custom background color
        animated={true}           // Smooth animation
        hidden={false}            // Show/hide StatusBar
        translucent={true}        // Allow content behind StatusBar
      />

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="screen/SignUpScreen" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(pages)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
