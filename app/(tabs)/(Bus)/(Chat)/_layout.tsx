import { Stack } from "expo-router";

const Layout=()=>{
    return <Stack screenOptions={{
        headerShown:false,
        
    }}>
        <Stack.Screen name="allChat" />
        <Stack.Screen name="[id]" />
        
    </Stack>
}
export default Layout;