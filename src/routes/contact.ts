import express from 'express';
import joi from '@hapi/joi';

const router = express.Router();

const namePattern = /\b[a-zA-Z]+\b$/;
const emailPattern = /^[a-z0-9._+-]{3,}@[a-z0-9_.-]{3,12}\.[a-z0-9]{3,12}(\.[a-z0-9]{2,12})?$/;
const phone = /^(\+123|0)[0-9]{10}$/;
const websitePattern = /^((http:\/\/|https:\/\/)?)?www\.[a-z0-9_.-]{3,12}\.[a-z0-9]{3,12}(\.[a-z0-9]{2,12})?$/;

interface CreateContact {
  title?: string; //initials of the contact, e.g:Mr.Mrs.
  fullName: string; //Full name of the contact
  phone: string; // The phone number of the contact
  mobile?: string; // The mobile number of the contact
  email?: string; //contact's valid email address
  homeAddress?: string; //Home address of the contact
  company?: string; //contact's company name
  country?: string; //contact's country
  state?: string; //contact's state
  street?: string; //contact's street name
  zipCode?: string; //contact's country zip code
  website?: string; //contact's website address
}

const schema = {
  title: joi.string().optional(),
  fullName: joi
    .string()
    .required()
    .regex(namePattern),
  phone: joi
    .string()
    .regex(phone)
    .required(),
  mobile: joi
    .string()
    .regex(phone)
    .required(),
  email: joi
    .string()
    .email()
    .optional()
    .regex(emailPattern),
  homeAddress: joi.string().optional(),
  company: joi.string().optional(),
  country: joi.string().optional(),
  state: joi.string().optional(),
  street: joi.string().optional(),
  zipCode: joi.string().optional(),
  website: joi
    .string()
    .optional()
    .regex(websitePattern),
};

router.post('/', (req, res) => {
  const { error, value } = joi.validate<CreateContact>(req.body, schema, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ error });
    return;
  }

  res.status(200).json({ data: value });
});

export default router;
