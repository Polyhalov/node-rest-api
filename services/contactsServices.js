import path from 'path';
import fs from 'fs/promises'
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json')

export const listContacts  = async () => {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
}

export const getContactById  = async (contactID) => {
    const contacts = await listContacts ();
    const result =  contacts.find(item => item.id===contactID);
    return result || null;
}
export const removeContact  = async (contactID) => {
    const contacts = await listContacts ();
    const index = contacts.findIndex(item => item.id === contactID);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

export const addContact  = async (data)=>{
    const contacts = await listContacts ();
    const newContact = {
        id: nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}
export const updateContactById = async (id, data) => {
    const contacts = await listContacts ();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null
    }
    contacts[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

