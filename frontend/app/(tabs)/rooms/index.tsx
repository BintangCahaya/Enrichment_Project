import { CustomButton } from "@/components/customBtn";
import RoomCard from "@/components/roomCard";
import RoomDetailModal from "@/components/roomDetailModal";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface Room {
  id: number;
  roomNumber: string;
  status: string;
}

export default function RoomScreen(){
    const [room, setRoom] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    
    const handleAddRoom = () => {
        setRoom([
            { id: 1, roomNumber: "A1", status: "kosong" },
            { id: 2, roomNumber: "B1", status: "terisi" },
            { id: 3, roomNumber: "A2", status: "terisi" },
            { id: 4, roomNumber: "B2", status: "terisi" },
            { id: 5, roomNumber: "A3", status: "kosong" },
            { id: 6, roomNumber: "B3", status: "terisi" },
            { id: 7, roomNumber: "B4", status: "terisi" },
        ]);
    };

    const handleCardPress = (room: Room) => {
        setSelectedRoom(room);
        setModalVisible(true);
    };

    return(
        <>
            {room.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text>You dont have any room</Text>
                    <CustomButton title="ADD ROOM" style={{width: '40%'}} onPress={handleAddRoom} />
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoDetailContainer}>
                                <Text style={styles.terisiHeader}>Terisi</Text>
                                <Text style={styles.terisi}>{room.filter((r) => r.status === "terisi").length}</Text>
                            </View>
                            <View style={styles.divider}></View>
                            <View style={styles.infoDetailContainer}>
                                <Text style={styles.kosongHeader}>Kosong</Text>
                                <Text style={styles.kosong}>{room.filter((r) => r.status === "kosong").length}</Text>
                            </View>              
                        </View>
                        <View style={{width: 100, alignItems: 'center'}}>
                            <View style={styles.totalContainer}>
                                <Text>{room.length}</Text>
                                <Text>Kamar</Text>
                            </View>
                            <CustomButton title="Kamar" style={{width: '90%', borderRadius: 10}} onPress={() => alert('Button clicked')} icon="add-outline"/>
                        </View>
                    </View>
                    <View style={styles.roomList}>
                        <FlatList
                            data={room}
                            numColumns={3}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <RoomCard room={item} onPress={handleCardPress}/>}
                        />
                    </View>
                    <RoomDetailModal
                        visible={isModalVisible}
                        onClose={() => setModalVisible(false)}
                        room={selectedRoom}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 10
    },
    infoContainer: {
        borderColor: '#000000',
        borderWidth: 0.8,
        borderRadius: 12,
        flexDirection: 'row'
    },
    infoDetailContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5
    },
    divider: {
        borderColor: '#000A00',
        borderWidth: 0.2,
        height: '80%',
        alignSelf: 'center'
    },
    terisiHeader: {
        fontSize: 18,
        color: '#55C595'
    },
    kosongHeader: {
        fontSize: 18,
        color: '#8D8D8D'
    },
    terisi: {
        fontSize: 48,
        color: '#55C595'
    },
    kosong: {
        fontSize: 48,
        color: '#8D8D8D'
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 0.7,
        padding: 10,
        gap: 5,
        width: '100%',
    },
    roomList: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});