const fsPromises = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const { nanoid } = require("nanoid");
const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(data);
    if (parsedContacts.length < 1) return console.error(chalk.red("Contacts list is empty!"));

    return parsedContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(data);
    const contact = parsedContacts.find(
      ({ id }) => Number(id) === Number(contactId)
    );

    if (!contact) return console.error(chalk.yellow(`Сontact with id: ${contactId} was not found!`));

    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(data);
    const contactIndex = parsedContacts.findIndex(
      ({ id }) => Number(id) === Number(contactId)
    );

    if (contactIndex === -1) return console.error(chalk.yellow(`Сontact with id: ${contactId} was not found!`));

    const newContacts = parsedContacts.filter(
      ({ id }) => Number(id) !== Number(contactId)
    );

    await fsPromises.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(chalk.green(`Contact with ID: ${contactId} was deleted`));
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    const newContacts = [...parsedContacts, newContact];
    await fsPromises.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(chalk.green(`A contact with name: ${name} has been added`));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };