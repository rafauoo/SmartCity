import React, { useState, useEffect } from "react";
import { TouchableOpacity, FlatList, Text, View, Image, Alert } from "react-native";
import { supabase } from "../../lib/supabase/supabase";
import styles from './profilepage.style'

function ProfilePage({ session }) {
    const [loading, setLoading] = useState(null)
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    useEffect(() => {
        if (session) getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`name, surname`)
                .eq('uuid', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setName(data.name)
                setSurname(data.surname)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View>
            <Text>Twoje dane</Text>
            <View>
                <Text>{session.user.email}</Text>
            </View>
            <View>
                <Text>{name}</Text>
            </View>
            <View>
                <Text>{surname}</Text>
            </View>
        </View>
    )
}

export default ProfilePage;