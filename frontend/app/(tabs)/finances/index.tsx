import { CustomButton } from "@/components/customBtn";
import TransactionCard from "@/components/transactionCard";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function FinanceScreen(){
    const [profit, setProfit] = useState('Rp. 18.000.000,-');
    const transaksi = [
        {
            id: '1',
            tipe: 'income',
            tanggal: '10-10-2025',
            jumlah: 1000000,
            deskripsi: 'Sewa'
        },
        {
            id: '2',
            tipe: 'income',
            tanggal: '30-10-2025',
            jumlah: 2000000,
            deskripsi: 'Sewa'
        },
        {
            id: '3',
            tipe: 'expense',
            tanggal: '30-10-2025',
            jumlah: 1500000,
            deskripsi: 'Renovasi'
        },
        
    ];

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Total Profit</Text>
                <Text>{profit}</Text>
            </View>
            <View style={styles.graphHeader}>
                <Text>Bulan ini</Text>
                <View style={styles.btnContainer}>
                    <CustomButton title="Income" style={{width: '40%'}} onPress={() => alert('Button clicked')}/>
                    <CustomButton title="Expense" style={{width: '40%', backgroundColor: '#000000'}} onPress={() => alert('Button clicked')}/> 
                </View>
            </View>
            <View>
                <Text>Ini Grafik</Text>
            </View>
            <CustomButton title="RP. 2.800.000,-" style={{alignSelf: 'flex-end'}} onPress={() => alert('Button clicked')}/>
            <View style={styles.transactionheader}>
                <Text>Daftar Transaksi</Text>
                <CustomButton title="See more" style={{width: '40%', borderRadius: 50, alignSelf: 'flex-end'}} onPress={() => router.push('/(tabs)/finances/transaction')}/>
            </View>
            <FlatList
                data={transaksi}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    graphHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'flex-end',
        marginRight: 10
    },
    transactionheader: {
        marginTop: 10,
        paddingVertical: 5,
        borderTopColor: '#000000',
        borderTopWidth: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

});