import { View, Text, StyleSheet} from "react-native";
import {TextInput} from 'react-native-paper';
import { useState } from "react";
import { Link, router } from "expo-router";
import { CustomButton } from "@/components/customBtn";
import HomeScreen from "../(tabs)";

export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [room, setRoom] = useState(0);
    const [error, setError] = useState('');
    const googleIcon = require('@/assets/images/googleIcon.png');

    const validate = () => {
        if(!email || !password){
            setError('Email dan password wajib diisi.');
            return false;
        }
        if(email.length < 8){
            setError('Email minimal 8 karakter.');
            return false;
        }
        if(password.length < 8){
            setError('Password minimal 8 karakter.');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if(!validate()) return;

        if (email === 'test1234' && password === 'test1234'){
            room == 0 ? router.replace("/getStartedScreen") : router.replace('/(tabs)')
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
                    placeholderTextColor={"#8d8d8d"}
                    value={email}
                    onChangeText={setEmail}
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
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <CustomButton title="LOGIN" buttonStyle={{width: '80%'}} onPress={handleLogin}/>
                <Link href='/auth/registerScreen' style={styles.miniText}>Forgot Password?</Link>
                <View style={styles.divider}/>
                <Text style={styles.miniText}>Don't have an account?</Text>
                <CustomButton title="REGISTER" buttonStyle={{width: '80%'}} onPress={() => router.navigate('/auth/registerScreen')}/>
                <Text style={styles.orText}>Or</Text>
                <CustomButton title="Sign In With Google" buttonStyle={{width: '80%'}} onPress={handleLogin} icon={googleIcon}/>
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
        marginVertical: 10,
        fontFamily: 'LeagueSpartan_400Regular'
    },
    miniText: {
        fontSize: 12,
        fontFamily: 'LeagueSpartan_400Regular',
        color: '#8d8d8d'
    },
    divider: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#55C595',
        marginVertical: 20
    },
    orText: {
        fontSize: 12,
        marginVertical: 10,
        fontFamily: 'LeagueSpartan_400Regular',
        color: '#8d8d8d'
    },
    error: {
        color: 'red',
        justifyContent: 'center',
        marginVertical: 5,
        fontFamily: 'LeagueSpartan_400Regular',
    }
});