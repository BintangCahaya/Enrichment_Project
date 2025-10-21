import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.kosContainer}>
                <Text>Kos ABC</Text>
            </View>
            <View style={styles.roomContainer}>
                <View style={styles.roomInfoContainer}>
                    <Text style={styles.roomInfo}>Kamar Terisi</Text>
                    <Text style={styles.roomInfo}>9/16</Text>
                </View>
                <Icon source="bed-king" color="#fff" size={100}/>
            </View>
            <View style={styles.statusContainer}>
                <View>
                    <Text>Pembayaran</Text>
                </View>
                <Icon source="wallet-bifold" color="#fff" size={40}/>
            </View>
            <View style={styles.financeContainer}>
                <View>
                    <Text>Pemasukan</Text>
                </View>
                <Icon source="currency-usd" color="#fff" size={40}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 20
    },
    kosContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'red'
    },
    roomContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#259531',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10
    },
    roomInfoContainer: {
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    roomInfo: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold'
    },
    statusContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#215273',
        width: '80%'
    },
    financeContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#359D9E',
        width: '80%'
    }
});