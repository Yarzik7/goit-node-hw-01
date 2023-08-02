const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const contacts = await listContacts();
      return console.log(contacts);

    case 'get':
          const contact = await getContactById(id);
      return console.log(contact);

    case 'add':
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case 'remove':
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);