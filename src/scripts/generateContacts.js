import { PATH_DB } from '../constants/contacts.js';
import { promises as fs } from 'node:fs';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (count) => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(data);

    const newContacts = [];
    for (let i = 0; i < count; i++) {
      newContacts.push(createFakeContact());
    }

    const updatedContacts = [...contacts, ...newContacts];

    await fs.writeFile(
      PATH_DB,
      JSON.stringify(updatedContacts, null, 2),
      'utf8',
    );

    console.log(`${count} new contacts have been added`);
  } catch (error) {
    console.error(`Error generating contacts: ${error}`);
  }
};

generateContacts(5);
