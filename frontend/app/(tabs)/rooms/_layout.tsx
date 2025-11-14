import { Stack } from "expo-router";

export default function RoomsLayout(){
    return(
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: '#55C595'},
            headerTintColor: '#fff'
        }}>
            <Stack.Screen name="index" options={{title: 'Rooms'}}/>
        </Stack>
    );
}