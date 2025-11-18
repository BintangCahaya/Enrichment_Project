import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "@/components/imageViewer";
import { useState } from "react";
import { CustomButton } from "@/components/customBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import TenantCard from "./tenantCard";
import PopupHeader from "./popupHeader";
import { Ionicons } from "@expo/vector-icons";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function AssignTenantModal({ onClose, room }: any){
    const [nama, setNama] = useState('');
    const [jenisKelamin, setJenisKelamin] = useState('');
    const [noTelpon, setNoTelpon] = useState('');
    const [email, setEmail] = useState('');
    const [kamar, setKamar] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <PopupHeader title="Assign Tenant"/>
            <View style={styles.formContainer}>
                <View style={styles.formHeader}>
                    <Pressable onPress={pickImageAsync}>
                        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                    </Pressable>
                    <View style={[styles.roomNumber, {backgroundColor: room.status == 'kosong' ? '#8d8d8d' : '#55C595'}]}>
                        <Ionicons name="bed-outline" size={40} color='#fff'/>
                        <Text style={{fontSize: 20, color: '#fff'}}>{room.roomNumber}</Text>
                    </View>
                </View>
                
                <TextInput
                    style={styles.input}
                    placeholder="Nama" 
                    value={nama}
                    onChangeText={setNama}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Jenis Kelamin" 
                    value={jenisKelamin}
                    onChangeText={setJenisKelamin}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nomor Telepon" 
                    value={noTelpon}
                    onChangeText={setNoTelpon}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Email" 
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Unit Kamar" 
                    value={kamar}
                    onChangeText={setKamar}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Tanggal Akhir Kontrak" 
                    value={tanggal}
                    onChangeText={setTanggal}
                />
            </View>
            <View style={styles.bottomContainer}>
                <CustomButton title="Save" style={{width: '60%', alignSelf: 'center'}} onPress={() => onClose()}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    formContainer: {
        width: '100%',
        padding: 20
    },
    formHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    description: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        height: 120,
        textAlignVertical: "top",
        marginVertical: 10,
        padding: 10
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    roomNumber: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#8d8d8d',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        height: 60,
        alignSelf: 'flex-end'
    },
});