import { Router } from 'express';

import { getRepository } from 'typeorm';
import {
  CreateRegistryServices,
  RequestDTO,
} from '../../services/Registration/CreateRegistryServices';

import Registry from '../../models/Registry';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

interface Request extends RequestDTO {
  registry_id: string;
}

const registriesRouter = Router();
registriesRouter.use(ensureAuthenticated);

registriesRouter.get('/', async (request: any, response) => {
  const page = request.query.page || 1;
  const take = request.query.take || 10;
  const skip = (page - 1) * take;
  const { registry_id } = request.query;

  const registryRepository = getRepository(Registry);
  const registries = await registryRepository.find({
    where: { registry_id },
    skip,
    take,
  });

  return response.json(registries);
});

registriesRouter.post('/', async (request, response) => {
  const { ...rest }: Request = request.body;

  const createRegistry = new CreateRegistryServices();

  const registry = await createRegistry.execute({
    ...rest,
  });

  return response.json(registry);
});

export default registriesRouter;
