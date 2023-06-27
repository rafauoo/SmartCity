import { supabase } from '../lib/supabase/supabase'

async function getServiceID (scooterId) {
    let { data, error, status } = await supabase
    .from('city_service_extra_data_value')
    .select(`service_id`)
    .eq('value', scooterId)
    .eq('data_name', 'ID hulajnogi').single()
    if (error) return null;
    return data;
}
async function insertRent (serviceId, userId) {
    const rental_id = await insertRental(serviceId, userId)
    if (!rental_id) return null;
    console.log(rental_id)
    const insertedRentHour = await insertRentHour(rental_id.rental_id)
    if (insertedRentHour) return { rental_id, insertedRentHour };
    return null;
}

async function insertRental (serviceId, userId) {
    const { data, error } = await supabase
    .from('rental_object')
    .insert([
        { type_name: 'wypożyczenie hulajnogi', city_service_object_id: serviceId, user_uuid: userId }
    ]).select("rental_id").single()
    if (!error) return data;
    return null;
}

async function insertRentHour (rental_id) {
    let time = new Date();
    console.log("CZAS:")
    console.log(time)
    const { data, error } = await supabase
    .from('rental_object_data_value')
    .insert([
        { data_name: 'godzina wypożyczenia hulajnogi', rental_id: rental_id, value: time }
    ])
    if (!error) return time;
    return null;
}

async function fetchRentScooter (bikeId, userId) {
    const serviceId = await getServiceID(bikeId)
    console.log(userId)
    if (!serviceId) return false;
    const { data, error } = await supabase
    .from('city_service_extra_data_value')
    .insert([
        { data_name: 'wypożyczony', service_id: serviceId.service_id, value: 'tak' }
    ])
    if (error) {
        console.error('Nie można wypożyczyć hulajnogi', error);
        return false;
    }
    const insertedProperly = await insertRent(serviceId.service_id, userId)
    console.log(insertedProperly)
    return insertedProperly;
};

export default fetchRentScooter;