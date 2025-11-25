import AnnouncementCard from "@/components/announcementCard";
import { CustomButton } from "@/components/customBtn";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";

export default function AnnouncementPage() {

  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}} edges={['bottom']}>
      <View style={{flex: 1, padding: 15}}>
        <TextInput style={styles.input} placeholder="Title"/>
        <TextInput
            style={styles.description}
            placeholder="Content..."
            multiline
            numberOfLines={14}
            textAlignVertical="top"
        />
        <CustomButton title="Add Image" buttonStyle={{width: '30%', alignSelf: 'flex-end', borderRadius: 30, padding: 7}} textStyle={{fontSize: 15}} onPress={() => alert('Button clicked')}/>
        <View style={styles.divider}/>
        <View style={styles.sendContainer}>
          <Text style={styles.globalText}>Send to</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={styles.globalText}>All</Text>
            <Checkbox value={checked} onValueChange={setChecked} style={{borderRadius: 5, height: 25, width: 25}} />
          </View>
        </View>
        <View style={{paddingBottom: 120}}>
          <AnnouncementCard/>
          <AnnouncementCard/>
          <AnnouncementCard/>
          <AnnouncementCard/>
          <AnnouncementCard/>
        </View>
      </View>
      <View style={styles.bottomContainer}>
          <View style={[styles.divider, {backgroundColor: '#ccc'}]}/>
          <CustomButton title="Send" buttonStyle={{width: '60%', alignSelf: 'center'}} onPress={() => router.navigate('/(drawer)/(tabs)')}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
      width: '100%',
      paddingLeft: 15,
      marginVertical: 5,
      borderRadius: 10,
      borderColor: '#2B2B2B',
      borderWidth: 1,
      fontFamily: 'LeagueSpartan_400Regular',
      fontSize: 16
  },
  description: {
      borderWidth: 1,
      borderColor: "#2B2B2B",
      borderRadius: 8,
      height: '40%',
      textAlignVertical: "top",
      marginVertical: 5,
      padding: 10,
      fontFamily: 'LeagueSpartan_400Regular',
      fontSize: 12
  },
  sendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  allBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  divider: {
      borderWidth: 0.5,
      width: '100%',
      borderColor: '#8d8d8d',
      marginTop: 20
  },
  bottomContainer: {
    paddingBottom: 15,
    paddingTop: 10,
    backgroundColor: 'transaparent'
  },
  globalText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 20,
    color: '#2b2b2b'
  }
})