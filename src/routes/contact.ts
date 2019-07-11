import express from 'express';
import joi from '@hapi/joi';

const router = express.Router();

const namePattern = /\b[a-zA-Z]+\b$/;
const phone = /^(\+123|0)[0-9]{10}$/;
// const websitePattern = /^((http:\/\/|https:\/\/)?)?www\.[a-z0-9_.-]{3,12}\.[a-z0-9]{3,12}(\.[a-z0-9]{2,12})?$/;

const contactCollection: IData[] = []; // this would ideally be a database, but we'll start with something simple
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
interface IData {
  metadata: IMetadata;
  contact: ICreateContact;
}

const postSchema = {
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
    .optional(),
  homeAddress: joi.string().optional(),
  company: joi.string().optional(),
  country: joi.string().optional(),
  state: joi.string().optional(),
  street: joi.string().optional(),
  zipCode: joi.string().optional(),
  website: joi
    .string()
    .optional()
    .domain(),
};
const getSchema = {
  contactID: joi.string().required(),
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
  const { error, value } = joi.validate<ICreateContact>(req.body, postSchema, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ error });
    return;
  }
  const data: IData = { metadata: generateMetadata(), contact: value };
  //Save this contact into the database
  contactCollection.push(data);
  res.status(200).json({ data });
});

/**Fetches all contacts */
router.get('/', (_req, res) => {
  res.status(200).json({
    data: contactCollection,
  });
});

/**Fetches a single contacts */
router.get('/:contactID', (req, res) => {
  const { contactID: id } = req.params;

  const { error, value: contactId } = joi.validate<string>(id, getSchema, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ error });
    return;
  }

  const foundContact = contactCollection.find(
    contact => contact.metadata.contactID === contactId,
  );

  if (!foundContact) {
    res
      .status(404)
      .json({ message: `${contactId} did not match any contact record` });
    return;
  }

  res.status(200).json({ foundContact });
});

function makeUpdate(oldContact: IData, foundContact: ICreateContact) {
  return { ...oldContact.contact, ...foundContact };
  //   let {
  //     title,
  //     fullName,
  //     phone,
  //     mobile,
  //     email,
  //     homeAddress,
  //     company,
  //     country,
  //     state,
  //     street,
  //     zipCode,
  //     website,
  //   } = oldContact.contact;
}
/** Edit the contact information for a single contact  */
router.patch('/:contactID', (req, res) => {
  const { contactID: id } = req.params;

  const { error, value: contactId } = joi.validate<string>(id, getSchema, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ error });
    return;
  }

  const foundContact = contactCollection.find(
    contact => contact.metadata.contactID === contactId,
  );

  if (!foundContact) {
    res
      .status(404)
      .json({ message: `${contactId} did not match any contact record` });
    return;
  }

  const updatedContact = makeUpdate(foundContact, req.params.body);

  res.status(200).json({ updatedContact });
});
export default router;
