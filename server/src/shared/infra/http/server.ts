import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
import AppError from '@shared/errors/AppError';
import sentryConfig from "@config/sentry";

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const port = 3333;
const app = express();

Sentry.init(sentryConfig);

app.use(Sentry.Handlers.requestHandler());
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(Sentry.Handlers.errorHandler());
app.use(errors());

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(port, () => {
  console.log(`🚚 Server started on port ${port}.`);
});
