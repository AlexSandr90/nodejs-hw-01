import { PATH_DB } from '../constants/contacts.js';
import { promises as fs } from 'node:fs';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(data);
    const newContact = createFakeContact();

    const updateContacts = [...contacts, newContact];

    await fs.writeFile(
      PATH_DB,
      JSON.stringify(updateContacts, null, 2),
      'utf8',
    );

    console.log(`New contact have been added`);
  } catch (error) {
    console.error(`Error added contact: ${error}`);
  }
};

addOneContact();
