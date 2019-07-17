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
    createdAt: new Date().toISOString(),
  };
}

export function doValidation(object: any, schema: joi.SchemaLike) {
  return joi.validate(object, schema, {
    abortEarly: false,
    stripUnknown: true,
  });
}
/**Saves contact */
router.post('/', (req, res) => {
  const { error, value } = doValidation(req.body, {
    ...contactSchema.post,
  });

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

/**Fetches all contacts*/
router.get('/', (_req, res) => {
  res.status(200).json({
    data: contactCollection,
  });
});

/**Fetches a single contacts*/
router.get('/:contactID', (req, res) => {
  const id = req.params.contactID;

  const foundContact = contactCollection.find(
    contact => contact.metadata.contactID === id,
  );

  if (!foundContact) {
    res.status(404).json({ message: `${id} did not match any contact record` });
    return;
  }

  res.status(200).json({ data: foundContact });
});

/** Edit the contact information for a single contact*/
router.patch('/:contactID', (req, res) => {
  const id = req.params.contactID;
  const { error, value } = doValidation(req.body, contactSchema.patch);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const contactIndex = contactCollection.findIndex(
    contact => contact.metadata.contactID === id,
  );
  if (contactIndex === -1) {
    res.status(404).json({ message: `${id} did not match any contact record` });
    return;
  }
  const oldContact = contactCollection[contactIndex];
  const updatedMetadata = {
    ...oldContact.metadata,
    updatedAt: new Date().toISOString(),
  };
  const updatedContact = { ...oldContact.contact, ...value };
  const data: contactInterface.IData = {
    metadata: updatedMetadata,
    contact: updatedContact,
  };
  contactCollection[contactIndex] = data;
  res.status(200).json({ data: contactCollection });
});
/** Deletes the contact information for a single contact √√√√ */
router.delete('/:contactID', (req, res) => {
  const id = req.params.contactID;

  const oldLength = contactCollection.length;
  contactCollection = contactCollection.filter(
    contact => contact.metadata.contactID !== id,
  );
  const newLength = contactCollection.length;

  if (oldLength === newLength) {
    res.status(404).json({ message: `${id} did not match any contact record` });

    return;
  }

  res.status(200).json({ data: contactCollection });
});
export default router;
