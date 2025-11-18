import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Room {
    id: number | string;
    roomNumber: number | string;
    status: string;
}

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({room, onPress} : any){
    const {id, roomNumber, status} = room;

    return(
        <Pressable style={styles.container} onPress={() => onPress(room)}>
            <Ionicons size={40} name="bed-outline" color={status === 'kosong' ? '#8D8D8D' : '#55C595'}/>
            <Text style={{fontFamily: 'LeagueSpartan_400Regular', fontSize: 22, fontWeight: '700', color: status === 'kosong' ? '#8D8D8D' : '#55C595'}}>{roomNumber}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 0.8,
        gap: 2,
        margin: 10,
        padding: 5,
        borderRadius: 10,
        width: 100,
        backgroundColor: '#fff',
        elevation: 8, // Android
        shadowColor: '#000', // iOS
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        shadowOffset: { width: 0, height: 2 },
    },

});