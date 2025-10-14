import { HeaderTitle } from "@react-navigation/elements";
import { Stack } from "expo-router";

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen 
                name="createKosScreen" options={{
                    title: 'Create Kos',
                    headerStyle: {backgroundColor: '#5A0'},
                    headerTintColor: '#fff'
                }}
            />
        </Stack>
    );
}