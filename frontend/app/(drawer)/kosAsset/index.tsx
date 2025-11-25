import AddAssetModal from "@/components/addAssetModal";
import AssetCard from "@/components/assetCard";
import AssetDetailModal from "@/components/assetDetailModal";
import { CustomButton } from "@/components/customBtn";
import CustomPopup from "@/components/customPopup";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function AssetPage() {

  const [isAddVisible, setAddVisible] = useState(false);
  const [isDetailVisible, setDetailVisible] = useState(false);
  
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <TextInput 
          placeholder="Search" 
          style={styles.search} 
      />
      <Text style={{marginVertical: 20, fontSize: 15}}>Filter</Text>
      <View style={styles.columnHeader}>
        <View style={{flex: 1}}>
          <Text style={styles.globalText}>Item</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.globalText}>Location</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.globalText}>Condition</Text>
        </View>
      </View>
      <AssetCard onPress={() => setDetailVisible(true)}/>
      <AssetCard onPress={() => setDetailVisible(true)}/>
      <View style={{position: 'absolute', bottom: 20, right: 20}}>
          <CustomButton title="+" buttonStyle={{width: 75, height: 75, borderRadius: 50}} textStyle={{fontSize: 40}} onPress={() => setAddVisible(true)}/>
      </View>


      <CustomPopup style={{height: '75%'}} visible={isDetailVisible} onClose={() => setDetailVisible(false)}>
          <AssetDetailModal onClose={() => setDetailVisible(false)}/>
      </CustomPopup>
      <CustomPopup style={{height: '60%'}} visible={isAddVisible} onClose={() => setAddVisible(false)}>
          <AddAssetModal onClose={() => setAddVisible(false)}/>
      </CustomPopup> 
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
      width: '100%',
      borderRadius: 30,
      borderWidth: 0.8,
      borderColor: '#000000',
      paddingLeft: 30,
      fontFamily: 'LeagueSpartan_400Regular',
      color: '#8d8d8d',
      fontSize: 18
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#2b2b2b',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginBottom: 15
  },
  globalText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 15,
    color: '#2b2b2b',
    textAlign: 'center'
  }
});