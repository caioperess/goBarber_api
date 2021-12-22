import { Router } from 'express';
import AuthenticateUserService from 'src/services/AuthenticateUserService';

const SessionsRoutes = Router();

SessionsRoutes.post('/', async (request, response) => {
  const authenticateUser = new AuthenticateUserService();
  const { token, user } = await authenticateUser.execute(request.body);

  delete user.password;

  response.json({ user, token });
});

export default SessionsRoutes;
