import 'dotenv/config';

import express from 'express';
import { routes } from './routes';
import mongoose from 'mongoose';

const { PORT, DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL as string);

const app = express();
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
