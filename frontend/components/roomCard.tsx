import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function RoomCard({room, onPress} : any){
    const {id, roomNumber, status} = room;
    const bedIcon = require('@/assets/images/bed.png');

    return(
        <Pressable style={styles.container} onPress={() => onPress(room)}>
            <Image source={bedIcon} style={{tintColor: status === 'kosong' ? '#8D8D8D' : '#55C595', height: 40, width: 40}}/>
            <Text style={[styles.roomNumber, {color: status === 'kosong' ? '#8D8D8D' : '#55C595'}]}>{roomNumber}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8,
        borderColor: '#8d8d8d',
        gap: 10,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        width: 100,
        backgroundColor: '#fff',
        elevation: 8, // Android
        shadowColor: '#000', // iOS
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        shadowOffset: { width: 0, height: 2 },
    },
    roomNumber: {
        fontFamily: 'LeagueSpartan_400Regular', 
        fontSize: 22, 
        lineHeight: 18, 
        textAlign: 'center', 
        marginTop: 5
    }
});