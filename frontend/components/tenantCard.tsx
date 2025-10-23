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
            <Ionicons size={40} name="people-circle-outline" color={'#000000'}/>
            <View style={styles.infoContainer}>
                <Text>{name}</Text>
                <Text>{room}</Text>
                <Text>{status}</Text>
            </View>
            <CustomButton title="Details" style={{width: 80}} onPress={() => router.push(`/(tabs)/tenants/${id}`)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 0.5,
        width: '100%',
        marginVertical: 10
    },
    profileContainer:{ 

    },
    infoContainer: {

    },
    btn: {

    },
});