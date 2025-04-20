import Joi from 'joi';

export default Joi.defaults((schema) =>
  schema.options({ abortEarly: true, stripUnknown: true })
);
