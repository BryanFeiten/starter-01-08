import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { CustomPayload } from "../contracts";
import { PRIVATE_TOKEN } from "../utils";

export class AuthMiddleware {
  verify = (request: Request, response: Response, next: NextFunction) => {
    const header = request.headers.authorization;

    if (!header) {
      return response.json({
        success: false,
        statusCode: 401,
        data: 'Faça o login',
      });
    }

    const [, token] = header.split(' ');

    try {
      const payload = jwt.verify(token, PRIVATE_TOKEN as string);
      
      request.body.uuid = (payload as CustomPayload).uuid;

      console.log(request.body.uuid);
      
      next();
    } catch (error) {
      return response.json({
        success: false,
        statusCode: 401,
        data: 'Faça o login',
      });
    }
  }
}