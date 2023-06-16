import { supabase } from '../lib/supabase/supabase'

async function fetchDocumentAdd(userId, documentType, value, valueType) {
    const documentId = await insertDocumentObject(userId, documentType)
    console.log(userId)
    if (!documentId) return false;
    const { data, error } = await supabase
        .from('document_data_value')
        .insert([
            {data_name: valueType, document_id: documentId, value: value},
        ])
    if (error) {
        console.error('Nie można dodać dokumentu', error);
        return false;
    }
    return true;
};

async function insertDocumentObject(userId, documentType) {
    const { data, error } = await supabase
        .from('document_object')
        .insert([
            { type_name: documentType, user_id: userId }
        ]).select("document_id").single()
    if (!error) return data;
    return null;
}

export default fetchDocumentAdd;