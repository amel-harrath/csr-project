import { Router } from 'express';
import routes from './components';

const router = Router();

router.use('/', routes);

export default router;
