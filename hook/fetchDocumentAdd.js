import { supabase } from "../lib/supabase/supabase";

async function fetchDocumentAdd(userId, documentType, valueType, value) {
  const document = await insertDocumentObject(userId, documentType);
  if (!document) return false;
  const { error } = await supabase
    .from("document_data_value")
    .insert([
      { data_name: valueType, document_id: document.document_id, value: value },
    ]);
  if (error) {
    console.error("Nie można dodać dokumentu", error);
    return false;
  }
  return true;
}

async function insertDocumentObject(userId, documentType) {
  const { error, data } = await supabase
    .from("document_object")
    .insert([{ type_name: documentType, user_uuid: userId }])
    .select("document_id")
    .single();
  if (error) return false;
  return data;
}

export default fetchDocumentAdd;
