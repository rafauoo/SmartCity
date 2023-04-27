import * as SecureStore from "expo-secure-store";
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY } from '@env';
import { parse } from 'url';


const ExpoSecureStoreAdapter = {
    getItem: (key) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key, value) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key) => {
        SecureStore.deleteItemAsync(key);
    },
};

export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})