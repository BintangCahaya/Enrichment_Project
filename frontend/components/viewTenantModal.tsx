import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "./customBtn";
import { router } from "expo-router";
import PopupHeader from "./popupHeader";

export default function ViewTenantModal({ onClose }: { onClose: () => void }){
    return(
        <View style={styles.container}>
            <PopupHeader title="View Tenant"/>
            <View style={{padding: 10}}>
                <View style={styles.profileContainer}>
                    <Ionicons size={80} name="people-circle-outline" color={'#000000'}/>
                    <View>
                        <Text>Nama</Text>
                        <Text>Male / Female</Text>
                        <Text>Contact Number</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.roomInfo}>
                    <Ionicons size={40} name="key" color={'#55C595'}/>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Room</Text>
                        <Text>001</Text>
                    </View>
                    </View>
                    <View style={styles.contractInfo}>
                    <View style={styles.contractInfoHeader}>
                        <Text>November 2025</Text>
                        <Text style={styles.status}>Lunas</Text>
                    </View>
                    <Text style={{fontSize: 12}}>Kontrak: November - Desember 2025</Text>
                    </View>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <CustomButton title="Go to details" style={{width: '45%'}} onPress={() => router.navigate('/(tabs)/tenants')}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    profileContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingBottom: 20,
        padding: 10
    },
    infoContainer:{
        flexDirection: 'row',
        borderColor: "#000000",
        borderRadius: 10,
        borderWidth: 0.6,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 6
    },
    roomInfo:{
        flexDirection: 'row',
        gap: 10,
        borderRightColor: '#000000',
        borderRightWidth: 0.8,
        paddingRight: 10
    },
    contractInfo: {
        gap: 5,
        paddingRight: 20,
    },
    contractInfoHeader:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    status:{
        backgroundColor: '#55C595',
        padding: 3,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: '#fff'
    },
});