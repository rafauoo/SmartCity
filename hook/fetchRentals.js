import { supabase } from '../lib/supabase/supabase'

async function getBikeTime(data_name, rental_data) {
    let { data, error, status } = await supabase
        .from('rental_object_data_value')
        .select(`value`)
        .eq('rental_id', rental_data.rental_id)
        .eq('data_name', data_name).single()
    return data;
}

async function getBikeID(city_service_object_id) {
    let { data, error, status } = await supabase
        .from('city_service_extra_data_value')
        .select(`value`)
        .eq('service_id', city_service_object_id)
        .eq('data_name', 'ID roweru').single()
    return data;
}

async function fetchBikeData(rental_data) {
    console.log(rental_data)
    const bike_id = await getBikeID(rental_data.city_service_object_id)
    const time_rented = await getBikeTime('godzina wypożyczenia roweru', rental_data);
    const time_returned = await getBikeTime('godzina zwrotu roweru', rental_data);
    console.log(time_rented.value)
    if (!time_returned) return { "rental_id": rental_data.rental_id, "bike_id": bike_id.value, "time_rented": time_rented.value }
    return { "rental_id": rental_data.rental_id, "bike_id": bike_id.value, "time_rented": time_rented.value, "time_returned": time_returned.value }
}

async function fetchRentals(userId) {
    let { data, error, status } = await supabase
        .from('rental_object')
        .select(`*`)
        .eq('user_uuid', userId)
        .eq('type_name', 'wypożyczenie roweru')
    if (error) {
        console.error('Wystąpił błąd podczas pobierania wypożyczeń:', error);
        return [];
    }
    console.log("AAAAAA")
    console.log(data)
    const processedData = [];

    for (let i = 0; i < data.length; i++) {
        const rental = data[i];
        const bikeData = await fetchBikeData(rental);
        const newData = bikeData;
        processedData.push(newData);
    }
    console.log(processedData);
    return processedData;
};

export default fetchRentals;