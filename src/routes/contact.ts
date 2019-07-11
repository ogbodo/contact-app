import express from 'express';
import joi, { date } from '@hapi/joi';

const router = express.Router();

const namePattern = /\b[a-zA-Z]+\b$/;
const emailPattern = /^[a-z0-9._+-]{3,}@[a-z0-9_.-]{3,12}\.[a-z0-9]{3,12}(\.[a-z0-9]{2,12})?$/;
const phone = /^(\+123|0)[0-9]{10}$/;
const websitePattern = /^((http:\/\/|https:\/\/)?)?www\.[a-z0-9_.-]{3,12}\.[a-z0-9]{3,12}(\.[a-z0-9]{2,12})?$/;

const contactCollection: ICreateContact[] = []; // this would ideally be a database, but we'll start with something simple
let id = 1; // this will help us identify unique users
interface ICreateContact {
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

interface IMetadata {
  contactID: string; // The uuid of the  contact
  createdAt: string; // The ISO date of when the contact was created}
  blocked: boolean; //Tells if this contact is Blocked or not
}

function generateMetadata(): IMetadata {
  return {
    contactID: new Date().getTime().toString(),
    blocked: false,
    createdAt: new Date().toLocaleDateString(),
  };
}

/**Saves contact */
router.post('/', (req, res) => {
  const { error, value } = joi.validate<ICreateContact>(req.body, schema, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ error });
    return;
  }

  //Save this contact into the database
  contactCollection.push(value);
  res
    .status(200)
    .json({ data: { metadata: generateMetadata(), contact: value } });
});

/**Fetches all contacts */
router.get('/', (_req, res) => {
  res.status(200).json({
    data: { metadata: generateMetadata(), contact: contactCollection },
  });
});

export default router;
