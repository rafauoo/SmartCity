import { supabase } from '../lib/supabase/supabase'

async function getServiceID (bikeId) {
    let { data, error, status } = await supabase
    .from('city_service_extra_data_value')
    .select(`service_id`)
    .eq('value', bikeId)
    .eq('data_name', 'ID roweru').single()
    if (error) return null;
    return data;
}

async function deleteRentedInfo(serviceId) {
    let { data, error, status } = await supabase
    .from('city_service_extra_data_value')
    .delete()
    .eq('service_id', serviceId)
    .eq('value', 'tak')
    .eq('data_name', 'wypożyczony').single()

    if (error) return null;
    return true;
}

async function insertReturnHour (rental_id) {
    let time = new Date();
    console.log("CZAS:")
    console.log(time)
    const { data, error } = await supabase
    .from('rental_object_data_value')
    .insert([
        { data_name: 'godzina zwrotu roweru', rental_id: rental_id, value: time }
    ])
    if (!error) return time;
    return null;
}

async function fetchBikeReturn (rentalId, bikeId) {
    const insertedReturnHour = await insertReturnHour(rentalId)
    if (!insertedReturnHour) return null;
    const servID = await getServiceID(bikeId)
    if (!servID) return null;
    const deletedRow = await deleteRentedInfo(servID.service_id)
    if (!deletedRow) return null;
    return insertedReturnHour;
};

export default fetchBikeReturn;