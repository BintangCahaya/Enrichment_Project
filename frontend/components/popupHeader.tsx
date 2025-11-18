import { StyleSheet, Text, View } from "react-native";

export default function PopupHeader({title} : {title: string}){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>  
    );
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        padding: 10,
        backgroundColor: '#55C595',
        width: '100%',
        elevation: 6, // Android
        shadowColor: '#000', // iOS
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontFamily: 'LeagueSpartan_400Regular',
        fontSize: 20,
        color: '#fff',
        marginLeft: 10
    }
})