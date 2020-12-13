import { Router } from 'express';

import SessionUserServices from '../../services/Session/CreateSessionUserServices';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const sessionsRouter = Router();
sessionsRouter.use(ensureAuthenticated);

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const sessionUser = new SessionUserServices();

    const { user, token } = await sessionUser.execute({
      email,
      password,
    });

    delete password;

    return response.json({ user, token });
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default sessionsRouter;
