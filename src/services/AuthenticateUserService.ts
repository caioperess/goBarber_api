import User from '@models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from 'src/errors/AppError';
import { getRepository } from 'typeorm';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, process.env.SECRET, {
      expiresIn: '1d',
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
