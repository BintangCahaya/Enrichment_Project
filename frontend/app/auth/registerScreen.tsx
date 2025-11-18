import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {TextInput} from 'react-native-paper';
import { useState } from "react";
import { Link, router } from "expo-router";
import { CustomButton } from "@/components/customBtn";

export default function RegisterScreen(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [hidden, setHidden] = useState(true);

    const handleRegister = () => {
        if(username.length >= 8){
            if(password === conPassword){
                alert('Succesfully create account');
                router.navigate('/auth');
            }else{
                alert('password and confirm password field must same')
            }
        }else{
            alert('Email must contain at least 8 charaacter');
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.topContainer}/>
            <View style={styles.bottomContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Username"
                    placeholderTextColor={'#8d8d8d'}
                    value={username}
                    onChangeText={setUsername}
                    mode="outlined"
                    outlineColor="#8d8d8d"
                    activeOutlineColor="#55C595"
                    left={<TextInput.Icon icon="account" color={'#8d8d8d'}/>}
                    theme={{
                        roundness: 30,
                        colors: {
                            background: '#fff',
                        },
                    }}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Email"
                    placeholderTextColor={'#8d8d8d'}
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    outlineColor="#8d8d8d"
                    activeOutlineColor="#55C595"
                    left={<TextInput.Icon icon="email" color={'#8d8d8d'}/>}
                    theme={{
                        roundness: 30,
                        colors: {
                            background: '#fff',
                        },
                    }}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Password"
                    placeholderTextColor={'#8d8d8d'}
                    secureTextEntry={hidden}
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    outlineColor="#8d8d8d"
                    activeOutlineColor="#55C595"
                    left={<TextInput.Icon icon="lock" color={'#8d8d8d'}/>}
                    right={<TextInput.Icon icon={hidden ? "eye-closed" : "eye"} onPress={() => setHidden(!hidden)}/>}
                    theme={{
                        roundness: 30,
                        colors: {
                            background: '#fff',
                        },
                    }}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Confirm Password"
                    placeholderTextColor={'#8d8d8d'}
                    secureTextEntry={hidden}
                    value={conPassword}
                    onChangeText={setConPassword}
                    mode="outlined"
                    outlineColor="#ccc"
                    activeOutlineColor="#55C595"
                    left={<TextInput.Icon icon="lock" color={'#8d8d8d'} />}
                    right={<TextInput.Icon icon={hidden ? "eye-closed" : "eye"} onPress={() => setHidden(!hidden)}/>}
                    theme={{
                        roundness: 30,
                        colors: {
                            background: '#fff',
                        },
                    }}
                />
                <CustomButton title="REGISTER" style={{width: '80%'}} onPress={handleRegister}/>
                <View style={styles.divider}/>
                <Text style={styles.miniText}>Already have an account?</Text>
                <CustomButton title="LOGIN" style={{width: '80%'}} onPress={() => router.navigate('/auth')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#55C595'
    },
    topContainer: {
        flex: 1,
        backgroundColor: '#55C595'
    },
    bottomContainer: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    input: {
        borderRadius: 30,
        width: '100%',
        marginVertical: 5,
        fontFamily: 'LeagueSpartan_400Regular'
    },
    miniText: {
        fontSize: 12,
        fontFamily: 'LeagueSpartan_400Regular',
        color: '#8d8d8d'
    },
    divider: {
        width: '100%',
        borderWidth: 0.7,
        borderColor: '#55C595',
        marginVertical: 20
    },
    orText: {
        fontSize: 10,
        marginVertical: 15,
        fontFamily: 'LeagueSpartan_400Regular'
    },
});