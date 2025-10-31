import CustomPopup from "@/components/customPopup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";
import { CustomButton } from "./customBtn";

export default function RoomDetailModal({ visible, onClose, room }: any) {
  if (!room) return null;

  return (
    <CustomPopup style={{width: '90%', height: '50%'}} visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={[styles.roomNumber, {backgroundColor: room.status == 'kosong' ? '#8d8d8d' : '#55C595'}]}>
            <Ionicons name="bed-outline" size={40} color='#fff'/>
            <Text style={{fontSize: 20, color: '#fff'}}>{room.roomNumber}</Text>
          </View>
          <Text style={[styles.headerText, {color: room.status == 'kosong' ? '#8d8d8d' : '#55C595'}]}>{room.status}</Text>
          <CustomButton title="Assign Tenant" style={{width: '40%', marginLeft: 10, borderRadius: 15}} onPress={() => alert('button clicked')}/>
        </View>
        <View style={styles.sewaContainer}>
          <Text style={{color: '#55C595'}}>Sewa: </Text>
          <View>
            <Text>Rp. 2.000.000,- / bulan</Text>
            <Text>Rp. 5.000.000,- / Tahun</Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#55C595', marginBottom: 5}}>Spesifikasi: </Text>
          <Text>Lantai 2, Luas 5x20m, AC, kamar mandi dalam, full furnished</Text>
        </View>
      </View>
      <CustomButton title="Edit kamar" style={{width: '30%', alignSelf: 'flex-end', marginRight: 20, borderRadius: 15}} onPress={() => alert('button clicked')}/>
    </CustomPopup>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
    paddingBottom: 20
  },
  roomNumber: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#8d8d8d',
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10
  },
  headerText: {
    fontSize: 24,
    color: '#8d8d8d'
  },
  sewaContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    gap: 20,
  },
  hargaContainer: {

  },
  spesifikasi: {

  }
});
