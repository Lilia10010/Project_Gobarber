//p3 dizer que o usuário esta autenticado

import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

import AppError from '../errors/AppError'

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

//caso o middleware sera validado, o usuários eteja autenticado vai ser chamado o next
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {

  //validação do token
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }
//deixando a posição vazia indica que não precisa dela
  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)


    //forçando o decoded ser do titpo TokenPayload
    const { sub } = decoded as TokenPayload

//console.log(decoded)

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
