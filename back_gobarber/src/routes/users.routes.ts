import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router();

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {

     const { name, email, password } = request.body;

     const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    //deletar para não aparecer na listagem
    delete user.password

    return response.json(user)

})


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  // console.log(request.file)

    const upDateUserAvatar = new UpdateUserAvatarService()

   const user = await upDateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password

     return response.json(user)

} )

export default usersRouter
