import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

export class Server {
  readonly #express: express.Application;
  readonly port: Number

  constructor() {
    this.port = Number(process.env.PORT);
    this.#express = express();
  }

  public init() {
    this.config();
    this.routers();
    this.start();
  }

  private routers() {
    this.#express.get('/', (request: Request, response: Response) => {
      return response.json({
        sucecss: true,
        statusCode: 200,
        data: `App running`
      })
    })
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
