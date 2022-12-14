import { Router } from 'express';

import {CreateUserController} from './controllers/user/CreateUserController'
import { AuthUSerController } from './controllers/user/AuthUserController'


const router = Router();

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUSerController().handle)


export { router };