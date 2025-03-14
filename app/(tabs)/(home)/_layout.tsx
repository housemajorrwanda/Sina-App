import { Stack } from "expo-router";

const Layout=()=>{
    return <Stack initialRouteName="home" screenOptions={{
        headerShown:false,
        
    }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="[id]" />
        
    </Stack>
}
export default Layout;