import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase/supabase";

export default function Index() {
  let [fontsLoaded] = useFonts({
    PoppinsBold: require("./../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("./../assets/fonts/Poppins-Light.ttf"),
  });
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ session }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  return (
    <View>
      {session && session.user ? (
        <Redirect href="/home" />
      ) : (
        <Redirect href="/login" />
      )}
    </View>
  );
}
