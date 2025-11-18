import { Stack } from "expo-router";
import { LeagueSpartan_400Regular, LeagueSpartan_500Medium,LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(){
    const [loaded] = useFonts({
        LeagueSpartan_400Regular,
        LeagueSpartan_500Medium,
        LeagueSpartan_700Bold,
    });

    useEffect(() => {
        if (loaded) SplashScreen.hideAsync();
    }, [loaded]);

    if (!loaded) return null;

    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen 
                name="createKosScreen" 
                options={{
                    title: 'Create Kos',
                    headerStyle: {backgroundColor: '#55C595'},
                    headerShown: true,
                    headerTintColor: '#fff'
                }}
            />
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    );
}