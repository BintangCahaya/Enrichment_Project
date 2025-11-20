import { CustomButton } from "@/components/customBtn";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "@/components/imageViewer";
import CustomPopup from "@/components/customPopup";
import AddRoomModal from "@/components/addRoomModal";
import DropDown from "@/components/dropDown";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function CreateKosScreen(){
    const [namaKos, setNamaKos] = useState('');
    const [alamat, setAlamat] = useState('');
    const [kontak, setKontak] = useState('');
    const [metode, setMetode] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [showPopup, setShowPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const [namaBank, setNamaBank] = useState('');
    const [nomorBank, setNomorBank] = useState('');

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
        <View style={styles.container}>
            <ScrollView style={styles.formContainer}>
                <Pressable onPress={pickImageAsync}>
                    <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                </Pressable>
                <TextInput
                    style={styles.input}
                    placeholder="Nama Kos" 
                    value={namaKos}
                    onChangeText={setNamaKos}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Alamat" 
                    value={alamat}
                    onChangeText={setAlamat}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Kontak" 
                    value={kontak}
                    onChangeText={setKontak}
                />
                <DropDown title="Payment Method">
                    <TextInput 
                        style={[styles.input, {width: '90%', alignSelf: 'flex-end'}]}
                        placeholder="Nama Bank" 
                        value={namaBank}
                        onChangeText={setNamaBank}
                    />
                    <TextInput 
                        style={[styles.input, {width: '90%', alignSelf: 'flex-end'}]}
                        placeholder="Nomor Bank" 
                        value={nomorBank}
                        onChangeText={setNomorBank}
                    />
                </DropDown>
                <View style={styles.divider}/>
                <View style={{alignItems: 'flex-end'}}>
                    <CustomButton title="Add Room" buttonStyle={{width: '30%', borderRadius: 30}} textStyle={{fontSize: 15}} onPress={() => setShowPopup(true)}/>
                </View>
                <CustomPopup style={{height: '80%'}} visible={showPopup} onClose={() => setShowPopup(false)}>
                    <AddRoomModal onClose={() => setShowPopup(false)}/>
                </CustomPopup>
                <View style={styles.roomInfoContainer}>
                    <Text>Room 001</Text>
                    <Text>Edit detail</Text>
                </View>
            </ScrollView>
            <SafeAreaView style={styles.bottomContainer}>
                <View style={[styles.divider, {backgroundColor: '#ccc'}]}/>
                <CustomButton title="Submit" buttonStyle={{width: '60%', alignSelf: 'center'}} onPress={() => router.navigate('/(tabs)')}/>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        borderColor: '#8d8d8d',
        borderWidth: 1,
        fontFamily: 'LeagueSpartan_400Regular'
    },
    divider: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: '#8d8d8d',
        marginTop: 20
    },
    roomInfoContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.7,
        padding: 20,
        borderRadius: 10
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
});