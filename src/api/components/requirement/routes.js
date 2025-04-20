import { Router } from 'express';
import validator from 'src/api/middlewares/validator';
import { paramsIdSchema } from './validation';
import RequirementController from './controller';

const requirementController = new RequirementController();
const router = Router();

router.get('/', requirementController.getAllRequirements);

router.get(
  '/:id',
  validator(paramsIdSchema),
  requirementController.getRequirementDetails
);

export default router;
