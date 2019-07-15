import express from 'express';
import joi from '@hapi/joi';
import * as contactInterface from '../interfaces/contact-interface';
import * as contactSchema from '../schemas/contact-schema';

const router = express.Router();

/**  this would ideally be a database, but let me start with something simple*/
export let contactCollection: contactInterface.IData[] = [];

function generateMetadata(): contactInterface.IMetadata {
  return {
    contactID: Date.now().toString(),
    blocked: false,
    createdAt: new Date().toLocaleDateString(),
  };
}

function findContact(contactID: contactInterface.IContactID) {
  return contactCollection.find(
    currentContact => currentContact.metadata.contactID === contactID.id,
  );
}
export function doValidation(object: any, schema: any) {
  return joi.validate(object, schema, {
    abortEarly: false,
    stripUnknown: true,
  });
}

/**Saves contact */
router.post('/', (req, res) => {
  const { error, value } = doValidation(req.body, contactSchema.postSchema);

  if (error) {
    res.status(400).json({ error });

    return;
  }

  const createdContact: contactInterface.IData = {
    metadata: generateMetadata(),
    contact: value,
  };
  //Save this contact into the database
  contactCollection.push(createdContact);

  res.status(200).json({ data: contactCollection });
});

/**Fetches all contacts √√√√ */
router.get('/', (_req, res) => {
  res.status(200).json({
    data: contactCollection,
  });
});

/**Fetches a single contacts  √√√√*/
router.get('/:contactID', (req, res) => {
  const id = req.params.contactID;
  const { error, value: contactId } = doValidation(
    { id },
    contactSchema.getSchema,
  );
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const foundContact = findContact(contactId);

  if (!foundContact) {
    res
      .status(404)
      .json({ message: `${contactId.id} did not match any contact record` });
    return;
  }

  res.status(200).json({ data: foundContact });
});

/** Edit the contact information for a single contact  */
router.put('/:contactID', (req, res) => {
  const id = req.params.contactID;
  const { error, value: contactId } = doValidation(
    { id },
    contactSchema.getSchema,
  );

  const { error: err, value: updates } = doValidation(
    req.body,
    contactSchema.getSchema,
  );
  if (updates || err) {
    res.status(400).json({ updates, err });

    return;
  }

  if (error) {
    res.status(400).json({ error });

    return;
  }

  for (const index in contactCollection) {
    const oldContact = contactCollection[index];
    if (oldContact.metadata.contactID === contactId) {
      const updatedMetadata = {
        ...oldContact.metadata,
        updatedAt: new Date().toLocaleDateString(),
      };
      const updatedContact = { ...oldContact, ...req.body };
      contactCollection[index] = updatedContact;

      const data: contactInterface.IData = {
        metadata: updatedMetadata,
        contact: updatedContact,
      };

      res.status(200).json({ data });
    }
  }

  res
    .status(404)
    .json({ message: `${contactId} did not match any contact record` });

  return;
});

/** Deletes the contact information for a single contact √√√√ */
router.delete('/:contactID', (req, res) => {
  const id = req.params.contactID;
  const { error, value: contactId } = doValidation(
    { id },
    contactSchema.getSchema,
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }
  const oldLength = contactCollection.length;

  contactCollection = contactCollection.filter(
    contact => contact.metadata.contactID !== contactId.id,
  );

  const newLength = contactCollection.length;

  // if (oldLength === newLength || oldLength != newLength - 1) {
  if (oldLength === newLength) {
    res
      .status(404)
      .json({ message: `${contactId.id} did not match any contact record` });
    return;
  }

  res.status(200).json({ data: contactCollection });
});

// router.post('/blocks/:contactID', blockContact);

export default router;
