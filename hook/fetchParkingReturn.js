import { supabase } from "../lib/supabase/supabase";

async function insertParkingReturnData(rental_id) {
  const { data, error } = await supabase
    .from("rental_object_data_value")
    .insert([
      {
        rental_id,
        data_name: "data zwolnienia miejsca parkingowego w mieście",
        value: new Date(),
      },
    ])
    .select("*")
    .single();
  if (!error) return data;
  return null;
}

export default insertParkingReturnData;
