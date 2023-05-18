import React, { useState } from 'react'
import { supabase } from '../../lib/supabase/supabase'
import { Button, Input } from 'react-native-elements'
import styles from "./auth.style"
import { Alert, View, Text, SafeAreaView, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import { icons } from '../../constants'
import { useRouter } from 'expo-router'
function Auth() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birth_date, setBrith_date] = useState('')
    const [loading, setLoading] = useState(false)
    const myDate = new Date();
    const router = useRouter();

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
        if (!error) router.push('/home');
    }
    return (
        <View style={styles.container}>
            <View style={styles.verticallySpaced}>
                <Image source={icons.email} style={styles.padlock} />
                <TextInput
                    label="hasło"
                    editable
                    keyboardType='email-address'
                    numberOfLines={1}
                    placeholder={"e-mail"}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    style={styles.input}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Image source={icons.padlock} style={styles.padlock} />
                <TextInput
                    label="hasło"
                    editable
                    numberOfLines={1}
                    placeholder={"hasło"}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    style={styles.input}
                />
            </View>
            <TouchableOpacity style={[styles.loginButton]} onPress={() => signInWithEmail()}>
                <Text style={styles.loginText}>Zaloguj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.registerButton]} onPress={() => router.push('/register')}>
                <Text style={styles.registerText}>Zarejestruj</Text>
            </TouchableOpacity>
        </View >
    )
}

export default Auth;