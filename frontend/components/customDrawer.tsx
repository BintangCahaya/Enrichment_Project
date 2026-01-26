import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "./customIcon";

export default function CustomDrawer(props : any) {
    return(
        <View style={{flex: 1}}>
            <View style={styles.profileContainer}>
                <CustomIcon name="profile" size={100} color='#fff'/>
                <View style={{marginLeft: 10}}>
                    <Text style={[styles.globalText, {fontSize: 20}]}>John Doe</Text>
                    <Text style={styles.globalText}>JohnDoe@gmail.com</Text>
                    <Text style={styles.globalText}>+6212345</Text>
                </View>
            </View>

            <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 10}}>
                <DrawerItemList {...props} />

                {/* <View style={{backgroundColor: 'black', height: 10, width: '100%'}}></View>

                <DrawerItem
                    label="Setting"
                    onPress={() => props.navigation.navigate("setting")}
                    labelStyle={{fontFamily: 'LeagueSpartan_400Regular', fontSize: 20, color: '#2B2B2B'}}
                /> */}

            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    globalText: {
        fontFamily: 'LeagueSpartan_400Regular',
        fontSize: 15,
        color: '#fff'
    },
    profileContainer:{
        paddingTop: 70, 
        paddingBottom: 20, 
        paddingHorizontal: 15,
        backgroundColor: '#55C595',
        flexDirection: 'row',
        alignItems: 'center',
    },
})
