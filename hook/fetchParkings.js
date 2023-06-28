import { supabase } from "../lib/supabase/supabase";

async function fetchParkings() {
  const { data, error } = await supabase
    .from("city_service_object")
    .select("*, city_service_extra_data_value (*)")
    .ilike("type_name", "%miejski parking%");

  if (!error) return data;
  return null;
}

export default fetchParkings;
