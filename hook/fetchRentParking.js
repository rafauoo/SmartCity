import { supabase } from "../lib/supabase/supabase";

async function insertParkingRental(city_service_object_id, user_uuid) {
  const { rental_id } = await insertParkingRentalObject(
    city_service_object_id,
    user_uuid
  );
  if (!rental_id) return null;
  const rentalData = await insertParkingRentalData(rental_id);
  return { ...rentalData, rental_id } || null;
}

async function insertParkingRentalObject(city_service_object_id, user_uuid) {
  const { data, error } = await supabase
    .from("rental_object")
    .insert([
      {
        city_service_object_id,
        user_uuid,
        type_name: "wypożyczenie miejsca na parkingu miejskim",
      },
    ])
    .select("rental_id")
    .single();
  if (!error) return data;
  return null;
}

async function insertParkingRentalData(rental_id) {
  const { data, error } = await supabase
    .from("rental_object_data_value")
    .insert([
      {
        rental_id,
        data_name: "data zajęcia miejsca parkingowego w mieście",
        value: new Date(),
      },
    ])
    .select("*")
    .single();
  if (!error) return data;
  return null;
}

export default insertParkingRental;
