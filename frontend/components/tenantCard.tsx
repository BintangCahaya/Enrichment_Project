import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "./customBtn";
import { router } from "expo-router";

interface Tenant {
  id: string | number;
  name: string;
  room: string;
  status: string;
}

interface TenantCardProps {
  tenant: Tenant;
}

export default function TenantCard({tenant} : TenantCardProps){
    const {id, name, room, status} = tenant;
    return(
        <View style={styles.cardContainer}>
            <View style={styles.profileContainer}>
                <Ionicons size={60} name="people-circle-outline" color={'#000000'}/>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.room}>{room}</Text>
                    <Text style={{color: status === 'Aktif' ? 'green' : 'red'}}>{status}</Text>
                </View>
            </View>
            <CustomButton title="Details" style={{width: 80}} onPress={() => router.push(`/(tabs)/tenants/${id}`)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: '#000000',
        borderWidth: 0.4,
        width: '100%',
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        elevation: 8,
        backgroundColor: '#fff',
    },
    profileContainer:{ 
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    name: {
        fontSize: 18,
        fontFamily: 'league spartan',
        fontWeight: 'bold',
        color: '#787878'
    },
    room: {
        color: '#b4b4b4'
    },
    status: {

    }
});