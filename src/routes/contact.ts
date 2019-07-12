import express from 'express';
import joi from '@hapi/joi';

const router = express.Router();

const namePattern = /\b[a-zA-Z]+\b$/;
const phone = /^(\+123|0)[0-9]{10}$/;
// const websitePattern = /^((http:\/\/|https:\/\/)?)?www\.[a-z0-9_.-]{3,12}\.[a-z0-9]{3,12}(\.[a-z0-9]{2,12})?$/;

let contactCollection: IData[] = []; // this would ideally be a database, but we'll start with something simple
let blockedContactCollection: string[] = []; // this would ideally be a database, but we'll start with something simple
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
  website: joi.string().optional(),
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

function findContact(contactId: string) {
  return contactCollection.find(
    currentContact => currentContact.metadata.contactID === contactId,
  );
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
  const createdContact: IData = {
    metadata: generateMetadata(),
    contact: value,
  };
  //Save this contact into the database
  contactCollection.push(createdContact);
  res.status(200).json({ data: createdContact });
});

/**Fetches all contacts */
router.get('/', (_req, res) => {
  res.status(200).json({
    data: contactCollection,
  });
});

function makeUpdate(oldContact: ICreateContact, updateContact: ICreateContact) {
  return { ...oldContact, ...updateContact };
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

  const updatedContact = contactCollection.find(oldContact => {
    if (oldContact.metadata.contactID === contactId) {
      const updatedMetadata = {
        ...oldContact.metadata,
        updatedAt: new Date().toLocaleDateString(),
      };
      const updatedData: IData = {
        metadata: updatedMetadata,
        contact: makeUpdate(oldContact.contact, req.body),
      };

      return updatedData;
    }
    return;
  });

  if (!updatedContact) {
    res
      .status(404)
      .json({ message: `${contactId} did not match any contact record` });
    return;
  }

  res.status(200).json({ data: updatedContact });
});

/** Edit the contact information for a single contact  */
router.delete('/:contactID', (req, res) => {
  const { contactID: id } = req.params;

  const { error, value: contactId } = joi.validate<string>(id, getSchema, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ error });
    return;
  }
  const oldLength = contactCollection.length;

  contactCollection = contactCollection.filter(
    contact => contact.metadata.contactID !== contactId,
  );
  const newLength = contactCollection.length;

  if (oldLength === newLength || oldLength != newLength - 1) {
    res
      .status(404)
      .json({ message: `${contactId} did not match any contact record` });
    return;
  }

  res.status(200).json({ data: contactCollection });
});

/**To blocked a contact */
router.post('/block/:contactID', (req, res) => {
  const { contactID: id } = req.params;

  const { error, value: contactId } = joi.validate<string>(id, getSchema, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ error });
    return;
  }

  const blockedContact = contactCollection.find(oldContact => {
    if (oldContact.metadata.contactID === contactId) {
      const updatedMetadata = {
        ...oldContact.metadata,
        blocked: true,
      };
      const updatedData: IData = {
        metadata: updatedMetadata,
        contact: oldContact.contact,
      };

      return updatedData;
    }
    return;
  });

  if (!blockedContact) {
    res
      .status(404)
      .json({ message: `${contactId} did not match any contact record` });
    return;
  }

  //Save this contactID into the blocked contact database
  blockedContactCollection.push(contactId);
  res.status(200).json({ data: blockedContact });
});

/**To unblock a contact */
router.post('/blocks/:contactID', (req, res) => {
  const { contactID: id } = req.params;
  const { error, value: contactId } = joi.validate<string>(id, getSchema, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    res.status(400).json({ error });
    return;
  }
  for (const blockedContactID of blockedContactCollection) {
    if (blockedContactID === contactId) {
      const foundContact = findContact(blockedContactID);
      if (!foundContact) {
        res
          .status(404)
          .json({ message: `${contactId} did not match any contact record` });
        return;
      }
      const updatedMetadata = {
        ...foundContact.metadata,
        blocked: false,
      };
      const updatedData: IData = {
        metadata: updatedMetadata,
        contact: foundContact.contact,
      };

      /**Remove this contact ID from the list of blocked contact IDs collection */
      blockedContactCollection = blockedContactCollection.filter(
        blockedContactID => blockedContactID !== contactId,
      );

      res.status(200).json({ data: updatedData });
      return;
    }
  }
  res.status(404).json({
    message: `${contactId} did not match any blocked contact record`,
  });
  return;
});

/**Fetches all contacts */
router.get('/block', (_req, res) => {
  res.status(200).json({
    data: blockedContactCollection,
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

  const foundContact = findContact(contactId);

  if (!foundContact) {
    res
      .status(404)
      .json({ message: `${contactId} did not match any contact record` });
    return;
  }

  res.status(200).json({ data: foundContact });
});

export default router;
