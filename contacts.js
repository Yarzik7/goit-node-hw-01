const { nanoid } = require('nanoid');

const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

/**
 * Читає і повертає масив контактів з файлу
 * @returns {array} масив контактів
 */
async function getListContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

/**
 * Знаходить об'єкт контакту по id і повертає його
 * @param {string} contactId
 * @returns {object || null} контакт з заданим id або null
 */
async function getContactById(contactId) {
  const contacts = await getListContacts();
  const contactById = contacts.find(({ id }) => id === String(contactId));
  return contactById ?? null;
}

/**
 * Видаляє контакт по id і повертає його
 * @param {string} contactId
 * @returns {object || null} видалений контакт або null
 */
async function removeContact(contactId) {
  const contacts = await getListContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === String(contactId));
  if (contactIdx === -1) {
    return null;
  }
  const [contact] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

/**
 * Створює і додає контакт до масиву, а також повертає його
 * @param {object} об'єкт параметрів контакту
 * @returns {object} створений контакт
 */
async function addContact({ name, email, phone }) {
  const contacts = await getListContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { getListContacts, getContactById, removeContact, addContact };
