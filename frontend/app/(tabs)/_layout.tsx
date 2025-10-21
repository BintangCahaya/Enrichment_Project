import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#55C595', tabBarShowLabel: false, }}>
      <Tabs.Screen
        name="homeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tenantScreen"
        options={{
          title: 'Tenant',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="people-sharp" color={color} />,
        }}
      />
      <Tabs.Screen
        name="roomScreen"
        options={{
          title: '',
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