import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: string;
}

export function CustomButton({title, style, onPress, icon}: CustomButtonProps){
    return(
        <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
            {icon && (
                <Ionicons name={icon as any} size={20} color="#fff" style={styles.iconLeft}/>
            )}
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#55C595',
        padding: 10,
        marginVertical: 10,
        borderRadius: 30,
    },
    btnText: {
        color: '#fff'
    },
    iconLeft: {
        marginRight: 8,
    },
});