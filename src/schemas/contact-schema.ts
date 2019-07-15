import joi from '@hapi/joi';

const namePattern = /\b[a-zA-Z]+\b$/;
const phone = /^(\+[0-9]{3}|0)[0-9]{10}$/;

export const optionals = {
  title: joi.string().optional(),
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
export const required = {
  fullName: joi
    .string()
    .required()
    .regex(namePattern),
  phone: joi
    .string()
    .regex(phone)
    .required(),
};
export const iDSchema = {
  id: joi.string().required(),
};
