import { StyleSheet, TextInput, View } from "react-native";
import PopupHeader from "./popupHeader";
import { CustomButton } from "./customBtn";

export default function AddAssetModal({ onClose }: { onClose: () => void }){
    return(
        <View style={{flex: 1}}>
            <PopupHeader title="Add Asset"/>
            <View style={{padding: 10}}>
                <TextInput
                    style={styles.input}
                    placeholder="Nama Aset" 
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Detail" 
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Type" 
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Location" 
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Purchase Date" 
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Purchase Price" 
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Maintenance Schedule" 
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={[styles.divider, {backgroundColor: '#ccc'}]}/>
                <CustomButton title="Submit" buttonStyle={{width: '60%', alignSelf: 'center'}} onPress={() => onClose()}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        fontFamily: 'LeagueSpartan_400Regular'
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