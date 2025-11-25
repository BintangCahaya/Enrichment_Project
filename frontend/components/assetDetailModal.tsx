import { StyleSheet, Text, View } from "react-native";
import PopupHeader from "./popupHeader";
import { CustomButton } from "./customBtn";
import { useState } from "react";
import CustomPopup from "./customPopup";
import AddMaintenanceModal from "./AddMaintenanceModal";

export default function AssetDetailModal({onClose }: {onClose : () => void}){

    const [isModalVisible, setModalVisible] = useState(false);

    return(
        <View style={{flex: 1}}>
            <PopupHeader title="Asset Details"/>
            <View style={{padding: 10}}>
                <View style={styles.header}>
                    <Text style={[styles.globalText, {fontSize: 20, textAlign: 'center'}]}>AC 01</Text>
                </View>
                <View style={styles.assetInfo}>
                    <View>
                        <Text style={styles.globalText}>Detail: AC DAIKIN 1/2</Text>
                        <Text style={styles.globalText}>Type: Electronic</Text>
                        <Text style={styles.globalText}>Location: Room 001, Kos ABC</Text>
                        <Text style={styles.globalText}>Condition: Good</Text>
                    </View>
                    <CustomButton title="Edit" buttonStyle={{padding: 0, width: '25%', height: '35%'}} textStyle={{fontSize: 16}} onPress={() => alert('button clicked')}/>
                </View>
                <View style={[styles.header, {marginTop: 20}]}>
                    <Text style={[styles.globalText, {fontSize: 20}]}>Purchase Details</Text>
                </View>
                <View>
                    <Text style={styles.globalText}>Purchase date: 11/04/2025</Text>
                    <Text style={styles.globalText}>Purchase price: Rp. 3.000.000,-</Text>
                </View>
                <View style={[styles.header, styles.mtContainer]}>
                    <Text style={[styles.globalText, {fontSize: 20}]}>Maintenance</Text>
                    <View style={styles.btnContainer}>
                        <CustomButton title="Add Record" buttonStyle={{padding: 5, width: '40%'}} textStyle={{fontSize: 16}} onPress={() => setModalVisible(true)}/>
                        <CustomButton title="Set Schedule" buttonStyle={{padding: 5, width: '40%'}} textStyle={{fontSize: 16}} onPress={() => alert('button clicked')}/>
                    </View>
                </View>
                <Text style={[styles.globalText, {marginLeft: 15, padding: 5}]}>Next Maintenance: 23 November</Text>
                <Text style={[styles.globalText, {fontSize: 18, padding: 5}]}>History</Text>
            </View>

            <CustomPopup style={{height: '37%'}} visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <AddMaintenanceModal onClose={() => setModalVisible(false)}/>
            </CustomPopup>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomColor: '#8d8d8d',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    globalText: {
        fontFamily: 'LeagueSpartan_400Regular',
        fontSize: 15,
        color: '#2b2b2b'
    },
    assetInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mtContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'flex-end'
    }
});