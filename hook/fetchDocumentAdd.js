import { supabase } from '../lib/supabase/supabase'

async function fetchDocumentAdd(userId, documentType, valueType, value) {
    const insertPassed = await insertDocumentObject(userId, documentType)
    if (!insertPassed) return false;
    const documentId = await getDocumentId(userId, documentType)
    if (!documentId) return false;
    const { error } = await supabase
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
    const { error } = await supabase
        .from('document_object')
        .insert([
            { type_name: documentType, user_id: userId }
        ])
    if (error) return false;
    return true;
}

async function getDocumentId(userId, documentType) {
    const { data, error } = await supabase
        .from('document_object')
        .select(`document_id`)
        .eq('user_id', userId)
        .eq('type_name', documentType)
    if (error) return false;
    return data;
}

export default fetchDocumentAdd;