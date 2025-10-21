import { CustomButton } from "@/components/customBtn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function TenantScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Ionicons size={40} name="people-circle-outline" color={'#000000'}/>
                <View style={styles.infoContainer}>
                    <Text>Nama</Text>
                    <Text>Kamar</Text>
                    <Text>Status</Text>
                </View>
                <CustomButton title="Details" style={{width: 80}} onPress={() => alert('button clicked')}/>
            </View>
            <View style={styles.cardContainer}>
                <Ionicons size={40} name="people-circle-outline" color={'#000000'}/>
                <View style={styles.infoContainer}>
                    <Text>Nama</Text>
                    <Text>Kamar</Text>
                    <Text>Status</Text>
                </View>
                <CustomButton title="Details" style={{width: 80}} onPress={() => alert('button clicked')}/>
            </View>
            <View style={styles.cardContainer}>
                <Ionicons size={40} name="people-circle-outline" color={'#000000'}/>
                <View style={styles.infoContainer}>
                    <Text>Nama</Text>
                    <Text>Kamar</Text>
                    <Text>Status</Text>
                </View>
                <CustomButton title="Details" style={{width: 80}} onPress={() => alert('button clicked')}/>
            </View>
            <View style={styles.cardContainer}>
                <Ionicons size={40} name="people-circle-outline" color={'#000000'}/>
                <View style={styles.infoContainer}>
                    <Text>Nama</Text>
                    <Text>Kamar</Text>
                    <Text>Status</Text>
                </View>
                <CustomButton title="Details" style={{width: 80}} onPress={() => alert('button clicked')}/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        gap: 20
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 0.5,
        width: '100%',
    },
    profileContainer:{ 

    },
    infoContainer: {

    },
    btn: {

    }
});