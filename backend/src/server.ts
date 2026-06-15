import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import router from './router';
import { db } from './db';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log(`SQLite abierta en: ${db.open ? 'sí' : 'no'}`);

app.use('/api/store', router);
app.use('/api/user', router);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

export default app;
