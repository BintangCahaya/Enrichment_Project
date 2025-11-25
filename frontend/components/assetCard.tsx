import { Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native";

export default function AssetCard({onPress }: {onPress : () => void}){
    return(
        <Pressable style={styles.container} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1}}>
                <View style={{height: 15, width: 30, backgroundColor: '#8d8d8d'}}/>
                <Text style={[styles.globalText, {fontWeight: '700'}]}>AC UNIT 1</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={[styles.globalText, {color: '#8d8d8d'}]}>Room 001</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-end'}}>
                <Text style={[styles.globalText, {fontFamily: 'LeagueSpartan_700Bold', fontSize: 18, color: '#D7CF00'}]}>Needs Maintenance</Text>
            </View>
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#2b2b2b',
        borderWidth: 0.5,
        padding: 10,
        marginVertical: 5
    },
    globalText: {
        fontFamily: 'LeagueSpartan_400Regular',
        fontSize: 15,
        color: '#2b2b2b',
        textAlign: 'center'
    }
});