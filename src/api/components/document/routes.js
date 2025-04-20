import { Router } from 'express';
import validator from 'src/api/middlewares/validator';
import {
  addDocumentSchema,
  updateStatusSchema,
  paramsIdSchema,
} from './validation';
import DocumentController from './controller';

const documentController = new DocumentController();
const router = Router();

router.post('/', validator(addDocumentSchema), documentController.addDocument);
router.patch(
  '/:id',
  validator(updateStatusSchema, paramsIdSchema),
  documentController.updateDocumentStatus
);
router.delete(
  '/:id',
  validator(paramsIdSchema),
  documentController.deleteDocument
);

router.get('/', documentController.getAllDocuments);

export default router;
