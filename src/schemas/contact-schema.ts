import joi from '@hapi/joi';

const namePattern = /\b[a-zA-Z]+\b$/;
const phone = /^(\+[0-9]{3}|0)[0-9]{10}$/;

export const postSchema = {
  title: joi.string().optional(),
  fullName: joi
    .string()
    .required()
    .regex(namePattern),
  phone: joi
    .string()
    // .regex(phone)
    .required(),
  mobile: joi
    .string()
    .regex(phone)
    .optional(),
  email: joi
    .string()
    .email()
    .optional(),
  homeAddress: joi.string().optional(),
  company: joi.string().optional(),
  country: joi.string().optional(),
  state: joi.string().optional(),
  street: joi.string().optional(),
  zipCode: joi.string().optional(),
  website: joi.string().optional(),
};
export const getSchema = {
  id: joi.string().required(),
};
