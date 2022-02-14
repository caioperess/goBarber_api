import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import '@config/dotenv';
import '@shared/infra/typeorm';
import '@shared/container';
import 'reflect-metadata';
import 'express-async-errors';
import UploadConfig from '@config/upload';
import HandleAppErrors from '@shared/infra/http/middlewares/appErrorHandler';
import routes from './routes';

class App {
  server: Express;

  nodeEnv: string;

  constructor() {
    this.nodeEnv = process.env.NODE_ENV;
    this.server = express();
    this.middlewares();
    this.routes();
    this.handleErrors();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());

    if (this.nodeEnv === 'development') {
      this.server.use(morgan('tiny'));
    } else {
      this.server.use(
        morgan(`[:date] - :method [:status] :url - :response-time ms`),
      );
    }
  }

  routes() {
    this.server.use(routes);
    this.server.use('/files', express.static(UploadConfig.directory));
  }

  handleErrors() {
    this.server.use(HandleAppErrors);
  }
}

export default new App().server;
