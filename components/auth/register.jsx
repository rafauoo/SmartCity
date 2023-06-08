import React, { useState } from 'react'
import { supabase } from '../../lib/supabase/supabase'
import { Button, Input } from 'react-native-elements'
import styles from "./auth.style"
import { Alert, View, Text, SafeAreaView, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import { icons } from '../../constants'
import { useRouter } from 'expo-router'
import { Keyboard } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../constants'
function AuthRegister() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [birth_date, setBrith_date] = useState(new Date());
    const [show, setShow] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') {
            setShow(false);
          }
        setBrith_date(currentDate);
    };

    async function signUpWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    surname: surname,
                    birthday: birth_date.toISOString().slice(0, 10),
                },
            },
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
        if (!error) {
            Alert.alert('Wysłano maila z linkiem potwierdzającym. Potwierdź e-mail, by móc się zalogować.');
            router.push('/login');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.verticallySpaced}>
                <Image source={icons.email} style={styles.padlock} />
                <TextInput
                    editable
                    keyboardType='email-address'
                    numberOfLines={1}
                    placeholder="e-mail"
                    onSubmit={Keyboard.dismiss}
                    placeholderTextColor={'rgba(13, 82, 159, 0.6)'}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    style={styles.input}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Image source={icons.padlock} style={styles.padlock} />
                <TextInput
                    editable
                    numberOfLines={1}
                    placeholder={"hasło"}
                    placeholderTextColor={'rgba(13, 82, 159, 0.6)'}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    style={styles.input}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Image source={icons.padlock} style={styles.padlock} />
                <TextInput
                    editable
                    numberOfLines={1}
                    placeholder={"imię"}
                    placeholderTextColor={'rgba(13, 82, 159, 0.6)'}
                    onChangeText={text => setName(text)}
                    value={name}
                    style={styles.input}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Image source={icons.padlock} style={styles.padlock} />
                <TextInput
                    editable
                    numberOfLines={1}
                    placeholder={"nazwisko"}
                    placeholderTextColor={'rgba(13, 82, 159, 0.6)'}
                    onChangeText={text => setSurname(text)}
                    value={surname}
                    style={styles.input}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Image source={icons.padlock} style={styles.padlock} />
                {/* <Text style={styles.dateInput}>
                    {birth_date.getDate()}.
                    {birth_date.getMonth() < 10 ? "0"+birth_date.getMonth() : birth_date.getMonth()}.
                    {birth_date.getFullYear()}
                </Text> */}
                {show && (
                    <RNDateTimePicker
                    testID="dateTimePicker"
                    value={birth_date}
                    mode={"date"}
                    display={"default"}
                    is24Hour={true}
                    onChange={onChange}
                    />
                )}
                {Platform.OS === "ios" ?
                <TouchableOpacity style={[styles.pickDateButton]} onPress={() => setShow(true)}>
                    <Text style={styles.pickDateText}>Zmień</Text>
                </TouchableOpacity> : <></>
                }

            </View>
            <TouchableOpacity style={[styles.loginButton]} onPress={() => signUpWithEmail()}>
                <Text style={styles.loginText}>Zarejestruj</Text>
            </TouchableOpacity>
        </View >
    )
}

export default AuthRegister;