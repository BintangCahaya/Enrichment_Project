import { CustomButton } from "@/components/customBtn";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function GetStartedScreen(){
    return(
        <View style={styles.container}>
            <Text>You don't have a kos yet</Text>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>GET</Text>
                <Text style={styles.title}>STARTED</Text>
                <Text style={styles.title}>NOW</Text>
            </View>
            
            <CustomButton title="CREATE KOS" style={{width: '40%'}} onPress={() => router.navigate('/createKosScreen')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#55C595'
    }
});