import { roomApi } from "@/api/room.api";
import AddRoomModal from "@/components/addRoomModal";
import { CustomButton } from "@/components/customBtn";
import CustomPopup from "@/components/customPopup";
import RoomCard from "@/components/roomCard";
import RoomDetailModal from "@/components/roomDetailModal";
import { Room } from "@/types/Room";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function RoomScreen(){
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isDetailVisible, setDetailVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    
    const fetchRooms = async () => {
        try {
            const response = await roomApi.getRoom(1);
            setRooms(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.status); // 400
                console.log(error.response?.data);   // pesan dari backend
            }
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleCardPress = (room: Room) => {
        setSelectedRoom(room);
        setDetailVisible(true);
    };

    return(
        <>
            {rooms.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style= {{fontFamily: 'LeagueSpartan_400Regular', color: '#8d8d8d', fontSize: 16}}>You don't have any room</Text>
                    <CustomButton title="ADD ROOM" buttonStyle={{width: '40%'}} onPress={() => setAddVisible(true)} />
                    <CustomPopup style={{height: '85%'}} visible={isAddVisible} onClose={() => setAddVisible(false)}>
                        <AddRoomModal onClose={() => setAddVisible(false)}/>
                    </CustomPopup>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.infoContainer}>
                            <View style={[styles.infoDetailContainer, {paddingHorizontal: 40}]}>
                                <Text style={styles.terisiHeader}>Terisi</Text>
                                <Text style={styles.terisi}>{rooms.filter((r) => r.status === "Occupied").length}</Text>
                            </View>
                            <View style={styles.divider}></View>
                            <View style={styles.infoDetailContainer}>
                                <Text style={styles.kosongHeader}>Kosong</Text>
                                <Text style={styles.kosong}>{rooms.filter((r) => r.status === "Available").length}</Text>
                            </View>              
                        </View>
                        <View style={{alignItems: 'center', width: '33%'}}>
                            <View style={styles.totalContainer}>
                                <Text style={[styles.total]}>{rooms.length}</Text>
                                <Text style={[styles.total, {fontSize: 20, color: '#8d8d8d'}]}>Kamar</Text>
                            </View>
                            <CustomButton title="+ Kamar" buttonStyle={{width: '75%', borderRadius: 10}} onPress={() => setAddVisible(true)} />
                        </View>
                    </View>
                    <View style={styles.roomList}>
                        <FlatList
                            data={rooms}
                            numColumns={3}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <RoomCard room={item} onPress={handleCardPress}/>}
                        />
                    </View>
                    <RoomDetailModal
                        visible={isDetailVisible}
                        onClose={() => setDetailVisible(false)}
                        room={selectedRoom}
                    />
                    <CustomPopup style={{height: '85%'}} visible={isAddVisible} onClose={() => setAddVisible(false)}>
                        <AddRoomModal onClose={() => setAddVisible(false)}/>
                    </CustomPopup>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    headerContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 10
    },
    infoContainer: {
        borderColor: '#8d8d8d',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: 'row',
        elevation: 8, // Android
        shadowColor: '#000', // iOS
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        shadowOffset: { width: 0, height: 2 },
    },
    infoDetailContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5,
    },
    divider: {
        borderColor: '#8d8d8d',
        borderWidth: 0.7,
        height: '80%',
        alignSelf: 'center'
    },
    terisiHeader: {
        fontSize: 18,
        color: '#55C595',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    kosongHeader: {
        fontSize: 20,
        color: '#8D8D8D',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    terisi: {
        fontSize: 50,
        lineHeight: 46,
        marginTop: 10,
        color: '#55C595',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    kosong: {
        fontSize: 48,
        lineHeight: 46,
        marginTop: 10,
        color: '#8D8D8D',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#8d8d8d',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 10,
        gap: 10,
        width: '100%',
        elevation: 8, // Android
        shadowColor: '#000', // iOS
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        shadowOffset: { width: 0, height: 2 },
    },
    total: {
        fontSize: 28,
        lineHeight: 22,
        color: '#55C595',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    roomList: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});