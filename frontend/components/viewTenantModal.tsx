import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "./customBtn";
import { router } from "expo-router";
import PopupHeader from "./popupHeader";
import { Icon } from "react-native-paper";

export default function ViewTenantModal({ onClose }: { onClose: () => void }){
    return(
        <View style={styles.container}>
            <PopupHeader title="View Tenant"/>
            <View style={{padding: 10}}>
                <View style={styles.profileContainer}>
                    <Ionicons size={100} name="people-circle-outline" color={'#000000'}/>
                    <View>
                        <Text style={[styles.globalText, {fontSize: 20}]}>Nama</Text>
                        <Text style={styles.globalText}>Male / Female</Text>
                        <Text style={styles.globalText}>Contact Number</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.roomInfo}>
                    <View style={{transform: [{rotate: '45deg'}]}}>
                        <Icon size={40} source="key-variant" color={'#55C595'}/>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.globalText, {color: '#55C595', marginBottom: 5}]}>Room</Text>
                        <Text style={[styles.globalText, {color: '#55C595', fontSize: 32, lineHeight: 30}]}>001</Text>
                    </View>
                    </View>
                    <View style={styles.contractInfo}>
                    <View style={styles.contractInfoHeader}>
                        <Text style={[styles.globalText, {color: '#55C595'}]}>November 2025</Text>
                        <Text style={styles.status}>Lunas</Text>
                    </View>
                    <Text style={styles.globalText}>Kontrak: November - Desember 2025</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <CustomButton title="Go to details" buttonStyle={{width: '45%'}} onPress={() => router.navigate('/(tabs)/tenants')}/>
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
        borderColor: "#8d8d8d",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        gap: 15,
        backgroundColor: '#fff',
        elevation: 6
    },
    roomInfo:{
        flexDirection: 'row',
        gap: 10,
        borderRightColor: '#8d8d8d',
        borderRightWidth: 1,
        paddingRight: 10,
        alignItems: 'center'
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
        backgroundColor: '#0FB800',
        padding: 3,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: '#fff'
    },
    bottom: {
        alignItems: 'flex-end',
        padding: 10
    },
    globalText: {
        fontFamily: 'LeagueSpartan_400Regular', 
        fontSize: 14,
        color: '#8d8d8d'
    }
});