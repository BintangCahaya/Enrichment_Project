import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useNavigation } from "expo-router";
import { Pressable } from "react-native";

export default function AsssetsStack() {

    const navigation = useNavigation<any>();
    return (
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {backgroundColor: '#55c595'},
          headerTitleStyle: {fontFamily: 'LeagueSpartan_700Bold', fontSize: 24, fontWeight: 'bold', },
          headerTintColor: '#fff',
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} style={{ marginLeft: 10, marginRight: 20, color: '#fff' }} />
            </Pressable>
          ),
        }}
      >
        <Stack.Screen
          name="index" 
          options={{
              title: 'Assets',
          }}
        />
      </Stack>
    );
}
