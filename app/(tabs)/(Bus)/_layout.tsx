import { Stack } from "expo-router";

const Layout=()=>{
    return <Stack screenOptions={{
        headerShown:false,
        
    }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="bus" />
    </Stack>
}
export default Layout;