import express from 'express';
import * as contactInterface from '../interfaces/contact-interface';
import * as contactSchema from '../schemas/contact-schema';
import { contactCollection, doValidation } from './contact';
const router = express.Router();

// this would ideally be a database, but let me start with something simple
let blockedContactCollection: contactInterface.IData[] = [];

function changeBlockStatus(contact: contactInterface.IData, status: boolean) {
  const updatedMetadata = {
    ...contact.metadata,
    updatedAt: new Date().toISOString(),
    blocked: status,
  };
  return {
    metadata: updatedMetadata,
    contact: contact.contact,
  };
}
// /**To blocked/unblock a contact */
router.post('/:contactID', (req, res) => {
  const id = req.params.contactID;
  const { error, value: contactId } = doValidation({ id }, contactSchema.id);

  if (error) {
    res.status(400).json({ error });
    return;
  }

  let contactIndex = contactCollection.findIndex(
    contact => contact.metadata.contactID === id,
  );

  if (contactIndex !== -1) {
    const contact = contactCollection[contactIndex];
    const blockedContact = changeBlockStatus(contact, true);
    blockedContactCollection.push(blockedContact); //Save this contact into the list blocked contacts
    contactCollection.splice(Number(contactIndex), 1); //Remove this contact from the list of unblocked contacts
    res.status(200).json({ data: contactCollection });
    return;
  }
  contactIndex = blockedContactCollection.findIndex(
    contact => contact.metadata.contactID === id,
  );
  if (contactIndex !== -1) {
    const contact = blockedContactCollection[contactIndex];
    const unBlockedContact = changeBlockStatus(contact, false);
    contactCollection.push(unBlockedContact); //Save this contact into the list blocked contacts
    blockedContactCollection.splice(Number(contactIndex), 1); //Remove this contact from the list of unblocked contacts
    res.status(200).json({ data: blockedContactCollection });
    return;
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
  const { error, value: contactId } = doValidation({ id }, contactSchema.id);
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
