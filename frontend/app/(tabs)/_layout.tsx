import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { BackHandler } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#55C595', 
      tabBarShowLabel: false,
      headerShown: false
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerShown: true,
          headerStyle: {backgroundColor: '#55C595'},
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
        name="financeScreen"
        options={{
          // title: 'Tenant',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="podium-sharp" color={color} />,
        }}
      />
    </Tabs>
  );
}