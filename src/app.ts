import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from './config';
import { authenticationRouter, usersRouter, profileRouter, transactionsRouter, categoriesRouter, balanceRouter } from './routers';
import { handleApplicationErrors } from './middlewares';
import path from 'path';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
  .use('/profile', profileRouter)
  .use('/transactions', transactionsRouter)
  .use('/categories', categoriesRouter)
  .use('/balance', balanceRouter)
  .use(handleApplicationErrors);


export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
