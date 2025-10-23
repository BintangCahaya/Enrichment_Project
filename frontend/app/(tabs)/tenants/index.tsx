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
            { id: 1, name: "Budi", room: "A1", status: "Aktif" },
            { id: 2, name: "Siti", room: "B2", status: "Tidak Aktif" },
        ]);
    };

    return(
        <View style={styles.container}>
            {tenant.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text>Belum ada tenant.</Text>
                    <CustomButton title="ASSIGN TO ROOM" onPress={handleAddTenant} />
                </View>
            ) : (
                <FlatList
                    data={tenant}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TenantCard tenant={item} />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 0.5,
        width: '100%',
    },
    profileContainer:{ 

    },
    infoContainer: {

    },
    btn: {

    }
});