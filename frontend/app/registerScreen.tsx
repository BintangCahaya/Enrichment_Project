import { StyleSheet, Text, View } from "react-native";

export default function RegisterScreen(){
    return(
        <View style={styles.container}>
            <Text>Ini Register Page</Text>
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