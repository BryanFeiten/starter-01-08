import 'dotenv/config';
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../entities";
import { UserRepository } from "../repositories";
import jwt from 'jsonwebtoken';
import { EXP_TOKEN, PRIVATE_TOKEN } from '../utils';

export class AuthController {
  signin = async (request: Request, response: Response) => {
    const { email, username, password } = request.body;

    if (!email && !username) {
      return response.json({
        success: false,
        statusCode: 400,
        data: 'Envie seu email ou nome de usuário',
      });
    }

    const users = UserRepository.users;

    let user: User | undefined;

    if (email) {
      user = users.find((user) => user.email === email);
    }

    if (username && !email) {
      user = users.find((user) => user.username === username);
    }

    if (!user) {
      return response.json({
        success: false,
        statusCode: 400,
        data: 'E-mail ou senha incorreto(s)',
      });
    }

    if ((await compare(password, user.password))) {
      const token = jwt.sign(
        {
          uuid: user.uuid, name: user.name,
        },
        PRIVATE_TOKEN,
        { expiresIn: EXP_TOKEN},
      );

      return response.json({
        success: true,
        statusCode: 200,
        data: {
          token,
        },
      });
    }

    return response.json({
      success: false,
      statusCode: 400,
      data: 'E-mail ou senha incorreto(s)',
    });
  }
}