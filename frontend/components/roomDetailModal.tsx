import CustomPopup from "@/components/customPopup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Image } from "react-native";
import { CustomButton } from "./customBtn";
import { useState } from "react";
import EditRoomModal from "./editRoomModal";
import AssignTenantModal from "./assignTenantModal";
import ViewTenantModal from "./viewTenantModal";

export default function RoomDetailModal({ visible, onClose, room }: any) {
  if (!room) return null;

  const bedIcon = require('@/assets/images/bed.png');

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isAssignModalVisible, setAssignModalVisible] = useState(false);
  const [isViewModalVisible, setViewModalVisible] = useState(false);

  return (
    <CustomPopup style={{height: '40%'}} visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View style={[styles.roomNumber, {backgroundColor: room.status == 'kosong' ? '#8d8d8d' : '#55C595'}]}>
              <Image source={bedIcon} tintColor='#fff'/>
              <Text style={[styles.globalText, {color: '#fff'}]}>{room.roomNumber}</Text>
            </View>
            <Text style={[styles.globalText, {color: room.status == 'kosong' ? '#8d8d8d' : '#55C595', fontSize: 30, lineHeight: 28}]}>{room.status}</Text>
          </View>
          {room.status === 'terisi' ? (
            <CustomButton title="View Tenant" buttonStyle={{width: '40%', borderRadius: 15}} onPress={() => setViewModalVisible(true)}/>
          ) : (
            <CustomButton title="Assign Tenant" buttonStyle={{borderRadius: 15}} onPress={() => setAssignModalVisible(true)}/>
          )}
        </View>
        <View style={styles.sewaContainer}>
          <Text style={[styles.globalText, {color: '#55C595', fontSize: 18}]}>Sewa: </Text>
          <View>
            <Text style={[styles.globalText, {fontSize: 18}]}>Rp. 2.000.000,- / bulan</Text>
            <Text style={[styles.globalText, {fontSize: 18}]}>Rp. 5.000.000,- / Tahun</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.globalText, {color: '#55C595', marginBottom: 5, fontSize: 18}]}>Spesifikasi: </Text>
          <Text style={[styles.globalText, {fontSize: 15}]}>Lantai 2, Luas 5x20m, AC, kamar mandi dalam, full furnished</Text>
        </View>
      </View>
      <CustomButton title="Edit kamar" buttonStyle={{width: '30%', alignSelf: 'flex-end', marginRight: 20, borderRadius: 15}} onPress={() => setEditModalVisible(true)}/>
      <CustomPopup style={{height: '85%'}} visible={isEditModalVisible} onClose={() => setEditModalVisible(false)}>
        <EditRoomModal onClose={() => setEditModalVisible(false)}/>
      </CustomPopup>
      <CustomPopup style={{height: '70%'}} visible={isAssignModalVisible} onClose={() => setAssignModalVisible(false)}>
        <AssignTenantModal room={room} onClose={() => setAssignModalVisible(false)}/>
      </CustomPopup>
      <CustomPopup style={{height: '45%'}} visible={isViewModalVisible} onClose={() => setViewModalVisible(false)}>
        <ViewTenantModal onClose={() => setViewModalVisible(false)}/>
      </CustomPopup>
    </CustomPopup>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },
  roomNumber: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#8d8d8d',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10
  },
  sewaContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    gap: 20,
  },
  globalText: {
    fontFamily: 'LeagueSpartan_400Regular', 
    fontSize: 22, 
    lineHeight: 18,
    marginTop: 5
  }
});
