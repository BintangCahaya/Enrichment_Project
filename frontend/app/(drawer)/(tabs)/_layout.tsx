import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useNavigation } from "expo-router";
import { BackHandler, Pressable } from "react-native";

export default function TabsLayout() {

  const navigation = useNavigation<any>();
  
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#55C595', 
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        borderTopColor: '#000000',
        borderTopWidth: 0.7,
        height: 85,
        paddingTop: 5
      },
      headerLeft: () => (
        <Pressable onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} style={{ marginLeft: 20, marginRight: 20, color: '#fff' }} />
        </Pressable>
      ),
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerShown: true,
          headerStyle: {backgroundColor: '#55C595',},
          headerTitleStyle: {fontFamily: 'LeagueSpartan_700Bold', fontSize: 24, fontWeight: 'bold', },
          headerTintColor: '#fff',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tenants"
        options={{
          title: 'Tenant',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="people-sharp" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rooms"
        options={{
          title: 'Room',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="logo-windows" color={color} />,
        }}
      />
      <Tabs.Screen
        name="finances"
        options={{
          // title: 'Tenant',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="podium-sharp" color={color} />,
        }}
      />
    </Tabs>
  );
}