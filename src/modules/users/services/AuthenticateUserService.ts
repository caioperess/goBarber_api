import User from '@modules/users/infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AuthConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const comparePassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!comparePassword) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { expiresIn, secret } = AuthConfig;

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
