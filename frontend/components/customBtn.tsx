import React from "react";
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TextStyle, TouchableHighlight, TouchableOpacity, ViewStyle } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ImageSourcePropType;
}

export function CustomButton({title, buttonStyle, textStyle, onPress, icon}: CustomButtonProps){
    return(
        <TouchableOpacity style={[styles.btn, buttonStyle]} onPress={onPress}>
            {icon && (
                <Image source={icon} style={styles.iconLeft}/>
            )}
            <Text style={[styles.btnText, textStyle]}>{title}</Text>
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
        borderRadius: 15,
        elevation: 4, // Android
        shadowColor: '#000', // iOS
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        shadowOffset: { width: 0, height: 2 },
    },
    btnText: {
        color: '#fff',
        fontFamily: 'LeagueSpartan_400Regular',
        fontSize: 20,
        lineHeight: 18,
        textAlignVertical: 'center',
    },
    iconLeft: {
        marginRight: 8,
        height: 20,
        width: 20,
        alignSelf: 'center',
    },
});