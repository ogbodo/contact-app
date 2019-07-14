import express from 'express';
import joi from '@hapi/joi';
import * as contactInterface from '../interfaces/contact-interface';
import * as contactSchema from '../schemas/contact-schema';
import { contactCollection } from './contact';

const router = express.Router();

// this would ideally be a database, but let me start with something simple
let blockedContactCollection: contactInterface.IData[] = [];

// /**To blocked/unblock a contact */
router.post('/:contactID', (req, res) => {
  const id = req.params.contactID;
  const { error, value: contactId } = joi.validate<contactInterface.IContactID>(
    { id },
    contactSchema.getSchema,
    {
      abortEarly: false,
      stripUnknown: true,
    },
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }
  const combinedCollection = contactCollection.concat(blockedContactCollection);
  for (const index in combinedCollection) {
    const contact = combinedCollection[index];
    if (contact.metadata.contactID === contactId.id) {
      const updatedMetadata = {
        ...contact.metadata,
        blocked: !contact.metadata.blocked,
      };
      const blockedContact: contactInterface.IData = {
        metadata: updatedMetadata,
        contact: contact.contact,
      };
      if (blockedContact.metadata.blocked) {
        //Save this contact into the list blocked contacts
        blockedContactCollection.push(blockedContact);
        /**Remove this contact from the list of unblocked contacts */
        combinedCollection.splice(Number(index), 1);
        res.status(200).json({ data: contactCollection });
        return;
      } else if (!blockedContact.metadata.blocked) {
        //Save this contact into the list blocked contacts
        contactCollection.push(blockedContact);
        /**Remove this contact from the list of unblocked contacts */
        combinedCollection.splice(Number(index), 1);
        res.status(200).json({ data: blockedContactCollection });
        return;
      }
    }
  }
  res
    .status(404)
    .json({ message: `${contactId.id} did not match any contact record` });
});

/**Fetches all blocked contacts */
router.get('/', (_req, res) => {
  res.status(200).json({
    data: blockedContactCollection,
  });
});

/**Fetches a single contacts  √√√√*/
router.get('/:contactID', (req, res) => {
  const id = req.params.contactID;
  const { error, value: contactId } = joi.validate<contactInterface.IContactID>(
    { id },
    contactSchema.getSchema,
    {
      abortEarly: false,
      stripUnknown: true,
    },
  );
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const foundContact = blockedContactCollection.find(
    contact => contact.metadata.contactID === contactId.id,
  );
  if (!foundContact) {
    res
      .status(404)
      .json({ message: `${contactId.id} did not match any contact record` });
    return;
  }
  res.status(200).json({ data: foundContact });
});

export default router;
