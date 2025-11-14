import React from 'react';
import { Modal, View, StyleSheet, Pressable, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CustomPopupProps {
    style?: StyleProp<ViewStyle>;
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function CustomPopup ({ style, visible, onClose, children }: CustomPopupProps){
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable style={styles.background} onPress={onClose} />
                <View style={[styles.popupContainer, style]}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    popupContainer: {
        width: '90%',
        maxHeight: '85%',
        flexShrink: 1,
        backgroundColor: '#fff', 
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
});
