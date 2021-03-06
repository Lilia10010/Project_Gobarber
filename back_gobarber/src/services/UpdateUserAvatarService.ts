import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/upload'

import User from '../models/User'

import AppError from '../errors/AppError'

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401);
    }


    if (user.avatar) {
      //unir os dois caminhos
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      //chegando se o arquivo realmete existe (stat, veridicar o estado de arquivo só se ele existir)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        //deletar avatar anterior
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    //metodo:save -> se o id do user já existir ele apenas atualiza, se não ele cria um novo user
    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
