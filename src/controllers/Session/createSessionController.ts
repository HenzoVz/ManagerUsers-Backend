/* eslint-disable no-delete-var */
import { Router } from 'express';

import SessionUserServices from '../../services/Session/CreateSessionUserServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const sessionUser = new SessionUserServices();

  const { user, token } = await sessionUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
