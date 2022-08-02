import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRouter {
  private path = '/auth';

  init() {
    const routes = Router();

    const controller = new AuthController();

    routes.post(`${this.path}/signin`, controller.signin);

    return routes;
  }
}