const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');
console.log(contactsPath);

// TODO: задокументувати кожну функцію
async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id === contactId);
    return contactById ?? null;
}

async function removeContact(contactId) {
   const contacts = await listContacts();
   const contactIdx = contacts.findIndex(({ id }) => id === contactId)
    if (contactIdx === -1) {
        return null;
    }
    const [contact] = contacts.splice(contactIdx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту. 
}

module.exports = {listContacts, getContactById, removeContact, addContact}