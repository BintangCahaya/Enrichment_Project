import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "@/components/imageViewer";
import { useState } from "react";
import { CustomButton } from "@/components/customBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import PopupHeader from "./popupHeader";
import { Kos } from "@/types/Kos";
import { Room } from "@/types/Room";
import { roomApi } from "@/api/room.api";
import axios from "axios";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function AddRoomModal({ onClose }: { onClose: () => void }){
    // const [namaUnit, setNamaUnit] = useState('');
    // const [namaArea, setNamaArea] = useState('');
    // const [jumlah, setJumlah] = useState('');
    // const [waktu, setWaktu] = useState('');
    // const [hargaPerBulan, setHargaPerBulan] = useState('');
    // const [hargaPerTahun, setHargaPerTahun] = useState('');
    // const [deskripsi, setDeskripsi] = useState('');
    // const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [showPopup, setShowPopup] = useState(true);
    const [form, setForm] = useState({
        room_name: '',
        area: '',
        price: '',
        price_yearly: '',
        status: '',
        description: '',
        image_url: '',
    })

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            handleChange('image_url', result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const handleChange = (key: keyof typeof form, value: string) => {
        setForm((prev) => ({...prev, [key]: value}))
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                room_name: form.room_name,
                area: form.area,
                price: form.price,
                price_yearly: form.price_yearly,
                status: form.status,
                description: form.description,
                image_url: form.image_url,
            };

            const response = await roomApi.addRoom(1, payload);
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
            <PopupHeader title="Add Room"/>
            <View style={styles.formContainer}>
                <Pressable onPress={pickImageAsync}>
                    <ImageViewer imgSource={PlaceholderImage} selectedImage={form.image_url} />
                </Pressable>
                <TextInput
                    style={styles.input}
                    placeholder="Nama Unit" 
                    value={form.room_name}
                    onChangeText={(text) => handleChange('room_name',text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Area" 
                    value={form.area}
                    onChangeText={(text) => handleChange('area',text)}
                />
                <View style={styles.detailContainer}>
                    <TextInput 
                        style={[styles.input, {width: '45%'}]}
                        placeholder="Jumlah" 
                        // value={jumlah}
                        // onChangeText={setJumlah}
                    />
                    <TextInput 
                        style={[styles.input, {width: '35%'}]}
                        placeholder="Waktu" 
                        // value={waktu}
                        // onChangeText={setWaktu}
                    />
                    <CustomButton title="+" buttonStyle={{width: '15%', borderRadius: 10}} onPress={() => alert('Button clicked')}/>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Harga Sewa 1 Bulan" 
                    value={form.price}
                    onChangeText={(text) => handleChange('price',text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Harga Sewa 1 Tahun" 
                    value={form.price_yearly}
                    onChangeText={(text) => handleChange('price_yearly',text)}
                />
                <TextInput
                    style={styles.description}
                    placeholder="Deskripsi & Fasilitas"
                    value={form.description}
                    onChangeText={(text) => handleChange('description',text)}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={[styles.divider, {backgroundColor: '#ccc'}]}/>
                <CustomButton title="Save" buttonStyle={{width: '60%', alignSelf: 'center'}} onPress={handleSubmit}/>
            </View>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    formContainer: {
        width: '100%',
        padding: 20
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
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
        justifyContent: 'flex-end',
        width: '100%',
        // marginTop: 40,
    },
    divider: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: '#ccc',
        marginTop: 20
    }
});