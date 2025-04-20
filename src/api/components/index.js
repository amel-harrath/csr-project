import { Router } from 'express';
import userMiddleware from '../middlewares/userMiddleware';

import Documents from './document/routes';
import Requirement from './requirement/routes';

const router = Router();

// Middleware to check for User existence.
// Can be used later for authorization and permissions
router.use(userMiddleware);

// ROUTER
router.use('/documents', Documents);
router.use('/requirements', Requirement);

export default router;
