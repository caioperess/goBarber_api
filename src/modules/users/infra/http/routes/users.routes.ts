import UploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const UserRoutes = Router();

const upload = multer(UploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

UserRoutes.post('/', usersController.create);

UserRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default UserRoutes;
