import CustomError from 'src/utils/errors';

export default (bodySchema = null, paramsSchema = null) =>
  async (req, res, next) => {
    try {
      if (bodySchema) req.body = await bodySchema.validateAsync(req.body);
      if (paramsSchema)
        req.params = await paramsSchema.validateAsync(req.params);

      next();
    } catch (error) {
      const err = new CustomError(
        'Request input is invalid',
        error.message,
        400
      );
      next(err);
    }
  };
