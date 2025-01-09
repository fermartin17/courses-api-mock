import Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  POSTGRES_HOST: Joi.required(),
  POSTGRES_PORT: Joi.required(),
  POSTGRES_DB: Joi.required(),
  POSTGRES_USER: Joi.required(),
  POSTGRES_PASSWORD: Joi.required(),
  RUN_MIGRATION: Joi.optional(),
  PORT: Joi.number().default(8080),
});
