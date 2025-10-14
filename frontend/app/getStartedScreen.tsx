import { CustomButton } from "@/components/customBtn";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function GetStartedScreen(){
    return(
        <View style={styles.container}>
            <Text>You don't have a kos yet</Text>
            <Text style={styles.title}>GET STARTED NOW</Text>
            <CustomButton title="CREATE KOS" onPress={() => router.navigate('/registerScreen')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#51cd59ff',
        fontSize: 28,
    }
});