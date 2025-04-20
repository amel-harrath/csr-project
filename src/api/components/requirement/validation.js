import Joi from 'src/utils/validation';

export const paramsIdSchema = Joi.object({
  id: Joi.number().required().messages({
    'number.base': 'REQUIREMENT_ID_MUST_BE_A_NUMBER',
    'any.required': 'REQUIREMENT_ID_REQUIRED',
  }),
});
