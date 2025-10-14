import { StyleSheet, Text, View } from "react-native";

export default function CreateKosScreen(){
    return(
        <View style={styles.container}>
            <Text>Ini Kotak profil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});