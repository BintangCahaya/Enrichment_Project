import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { CustomButton } from "./customBtn";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

export default function AddTransactionModal({ onClose }: { onClose: () => void }){
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // semua jenis file
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                console.log('User canceled');
                return;
            }

            // Akses file dari result.assets[0]
            const pickedFile = result.assets[0];
            console.log(pickedFile);
            setFile(pickedFile);
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    return(
        <View style={styles.container}>
            <ScrollView
                style={{ flex: 1, padding: 20 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <CustomButton title="income" style={{width: '40%'}} onPress={() => alert('button clicked')}/>
                    <CustomButton title="expense" style={{width: '40%'}} onPress={() => alert('button clicked')}/>
                </View>
                <View style={styles.formInput}>
                    <TextInput placeholder="Tanggal" style={styles.input}/>
                    <TextInput placeholder="Tipe Pembayaran" style={styles.input}/>
                    <TextInput placeholder="Jumlah Pembayaran" style={styles.input}/>
                    <TextInput
                        style={styles.description}
                        placeholder="Deskripsi"
                        // value={deskripsi}
                        // onChangeText={setDeskripsi}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>
                <View style={styles.upload}>
                    <Text>Bukti Pembayaran</Text>
                    <CustomButton title="Upload" style={{width: '40%', borderRadius: 0}} onPress={() => pickDocument()}/>
                </View>
                {file && (
                    <View style={{ marginTop: 20 }}>
                        <Text>Nama File: {file.name}</Text>
                        <Text>Tipe: {file.mimeType}</Text>
                        <Text>Ukuran: {(file.size ?? 0) / 1024} KB</Text>
                        <Text>URI: {file.uri}</Text>
                    </View>
                )}
            </ScrollView>
                
            <View style={styles.bottomContainer}>
                {/* <View style={[styles.divider, {backgroundColor: '#ccc'}]}/> */}
                <CustomButton title="Save" style={{width: '60%', alignSelf: 'center'}} onPress={() => onClose()}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    formInput: {

    },
    input: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 0.6,
        padding: 10,
        marginVertical: 5
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
    upload: {
        padding: 10
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
    },
});