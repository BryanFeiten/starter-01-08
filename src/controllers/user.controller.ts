import 'dotenv/config';
import { hashSync, compare } from 'bcrypt';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories';
import { User } from '../entities';

export class UserController {
  index = (request: Request, response: Response) => {
    const users = UserRepository.users.map((user) => user.toView());

    return response.json({
      success: true,
      statusCode: 200,
      data: users,
    });
  };

  show = (request: Request, response: Response) => {
    const { username } = request.params;

    const user = UserRepository.users.find((repoUser: User) => {
      return repoUser.username === username;
    });

    if (!user) {
      return response.json({
        success: true,
        statusCode: 404,
        data: 'Usuário não encontrado',
      })
    }

    return response.json({
      success: true,
      statusCode: 200,
      data: user.toView(),
    });
  };

  store = (request: Request, response: Response) => {
    const { username, name, email, password } = request.body;

    if (!username || !name || !email || !password) {
      return response.json({
        success: false,
        statusCode: 400,
        data: 'É necessário enviar todos os dados requisitados',
      });
    }

    const users = UserRepository.users;

    if (!users.every((user) => user.email != email)) {
      return response.json({
        success: false,
        statusCode: 400,
        data: 'Já existe um usuário com esse e-mail',
      });
    }

    if (!users.every((user) => user.username != username)) {
      return response.json({
        success: false,
        statusCode: 400,
        data: 'Já existe um usuário com esse apelido',
      });
    }

    const hashedPassword = hashSync(password, 10);
    const newUser = new User(username, name, email, hashedPassword);

    users.push(newUser);

    return response.json({
      success: true,
      statusCode: 201,
      data: newUser.toView(),
    });
  };

  update = (request: Request, response: Response) => {
    return response.json({
      success: true,
      statusCode: 200,
      data: 'any',
    });
  };

  delete = (request: Request, response: Response) => {
    return response.json({
      success: true,
      statusCode: 200,
      data: 'any',
    });
  };
}