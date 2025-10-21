import { CustomButton } from "@/components/customBtn";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "@/components/imageViewer";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function CreateKosScreen(){
    const [namaKos, setNamaKos] = useState('');
    const [alamat, setAlamat] = useState('');
    const [kontak, setKontak] = useState('');
    const [metode, setMetode] = useState('');
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
                <TextInput 
                    style={styles.input}
                    placeholder="Payment Method" 
                    value={metode}
                    onChangeText={setMetode}
                />
                <View style={styles.divider}/>
                <View style={{alignItems: 'flex-end'}}>
                    <CustomButton title="Add Room" style={{width: '40%'}} onPress={() => router.navigate('/addKosModal')}/>
                </View>
                <View style={styles.roomInfoContainer}>
                    <Text>Room 001</Text>
                    <Text>Edit detail</Text>
                </View>
            </View>
            <SafeAreaView style={styles.bottomContainer}>
                <View style={[styles.divider, {backgroundColor: '#ccc'}]}/>
                <CustomButton title="Submit" style={{width: '60%', alignSelf: 'center'}} onPress={() => router.navigate('/homeScreen')}/>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    divider: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: '#ccc',
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