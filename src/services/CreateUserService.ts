import User from '@models/User';
import { hash } from 'bcryptjs';
import AppError from 'src/errors/AppError';
import { getRepository } from 'typeorm';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email Address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
