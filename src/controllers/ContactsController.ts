import { Request, Response } from 'express';
import { Readable } from 'stream';
import readline from 'readline';

import { contactsMongo } from '../schema/Contacts';

interface Contacts {
  name: string;
  email: string;
  subscriber: string;
}

export class ContactsController {
  async ReadCSVAndSaveInDatabase(request: Request, response: Response) {
    const { file } = request;
    const buffer = file?.buffer;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const contactsLine = readline.createInterface({
      input: readableFile,
    });

    const contacts: Contacts[] = [];

    for await (let line of contactsLine) {
      const contactsLineSplit = line.split(',');

      contacts.push({
        name: contactsLineSplit[0],
        email: contactsLineSplit[1],
        subscriber: contactsLineSplit[2],
      });
    }

    for await (let { name, email, subscriber } of contacts) {
      const contactExist = await contactsMongo.findOne({ email });

      if (!contactExist) {
        await contactsMongo.create({
          name,
          email,
          subscriber,
        });
      }
    }

    return response.json(contacts);
  }
}
