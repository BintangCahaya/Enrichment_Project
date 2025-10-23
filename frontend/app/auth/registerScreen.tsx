import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {TextInput} from 'react-native-paper';
import { useState } from "react";
import { Link, router } from "expo-router";
import { CustomButton } from "@/components/customBtn";

export default function RegisterScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [hidden, setHidden] = useState(true);

    const handleRegister = () => {
        if(email.length >= 8){
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
                    secureTextEntry={hidden}
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    outlineColor="#ccc"
                    activeOutlineColor="#55C595"
                    left={<TextInput.Icon icon="lock" />}
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
                    secureTextEntry={hidden}
                    value={conPassword}
                    onChangeText={setConPassword}
                    mode="outlined"
                    outlineColor="#ccc"
                    activeOutlineColor="#55C595"
                    left={<TextInput.Icon icon="lock" />}
                    right={<TextInput.Icon icon={hidden ? "eye-closed" : "eye"} onPress={() => setHidden(!hidden)}/>}
                    theme={{
                        roundness: 30,
                        colors: {
                            background: '#fff',
                        },
                    }}
                />
                <CustomButton title="SIGN UP" style={{width: '80%'}} onPress={handleRegister}/>
                <Link href='/auth/registerScreen' style={styles.miniText}>Forgot Password?</Link>
                <View style={styles.divider}/>
                <Text style={styles.miniText}>Already have an account?</Text>
                <CustomButton title="SIGN IN" style={{width: '80%'}} onPress={() => router.navigate('/auth')}/>
                <Text style={styles.orText}>Or</Text>
                <CustomButton title="SIGN UP USING GOOGLE" style={{width: '80%'}} onPress={handleRegister} icon="logo-google"/>
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