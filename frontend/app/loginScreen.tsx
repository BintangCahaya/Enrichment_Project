import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {TextInput} from 'react-native-paper';
import { useState } from "react";
import { Link, router } from "expo-router";
import { CustomButton } from "@/components/customBtn";

export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (email === 'test' && password === 'test123'){
            router.navigate("/getStartedScreen");
        }else{
            alert('Wrong email or password');
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.topContainer}/>
            <View style={styles.bottomContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Username or email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    outlineColor="#ccc"
                    activeOutlineColor="#55C595"
                    left={<TextInput.Icon icon="account" />}
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
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    outlineColor="#ccc"
                    activeOutlineColor="#55C595"
                    left={<TextInput.Icon icon="lock" />}
                    theme={{
                        roundness: 30,
                        colors: {
                            background: '#fff',
                        },
                    }}
                />
                <CustomButton title="LOGIN" style={{width: '80%'}} onPress={handleLogin}/>
                <Link href='/registerScreen' style={styles.miniText}>Forgot Password?</Link>
                <View style={styles.divider}/>
                <Text style={styles.miniText}>Don't have an account?</Text>
                <CustomButton title="LOGIN" style={{width: '80%'}} onPress={handleLogin}/>
                <Text style={styles.orText}>Or</Text>
                <CustomButton title="LOGIN" style={{width: '80%'}} onPress={handleLogin}/>
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
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 30
    },
    input: {
        borderRadius: 30,
        width: '100%',
        marginVertical: 10,
    },
    miniText: {
        fontSize: 10
    },
    divider: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#55C595',
        marginVertical: 20
    },
    orText: {
        fontSize: 10,
        marginVertical: 15
    },
});