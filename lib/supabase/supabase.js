import * as SecureStore from "expo-secure-store";
import { createClient } from '@supabase/supabase-js'
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY } from '@env';


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

const supabaseUrl = REACT_APP_SUPABASE_URL
const supabaseAnonKey = REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})