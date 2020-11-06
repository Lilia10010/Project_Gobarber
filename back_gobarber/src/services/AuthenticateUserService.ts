import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import {  sign } from 'jsonwebtoken'
import authoConfig from  '../config/auth'

import AppError from '../errors/AppError'

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    //compare é para comparar a senha criptocrafada com a ñ criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // const { secret, expiresIn } = authoConfig;

    const token = sign({  }, authoConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authoConfig.jwt.expiresIn,

    })

    return {
      user,
      token
    };
  }
}

export default AuthenticateUserService;