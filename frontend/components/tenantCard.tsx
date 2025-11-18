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
                    <Text style={{fontFamily: 'LeagueSpartan_400Regular', color: status === 'Lunas' ? '#0FB800' : 'red'}}>{status}</Text>
                </View>
            </View>
            <CustomButton title="Details" style={{width: 90, borderRadius: 18}} onPress={() => router.push(`/(tabs)/tenants/${id}`)}/>
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
        fontFamily: 'LeagueSpartan_700Bold',
        fontWeight: 'bold',
        color: '#8d8d8d'
    },
    room: {
        color: '#8d8d8d',
        fontFamily: 'LeagueSpartan_400Regular',
    },
    status: {

    }
});