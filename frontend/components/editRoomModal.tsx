import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "@/components/imageViewer";
import { useState } from "react";
import { CustomButton } from "@/components/customBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import TenantCard from "./tenantCard";
import PopupHeader from "./popupHeader";
import { roomApi } from "@/api/room.api";
import { Room } from "@/types/Room";
import axios from "axios";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function EditRoomModal({ onClose, room }: { onClose: () => void, room: Room }){
    const [namaUnit, setNamaUnit] = useState(room.room_name);
    const [namaArea, setNamaArea] = useState(room.area);
    const [jumlah, setJumlah] = useState('');
    const [waktu, setWaktu] = useState('');
    const [hargaPerBulan, setHargaPerBulan] = useState<string>('');
    const [hargaPerTahun, setHargaPerTahun] = useState<string>('');
    const [deskripsi, setDeskripsi] = useState(room.description);
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

    const handleDelete = async () => {
        try {

            const response = await roomApi.deleteRoom(room.id);
            alert('Success');
            onClose();
            router.navigate('/(drawer)/(tabs)');
        } catch (error : any) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.status); // 400
                console.log(error.response?.data);   // pesan dari backend
            }
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <PopupHeader title="Edit Room"/>
            <View style={styles.formContainer}>
                <Pressable style={{marginBottom: 10}} onPress={pickImageAsync}>
                    <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                </Pressable>
                <TextInput
                    style={styles.input}
                    placeholder="Nama Unit" 
                    value={namaUnit}
                    onChangeText={setNamaUnit}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Area" 
                    value={namaArea}
                    onChangeText={setNamaArea}
                />
                <View style={styles.detailContainer}>
                    <TextInput 
                        style={[styles.input, {width: '45%'}]}
                        placeholder="Jumlah" 
                        value={jumlah}
                        onChangeText={setJumlah}
                    />
                    <TextInput 
                        style={[styles.input, {width: '35%'}]}
                        placeholder="Waktu" 
                        value={waktu}
                        onChangeText={setWaktu}
                    />
                    <CustomButton title="+" buttonStyle={{width: '15%', borderRadius: 10}} onPress={() => alert('Button clicked')}/>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Harga Sewa 1 Bulan" 
                    value={hargaPerBulan}
                    onChangeText={setHargaPerBulan}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Harga Sewa 1 Tahun" 
                    value={hargaPerTahun}
                    onChangeText={setHargaPerTahun}
                />
                <TextInput
                    style={styles.description}
                    placeholder="Deskripsi & Fasilitas"
                    value={deskripsi}
                    onChangeText={setDeskripsi}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />
                <View style={{alignItems: 'center'}}>
                    <CustomButton title="Remove Room" buttonStyle={{backgroundColor: 'red', width: '80%'}} onPress={handleDelete}/>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <CustomButton title="Save" buttonStyle={{width: '60%', alignSelf: 'center'}} onPress={() => onClose()}/>
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
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#8d8d8d',
        borderWidth: 1,
        fontFamily: 'LeagueSpartan_400Regular'
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    description: {
        borderWidth: 1,
        borderColor: "#8d8d8d",
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
        borderWidth: 0.7,
        borderColor: '#8d8d8d',
    },
});