import { PATH_DB } from '../constants/contacts.js';
import { promises as fs } from 'node:fs';

export const countContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');

    return JSON.parse(data)?.length;
  } catch (error) {
    console.error(`Error read contacts: ${error}`);
  }
};

console.log(await countContacts());
