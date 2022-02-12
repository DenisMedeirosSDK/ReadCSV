import { Router } from 'express';
import multer from 'multer';

import { ContactsController } from './controllers/ContactsController';

const multerConfig = multer();

const routes = Router();

const contactsController = new ContactsController();

routes.post(
  '/',
  multerConfig.single('file'),
  contactsController.ReadCSVAndSaveInDatabase
);

export { routes };
