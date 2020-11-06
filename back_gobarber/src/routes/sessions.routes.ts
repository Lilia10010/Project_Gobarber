import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {


    const { email, password } = request.body;

    const authentucateUser = new AuthenticateUserService()

    //recebendo no serviço
    const { user, token } = await authentucateUser.execute({
      email,
      password
    })

    delete user.password


//enviando pro fornt
     return response.json({ user, token })

})

export default sessionsRouter
