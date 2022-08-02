import { Router } from 'express';
import { UserController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

export class UserRouter {
  private path = '/user';

  init() {
    const routes = Router();

    const auth = new AuthMiddleware();
    const controller = new UserController();

    routes.get(`${this.path}`, auth.verify, controller.index);
    routes.get(`${this.path}/:username`, auth.verify, controller.show);
    routes.post(`${this.path}`, controller.store);
    routes.put(`${this.path}`, auth.verify, controller.update);
    routes.delete(`${this.path}`, auth.verify, controller.delete);

    return routes;
  }
}