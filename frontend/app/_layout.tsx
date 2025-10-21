import { Stack } from "expo-router";

export default function RootLayout(){
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen 
                name="createKosScreen" 
                options={{
                    title: 'Create Kos',
                    headerStyle: {backgroundColor: '#55C595'},
                    headerTintColor: '#fff'
                }}
            />
            <Stack.Screen
                name="addKosModal"
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    );
}