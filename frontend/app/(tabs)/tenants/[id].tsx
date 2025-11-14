import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomButton } from '@/components/customBtn';
import CustomPopup from '@/components/customPopup';
import AddRoomModal from '@/components/addRoomModal';
import EditTenantModal from '@/components/editTenantModal';

export default function TenantDetails() {
  const { id, name, room, status} = useLocalSearchParams<{
      id: string;
      name: string;
      room: string;
      status: string;
  }>();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <View style={styles.container}>
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
      <CustomButton title='Edit' style={{width: '20%', alignSelf: 'flex-end', borderRadius: 15}} onPress={() => setShowPopup(true)}/>
      <CustomPopup style={{width: '90%', height: '75%'}} visible={showPopup} onClose={() => setShowPopup(false)}>
          <EditTenantModal onClose={() => setShowPopup(false)}/>
      </CustomPopup>
      <View style={styles.historyContainer}>
        <Text>Riwayat Transaksi</Text>
        <View style={styles.historyCard}>
          <View style={styles.transactionInfo}>
            <Text style={{fontSize: 24, fontWeight: "400"}}>Rp 2.000.000,-</Text>
            <Text>10 Oktober 2025</Text>
          </View>
          <CustomButton title='Receipt' style={{width: '25%', height: 45}} onPress={() => alert("button clicked")}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      padding: 20,
      backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingBottom: 20
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
  historyContainer: {

  },
  historyCard: {
    borderColor: '#000000',
    borderWidth: 0.8,
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 6
  },
  transactionInfo:{
    padding: 10
  }
});
