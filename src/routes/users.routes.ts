import UploadConfig from '@config/upload';
import ensureAuthenticated from '@middlewares/ensureAuthenticate';
import { Router } from 'express';
import multer from 'multer';
import CreateUserService from 'src/services/CreateUserService';
import UpdateUserAvatarService from 'src/services/UpdateUserAvatarService';

const UserRoutes = Router();
const upload = multer(UploadConfig);

UserRoutes.post('/', async (request, response) => {
  const createUser = new CreateUserService();
  const user = await createUser.execute(request.body);

  delete user.password;

  return response.json(user);
});

UserRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default UserRoutes;
