import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { CustomButton } from "./customBtn";

export default function AddTransactionModal({ onClose }: { onClose: () => void }){
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
                    <CustomButton title="Upload" style={{width: '40%', borderRadius: 0}} onPress={() => alert('button clicked')}/>
                </View>
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