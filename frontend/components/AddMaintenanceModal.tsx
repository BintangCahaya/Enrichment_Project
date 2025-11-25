import { StyleSheet, TextInput, View } from "react-native";
import PopupHeader from "./popupHeader";
import { CustomButton } from "./customBtn";

export default function AddMaintenanceModal({ onClose }: { onClose: () => void }){
    return(
        <View style={{flex: 1}}>
            <PopupHeader title="Add Maintenance Record"/>
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
        borderColor: '#2b2b2b2',
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
        borderColor: '#2b2b2b',
        marginTop: 20
    }
});