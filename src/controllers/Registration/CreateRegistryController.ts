import { getRepository } from 'typeorm';

import Registration from '../../models/Registries/entities/Registry';

import AppError from '../../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
}

class CreateRegistrationController {
  public async execute({ ...rest }: RequestDTO): Promise<Registration> {
    const registryRepository = getRepository(Registration);

    const { email } = rest;

    const checkRegistryExists = await registryRepository.findOne({
      where: { email },
    });

    if (checkRegistryExists) {
      throw new AppError('Email addres already used.');
    }

    const registration = registryRepository.create({
      ...rest,
    });

    await registryRepository.save(registration);

    return registration;
  }
}

export default CreateRegistrationController;
