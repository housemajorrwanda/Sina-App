import { DarkTheme, DefaultTheme,ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from "expo-status-bar";
export default function PageStack(){
    const colorScheme=useColorScheme();
    return(
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name="payment"  />
                {/* Add more screens here */}
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    )
}