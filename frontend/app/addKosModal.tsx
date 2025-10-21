import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "@/components/imageViewer";
import { useState } from "react";
import { CustomButton } from "@/components/customBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function AddKosModal(){
    const [namaUnit, setNamaUnit] = useState('');
    const [namaArea, setNamaArea] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [waktu, setWaktu] = useState('');
    const [hargaPerBulan, setHargaPerBulan] = useState('');
    const [hargaPerTahun, setHargaPerTahun] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
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
            <View style={styles.formContainer}>
                <Pressable onPress={pickImageAsync}>
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
                    <CustomButton title="+" style={{width: '15%', borderRadius: 10}} onPress={() => alert('Button clicked')}/>
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
            </View>
            <SafeAreaView style={styles.bottomContainer}>
                <View style={[styles.divider, {backgroundColor: '#ccc'}]}/>
                <CustomButton title="Save" style={{width: '60%', alignSelf: 'center'}} onPress={() => router.navigate('/createKosScreen')}/>
            </SafeAreaView>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    formContainer: {
        width: '100%',
        padding: 30
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
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    divider: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: '#ccc',
        marginTop: 20
    }
});