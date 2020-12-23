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

registriesRouter.get('/pagination/', async (request: any, response) => {
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

registriesRouter.get('/search/:name', async (request: any, response) => {
  const page = request.query.page || 1;
  const take = request.query.take || 10;
  const skip = (page - 1) * take;
  const { registry_id } = request.query;
  const { name } = request.params;

  const registryRepository = getRepository(Registry);
  const registries = await registryRepository.find({
    where: { registry_id, name },
    skip,
    take,
  });

  return response.json(registries);
});

registriesRouter.get('/:id', async (request: any, response) => {
  const { id } = request.params;

  const registryRepository = getRepository(Registry);
  const registries = await registryRepository.find({
    where: { id },
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

registriesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { ...rest }: Request = request.body;

  const registryRepository = getRepository(Registry);
  await registryRepository.update(id, {
    ...rest,
  });

  const updatedRegistry = await registryRepository.find({ id });

  return response.json(updatedRegistry);
});

registriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const registryRepository = getRepository(Registry);
  const registries = await registryRepository.delete({ id: `${id}` });

  return response.json(registries);
});

export default registriesRouter;
