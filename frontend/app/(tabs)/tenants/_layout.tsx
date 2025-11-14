import { Stack } from "expo-router";

export default function TenantsLayout(){
    return(
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: '#55C595'},
            headerTintColor: '#fff'
        }}>
            <Stack.Screen name="index" options={{title: 'Tenants'}}/>
            <Stack.Screen name="[id]" options={{title: 'Tenants Details'}}/>
        </Stack>
    );
}