import { supabase } from "../lib/supabase/supabase";

async function insertTicket(type_name, user_uuid) {
  const { ticket_id } = await insertTicketObject(type_name, user_uuid);
  if (!ticket_id) return null;
  const ticketData = await insertTicketData(ticket_id, type_name);
  return ticketData || null;
}

async function insertTicketObject(type_name, user_uuid) {
  const { data, error } = await supabase
    .from("ticket_object")
    .insert([{ type_name, user_uuid }])
    .select("ticket_id")
    .single();
  if (!error) return data;
  return null;
}

async function insertTicketData(ticket_id, type_name) {
  const { data_name } = await getTicketDataName(type_name);
  const { data, error } = await supabase
    .from("ticket_object_data_value")
    .insert([{ ticket_id, data_name, value: new Date() }])
    .select("*")
    .single();
  if (!error) return data;
  return null;
}

async function getTicketDataName(type_name) {
  const { data, error } = await supabase
    .from("ticket_object_data")
    .select("data_name")
    .eq("type_name", type_name)
    .limit(1)
    .single();
  if (!error) return data;
  return null;
}

export default insertTicket;
