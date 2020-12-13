import { Router } from 'express';

import { getRepository } from 'typeorm';
import {
  CreateRegistryServices,
  RequestDTO,
} from '../../services/Registration/CreateRegistryServices';

import Registry from '../../models/Registry';

interface Request extends RequestDTO {
  registry_id: string;
}

const registriesRouter = Router();

registriesRouter.get('/', async (request, response) => {
  const registryRepository = getRepository(Registry);
  const registries = await registryRepository.find();

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
