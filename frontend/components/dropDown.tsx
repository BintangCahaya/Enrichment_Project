import React, { useState, useRef } from "react";
import { View, Text, Pressable, Animated, Easing, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ExpandableFormProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}

export default function DropDown({ title, children, initiallyOpen = false }: ExpandableFormProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(initiallyOpen ? 1 : 0)).current;

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);

    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false, // untuk animasi height
    }).start();
  };

  // Tinggi dan opacity diubah secara halus
  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight], // sesuaikan tinggi dengan isi form
  });

  const animatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Ikon panah berputar
  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <Ionicons name="chevron-down" size={20} color="#333" />
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[
          styles.contentContainer,
          { height: animatedHeight, opacity: animatedOpacity, overflow: "hidden" },
        ]}
      >
        <View style={{ paddingVertical: 10 }} onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: "#333",
  },
  contentContainer: {
    paddingHorizontal: 15,
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    borderRadius: 10
  },
});
