import joi from '@hapi/joi';

const namePattern = /\b[a-zA-Z]+\b$/;
const phone = /^(\+[0-9]{3}|0)[0-9]{10}$/;

export const post = {
  title: joi.string(),
  fullName: joi
    .string()
    .required()
    .regex(namePattern),
  phone: joi
    .string()
    .regex(phone)
    .required(),
  mobile: joi.string().regex(phone),
  email: joi.string().email(),
  homeAddress: joi.string(),
  company: joi.string(),
  country: joi.string(),
  state: joi.string(),
  street: joi.string(),
  zipCode: joi.string(),
  website: joi.string(),
  note: joi.string(),
};

export const patch = {
  title: joi.string(),
  fullName: joi
    .string()

    .regex(namePattern),
  phone: joi.string().regex(phone),
  mobile: joi.string().regex(phone),
  email: joi.string().email(),
  homeAddress: joi.string(),
  company: joi.string(),
  country: joi.string(),
  state: joi.string(),
  street: joi.string(),
  zipCode: joi.string(),
  website: joi.string(),
  note: joi.string(),
};
