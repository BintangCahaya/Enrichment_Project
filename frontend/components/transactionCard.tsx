import { StyleSheet, Text, View } from "react-native";

interface Transaction{
    id: string | number;
    tipe: string;
    tanggal: string;
    jumlah: number;
    deskripsi: string;
}

interface TransactionCardProps{
    transaction: Transaction;
}

export default function TransactionCard({transaction} : TransactionCardProps){
    const {id, tipe, tanggal, jumlah, deskripsi} = transaction;

    return(
        <View style={styles.container}>
            <View>
                <Text>{deskripsi}</Text>
                <Text>{tanggal}</Text>
            </View>
            <View>
                <Text style={tipe == 'income' ? styles.income : styles.expense}>
                    {tipe == 'income' ? `+ Rp ${jumlah}`: `- Rp ${jumlah}`}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor:'#000000',
        borderWidth: 0.7,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5
    },
    income: {
        color: 'green'
    },
    expense: {
        color: 'red'
    },
});