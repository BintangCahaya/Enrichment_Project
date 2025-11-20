import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomButton } from '@/components/customBtn';
import CustomPopup from '@/components/customPopup';
import AddRoomModal from '@/components/addRoomModal';
import EditTenantModal from '@/components/editTenantModal';
import { Icon } from 'react-native-paper';

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
      <CustomButton title='Edit' buttonStyle={{width: '25%', alignSelf: 'flex-end', borderRadius: 15}} onPress={() => setShowPopup(true)}/>
      <CustomPopup style={{height: '75%'}} visible={showPopup} onClose={() => setShowPopup(false)}>
          <EditTenantModal onClose={() => setShowPopup(false)}/>
      </CustomPopup>
      <View>
        <Text style={[styles.globalText, {fontSize: 20, color: '#000000'}]}>Riwayat Transaksi</Text>
        <View style={styles.historyCard}>
          <View style={styles.transactionInfo}>
            <Text style={[styles.globalText, {fontSize: 24, color: '#000000'}]}>Rp 2.000.000,-</Text>
            <Text style={styles.globalText}>10 Oktober 2025</Text>
          </View>
          <CustomButton title='Receipt' buttonStyle={{width: '25%', height: 38, borderRadius: 30}} onPress={() => alert("button clicked")}/>
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
  historyCard: {
    borderColor: '#8d8d8d',
    borderWidth: 0.7,
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 6
  },
  transactionInfo:{
    padding: 10
  },
  globalText: {
    fontFamily: 'LeagueSpartan_400Regular',
    color: '#8d8d8d',
    fontSize: 14
  }
});
