import { Router } from 'express';
import registriesRouter from '../controllers/Registry/CreateRegistryController';
import usersRouter from '../controllers/User/CreateUserController';

const routers = Router();

routers.use('/registries', registriesRouter);
routers.use('/users', usersRouter);

export default routers;
