import { supabase } from '../lib/supabase/supabase'

async function getCarTime(data_name, rental_data) {
    let { data, error, status } = await supabase
        .from('rental_object_data_value')
        .select(`value`)
        .eq('rental_id', rental_data.rental_id)
        .eq('data_name', data_name).single()
    return data;
}

async function getCarID(city_service_object_id) {
    let { data, error, status } = await supabase
        .from('city_service_extra_data_value')
        .select(`value`)
        .eq('service_id', city_service_object_id)
        .eq('data_name', 'ID samochodu').single()
    return data;
}

async function fetchBikeData(rental_data) {
    console.log(rental_data)
    const car_id = await getCarID(rental_data.city_service_object_id)
    const time_rented = await getCarTime('godzina wypożyczenia samochodu', rental_data);
    const time_returned = await getCarTime('godzina zwrotu samochodu', rental_data);
    console.log(time_rented.value)
    if (!time_returned) return { "rental_id": rental_data.rental_id, "car_id": car_id.value, "time_rented": time_rented.value }
    return { "rental_id": rental_data.rental_id, "car_id": car_id.value, "time_rented": time_rented.value, "time_returned": time_returned.value }
}

async function fetchRentalsCar(userId) {
    let { data, error, status } = await supabase
        .from('rental_object')
        .select(`*`)
        .eq('user_uuid', userId)
    if (error) {
        console.error('Wystąpił błąd podczas pobierania wypożyczeń:', error);
        return [];
    }
    console.log("BBBBB")
    console.log(data)
    const processedData = [];

    for (let i = 0; i < data.length; i++) {
        const rental = data[i];
        const carData = await fetchCarData(rental);
        const newData = carData;
        processedData.push(newData);
    }
    console.log(processedData);
    return processedData;
};

export default fetchRentalsCar;