import { View, Text, SafeAreaView } from 'react-native'
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { Redirect } from "expo-router";
import { supabase } from '../lib/supabase/supabase'
import AuthRegister from '../components/auth/register'
import Account from '../components/account/account'
import { Session } from '@supabase/supabase-js'
import { COLORS, FONT, icons } from '../constants';
import { MenuButton } from '../components';


const Register = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8e3e3' }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.white },
                headerTitle: "Smart City",
                headerLeft: () => (
                    <MenuButton icon={icons.backArrow} onPress={() => { router.back() }} />
                ),
                headerTitleStyle: {
                    fontFamily: FONT.PoppinsBold,
                    fontSize: 22,
                    color: COLORS.blue
                }
            }} />
            <AuthRegister />
        </SafeAreaView>
    )
}

export default Register;