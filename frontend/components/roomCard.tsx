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
            <Ionicons size={40} name="bed-outline" color={status === 'kosong' ? '8D8D8D' : 'green'}/>
            <Text style={{color: status === 'kosong' ? '8D8D8D' : 'green'}}>{roomNumber}</Text>
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
        width: 100
    },

});