import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { Pressable } from "react-native";

export default function RoomsLayout(){

    const navigation = useNavigation<any>();

    return(
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: '#55C595'},
            headerTitleStyle: {fontFamily: 'LeagueSpartan_700Bold', fontSize: 24, fontWeight: 'bold', },
            headerTintColor: '#fff',
        }}>
            <Stack.Screen 
                name="index" 
                options={{
                    title: 'Rooms',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.openDrawer()}>
                            <Ionicons name="menu" size={24} style={{ marginLeft: 10, marginRight: 20, color: '#fff' }} />
                        </Pressable>
                    ),
                }}
            />
        </Stack>
    );
}