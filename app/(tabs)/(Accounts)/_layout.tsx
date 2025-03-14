import { Stack } from "expo-router";

const Layout=()=>{
    return <Stack initialRouteName="accounts" screenOptions={{
        headerShown:false,
        
    }}>
        <Stack.Screen name="accounts" />
        {/* <Stack.Screen name="[id]" /> */}
        
    </Stack>
}
export default Layout;