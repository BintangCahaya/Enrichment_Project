import { CustomButton } from "@/components/customBtn";
import TenantCard from "@/components/tenantCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface Tenant {
  id: number;
  name: string;
  room: string;
  status: string;
}

export default function TenantScreen(){
    const [tenant, setTenant] = useState<Tenant[]>([]);

    const handleAddTenant = () => {
        setTenant([
            { id: 1, name: "Budi", room: "A1", status: "Lunas" },
            { id: 2, name: "Siti", room: "B2", status: "Tidak Lunas" },
            { id: 3, name: "Budi", room: "A1", status: "Lunas" },
            { id: 4, name: "Siti", room: "B2", status: "Tidak Lunas" },
            { id: 5, name: "Budi", room: "A1", status: "Lunas" },
            { id: 6, name: "Siti", room: "B2", status: "Tidak Lunas" },
            { id: 7, name: "Budi", room: "A1", status: "Lunas" },
        ]);
    };

    return(
        <View style={styles.container}>
            {tenant.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={{fontFamily: 'LeagueSpartan_400Regular', color: '#8d8d8d', fontSize: 16}}>No tenant yet</Text>
                    <CustomButton title="ASSIGN TO ROOM" onPress={handleAddTenant} />
                </View>
            ) : (
                <View>
                    <Text style={{marginBottom: 10}}>Filter</Text>
                    <FlatList
                        data={tenant}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <TenantCard tenant={item} />}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});