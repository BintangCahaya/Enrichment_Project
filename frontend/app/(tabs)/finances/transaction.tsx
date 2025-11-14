import AddTransactionModal from "@/components/addTransactionModal";
import { CustomButton } from "@/components/customBtn";
import CustomPopup from "@/components/customPopup";
import TransactionCard from "@/components/transactionCard";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function TransactionScreen(){
    const [activeFilter, setActiveFilter] = useState("All");
    const filters = ["All", "income", "expense"];
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
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
        {
            id: '4',
            tipe: 'expense',
            tanggal: '30-10-2025',
            jumlah: 2000000,
            deskripsi: 'Perbaiki AC'
        },
        
    ];

    const filteredData = transaksi.filter(item => {
        const matchFilter = activeFilter === 'All' || item.tipe.toLowerCase() === activeFilter.toLowerCase();
        const matchSearch = item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

        return matchFilter && matchSearch;
    });

    return(
        <View style={styles.container}>
            <TextInput 
                placeholder="Search" 
                style={styles.search} 
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <View style={styles.filterContainer}>
                {filters.map((item) => (
                    <Pressable key={item} style={[styles.filterText, activeFilter === item && styles.filterTextFocus]} onPress={() => setActiveFilter(item)}>
                        <Text style={{textAlign: "center", color: activeFilter === item ? "#55C595" : "#000", textTransform: 'capitalize'}}>{item}</Text>
                    </Pressable>
                ))}
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
            />
            <View style={{position: 'absolute', bottom: 20, right: 20}}>
                <CustomButton title="+" style={{borderRadius: 200}} onPress={() => setModalVisible(true)}/>
            </View>
            <CustomPopup style={{width: '90%', height: '75%'}} visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <AddTransactionModal onClose={() => setModalVisible(false)}/>
            </CustomPopup> 
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    search: {
        width: '100%',
        borderRadius: 30,
        borderWidth: 0.6,
        borderColor: '#000000',
        paddingLeft: 30
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        gap: 50
    },
    filterText: {
        flex: 1, 
        padding: 5,
    },
    filterTextFocus: {
        borderBottomWidth: 1,
        borderBottomColor: '#55C595'
    }
});
