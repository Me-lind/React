import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

interface Contact {
    id: string;
    first?: string;
    last?: string;
    createdAt: number;
}

export async function getContacts(query?: string | null): Promise<Contact[]> {
    await fakeNetwork(`getContacts:${query}`);
    let contacts = (await localforage.getItem<Contact[]>("contacts")) || [];
    if (query) {
        contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    }
    return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact(): Promise<Contact> {
    await fakeNetwork();
    const id = Math.random().toString(36).substring(2, 9);
    const contact: Contact = { id, createdAt: Date.now() };
    const contacts = await getContacts();
    contacts.unshift(contact);
    await setContacts(contacts);
    return contact;
}

export async function getContact(id: string): Promise<Contact | null> {
    await fakeNetwork(`contact:${id}`);
    const contacts = (await localforage.getItem<Contact[]>("contacts")) || [];
    const contact = contacts.find(contact => contact.id === id);
    return contact ?? null;
}

export async function updateContact(id: string, updates: Partial<Contact>): Promise<Contact> {
    await fakeNetwork();
    const contacts = (await localforage.getItem<Contact[]>("contacts")) || [];
    const contact = contacts.find(contact => contact.id === id);
    if (!contact) throw new Error(`No contact found for id ${id}`);
    Object.assign(contact, updates);
    await setContacts(contacts);
    return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
    const contacts = (await localforage.getItem<Contact[]>("contacts")) || [];
    const index = contacts.findIndex(contact => contact.id === id);
    if (index > -1) {
        contacts.splice(index, 1);
        await setContacts(contacts);
        return true;
    }
    return false;
}

function setContacts(contacts: Contact[]): Promise<Contact[]> {
    return localforage.setItem("contacts", contacts);
}

// Fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: boolean } = {};

async function fakeNetwork(key?: string): Promise<void> {
    if (!key) {
        fakeCache = {};
        return;
    }
    if (fakeCache[key]) {
        return;
    }
    fakeCache[key] = true;
    return new Promise(res => setTimeout(res, Math.random() * 800));
}
