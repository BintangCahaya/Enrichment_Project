import { Ionicons } from "@expo/vector-icons";
import { Button, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "./customBtn";
import { useState } from "react";
import Checkbox from "expo-checkbox";

export default function AnnouncementCard(){

    const [checked, setChecked] = useState(false);

    return(
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                    <Ionicons name="people-circle-outline" size={40} color={'#000000'}/>
                    <Text style={[styles.globalText, {fontWeight: '700'}]}>John Doe</Text>
                </View>
                <Text style={[styles.globalText, {color: '#8d8d8d'}]}>Room 001</Text>
            </View>
            <Checkbox value={checked} onValueChange={setChecked} style={{borderRadius: 5, height: 25, width: 25, marginRight: 10}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#8d8d8d',
        borderWidth: 0.8,
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 6,
        marginVertical: 5
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    globalText: {
        fontFamily: 'LeagueSpartan_400Regular',
        fontSize: 20,
        color: '#2b2b2b'
    },
});