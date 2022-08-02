import express, { Request, Response } from 'express';
import cors from 'cors';
import { PORT } from './utils';
import { AuthRouter, UserRouter } from './routers';

export class Server {
  readonly #express: express.Application;
  readonly port: Number

  constructor() {
    this.port = PORT;
    this.#express = express();
  }

  public init() {
    this.config();
    this.routers();
    this.start();
  }

  private routers() {
    this.#express.use(new AuthRouter().init());
    this.#express.use(new UserRouter().init());
  }

  private start() {
    this.#express.listen(this.port, () => {
      console.log(`App running on port ${this.port}`);
    });
  }

  private config() {
    this.#express.use(express.json());
    this.#express.use(express.urlencoded({ extended: false }));
    this.#express.use(cors());
  }
}
