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
                <Text style={styles.globalText}>{deskripsi}</Text>
                <Text style={[styles.globalText, {fontSize: 12, color: '#8d8d8dd'}]}>{tanggal}</Text>
            </View>
            <View>
                <Text style={[styles.globalText, tipe == 'income' ? styles.income : styles.expense, {fontSize: 18}]}>
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
        color: '#0FB800'
    },
    expense: {
        color: '#B80F00'
    },
    globalText: {
        fontFamily: 'LeagueSpartan_400Regular',
        color: '#000000',
        fontSize: 15
    }
});