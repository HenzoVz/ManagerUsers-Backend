import { Router } from 'express';
import registriesRouter from '../controllers/Registry/CreateRegistryController';
import usersRouter from '../controllers/User/CreateUserController';
import sessionsRouter from '../controllers/Session/createSessionController';

const routers = Router();

routers.use('/registries', registriesRouter);
routers.use('/users', usersRouter);
routers.use('/sessions', sessionsRouter);

export default routers;
