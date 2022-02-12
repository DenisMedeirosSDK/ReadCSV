import mongoose, { Schema } from 'mongoose';

interface Contacts {
  name: string;
  email: string;
  subscriber: boolean;
}

const contactsSchema = new Schema<Contacts>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  subscriber: {
    type: Boolean,
    required: true,
  },
});

const contactsMongo = mongoose.model<Contacts>('contacts', contactsSchema);

export { contactsMongo };
