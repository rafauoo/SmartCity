import { supabase } from '../lib/supabase/supabase'

import { supabase } from '../lib/supabase/supabase'

async function getServiceID(carId) {
    let { data, error, status } = await supabase
        .from('city_service_extra_data_value')
        .select(`service_id`)
        .eq('value', carId)
        .eq('data_name', 'ID samochodu').single()
    if (error) return null;
    return data;
}
async function insertRent(serviceId, userId) {
    const rental_id = await insertRental(serviceId, userId)
    if (!rental_id) return null;
    console.log(rental_id)
    const insertedRentHour = await insertRentHour(rental_id.rental_id)
    if (insertedRentHour) return { rental_id, insertedRentHour };
    return null;
}

async function insertRental(serviceId, userId) {
    const { data, error } = await supabase
        .from('rental_object')
        .insert([
            { type_name: 'wypożyczenie samochodu', city_service_object_id: serviceId, user_uuid: userId }
        ]).select("rental_id").single()
    if (!error) return data;
    return null;
}

async function insertRentHour(rental_id) {
    let time = new Date();
    console.log("CZAS:")
    console.log(time)
    const { data, error } = await supabase
        .from('rental_object_data_value')
        .insert([
            { data_name: 'godzina wypożyczenia samochodu', rental_id: rental_id, value: time }
        ])
    if (!error) return time;
    return null;
}

async function fetchDocumentAdd(carId, userId) {
    const serviceId = await getServiceID(carId)
    console.log(userId)
    if (!serviceId) return false;
    const { data, error } = await supabase
        .from('city_service_extra_data_value')
        .insert([
            { data_name: 'wypożyczony samochód', service_id: serviceId.service_id, value: 'tak' }
        ])
    if (error) {
        console.error('Nie można wypożyczyć samochodu', error);
        return false;
    }
    const insertedProperly = await insertRent(serviceId.service_id, userId)
    console.log(insertedProperly)
    return insertedProperly;
};

async function insertDocumentObject(userId, documentType) {
    const { data, error } = await supabase
        .from('document_object')
        .insert([
            { type_name: documentType, user_id: userId }
        ])
    if (!error) return data;
    return null;
}

async function insertDocumentDataValue(userId, valueType) {

}

async function getDocumentId(userId, documentType) {
    let { data: document_object, error } = await supabase
        .from('document_object')
        .select('document_id')
        .eq('user_id', userId)
    if(!error) return document_object;
    return null;

}
export default fetchRentCar;