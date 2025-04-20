import Joi from 'src/utils/validation';

export const paramsIdSchema = Joi.object({
  id: Joi.number().required().messages({
    'number.base': 'DOCUMENT_ID_MUST_BE_A_NUMBER',
    'any.required': 'DOCUMENT_ID_REQUIRED',
  }),
});

// ADD DOCUMENT
export const addDocumentSchema = Joi.object({
  expirationDate: Joi.string().trim().allow('', null).default(null),
  file: Joi.string().required().messages({
    'any.required': 'FILE_URL_REQUIRED',
  }),
  documentType: Joi.string().required().messages({
    'any.required': 'DOCUMENT_TYPE_ID_REQUIRED',
  }),
});

// UPDATE DOCUMENT STATUS
export const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid('submitted', 'validated', 'expired', 'refused')
    .required()
    .messages({
      'any.required': 'STATUS_REQUIRED',
    }),
});
