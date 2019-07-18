import express from 'express';
import joi from '@hapi/joi';
import * as contactSchema from '../schemas/contact-schema';
import Contact from '../models/contact.model';

const router = express.Router();

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
  const newContact = new Contact({ ...value });
  /**TODO use bulk write to save and retrieve at once */
  newContact
    .save()
    .then(() => res.status(200).json({ data: 'Saved' }))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

/**Fetches all contacts*/
router.get('/', (_req, res) => {
  Contact.find({ blocked: false })
    .then(contacts => res.status(200).json({ data: contacts }))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

/**Fetches a single contacts*/
router.get('/:contactID', (req, res) => {
  const id = req.params.contactID;
  Contact.findById(id)
    .then(contact => res.status(200).json({ data: contact }))
    .catch(err => res.status(404).json(`Error: ${err}`));
});

/** Edit the contact information for a single contact*/
router.patch('/:contactID', (req, res) => {
  const id = req.params.contactID;
  const { error, value } = doValidation(req.body, contactSchema.patch);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  Contact.findByIdAndUpdate(id, value)
    .then(() =>
      Contact.find({ blocked: false })
        .then(contacts => res.status(200).json({ data: contacts }))
        .catch(err => res.status(400).json(`Error: ${err}`)),
    )
    .catch(err => res.status(400).json(`Error: ${err}`));
});

/** Deletes the contact information for a single contact √√√√ */
router.delete('/:contactID', (req, res) => {
  const id = req.params.contactID;
  Contact.findByIdAndDelete(id)
    .then(() => res.status(200).json('Contact deleted'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

export default router;
