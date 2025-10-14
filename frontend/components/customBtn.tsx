import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function CustomButton({title, style, onPress}: CustomButtonProps){
    return(
        <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#55C595',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        borderRadius: 30,
    },
    btnText: {
        color: '#fff'
    },
});