import { View, Text } from 'react-native'
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase/supabase'
import Auth from '../components/auth/auth'
import Account from '../components/account/account'
import { Session } from '@supabase/supabase-js'

const Login = () => {
    const [session, setSession] = useState(null)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <View>
            {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
        </View>
    )
}
export default Login;