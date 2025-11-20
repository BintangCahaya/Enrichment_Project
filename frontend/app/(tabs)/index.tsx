import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(){

    const bedIcon = require('@/assets/images/bed.png');

    return(
        <View style={styles.container}>
            <View style={styles.kosContainer}>
                <ImageBackground source={require('@/assets/images/Kos.jpg')} resizeMode="cover" style={styles.image}>
                    <View style={styles.overlay}>
                        <Text style={styles.kosTitle}>Kos ABC</Text>
                        <Text style={styles.address}>Jalan 9</Text>
                        <Text style={styles.totalRoom}>16 Unit kamar</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.roomContainer}>
                <View style={styles.roomInfoContainer}>
                    <Text style={styles.roomInfoTitle}>Kamar Terisi</Text>
                    <Text style={styles.roomInfoDetail}>9/16</Text>
                </View>
                <View style={{alignSelf: 'center', marginRight: 20}}>
                    <Image source={bedIcon} tintColor="#fff" style={{height: 100, width: 100}}/>
                </View>
            </View>
            <View style={styles.statusContainer}>
                <View style={{paddingLeft: 5}}>
                    <Text style={styles.statusTitle}>Pembayaran</Text>
                    <View style={styles.statusInfo}>
                        <Icon source="checkbox-blank-circle" color="#18E205" size={25}/>
                        <Text style={{color: '#fff'}}>4</Text>
                        <Text style={{color: '#fff'}}>Lunas</Text>
                    </View>
                    <View style={styles.statusInfo}>
                        <Icon source="checkbox-blank-circle" color="#D7CF00" size={25}/>
                        <Text style={{color: '#fff'}}>0</Text>
                        <Text style={{color: '#fff'}}>Kurang</Text>
                    </View>
                    <View style={styles.statusInfo}>
                        <Icon source="checkbox-blank-circle" color="#DA0700" size={25}/>
                        <Text style={{color: '#fff'}}>5</Text>
                        <Text style={{color: '#fff'}}>Belum Bayar</Text>
                    </View>
                </View>
                <View style={{alignSelf: 'center', marginRight: 20}}>
                    <Icon source="wallet-bifold" color="#fff" size={100}/>
                </View>
            </View>
            <View style={styles.financeContainer}>
                <View style={{gap: 3}}>
                    <Text style={styles.financeTitle}>Pemasukan</Text>
                    <Text style={styles.financeInfo}>Rp 15.000.000,-</Text>
                    <View style={styles.divider}></View>
                    <Text style={styles.financeTitle}>Pengeluaran</Text>
                    <Text style={styles.financeInfo}>Rp 8.000.000,-</Text>
                    <Text style={styles.currentTime}>Oktober 2025</Text>
                </View>
                <View style={{alignSelf: 'center', marginRight: 20}}>
                    <Icon source="currency-usd" color="#fff" size={100}/>
                </View>
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
        gap: 20,
        backgroundColor: '#fff'
    },
    kosContainer: {
        flex: 1.1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 15,
    },
    kosTitle: {
        fontSize: 22,
        color: '#fff',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    address: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    totalRoom: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    roomContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#259531',
        width: '90%',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10
    },
    roomInfoContainer: {
        flexDirection: 'column',
        paddingHorizontal: 5,
    },
    roomInfoTitle: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'LeagueSpartan_400Regular'
    },
    roomInfoDetail: {
        color: '#fff',
        fontSize: 64,
        fontWeight: 'bold',
        fontFamily: 'LeagueSpartan_400Regular'
    },
    statusContainer: {
        flex: 1.1,
        flexDirection: 'row',
        backgroundColor: '#215273',
        width: '90%',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10
    },
    statusTitle: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'LeagueSpartan_400Regular'
    },
    statusInfo: {
        flexDirection: 'row',
        margin: 5,
        gap: 5,
        alignItems: 'center'
    },
    financeContainer: {
        flex: 1.3,
        flexDirection: 'row',
        backgroundColor: '#359D9E',
        width: '90%',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10
    },
    financeTitle: {
        color: '#fff',
        fontSize: 18,
        marginLeft:10,
        fontFamily: 'LeagueSpartan_400Regular'
    },
    financeInfo: {
        color: '#fff',
        fontSize: 22,
        marginLeft: 30,
        fontFamily: 'LeagueSpartan_400Regular'
    },
    divider: {
        borderWidth: 0.8,
        borderColor: '#fff',
        width: '100%',
        marginVertical: 5
    },
    currentTime: {
        color: '#d4d4d4',
        alignSelf: 'center',
        marginTop: 5,
        fontFamily: 'LeagueSpartan_400Regular',
        fontSize: 14
    }
});