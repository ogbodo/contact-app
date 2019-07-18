import express from 'express';

import Contact from '../models/contact.model';

const router = express.Router();

// /**To blocked a contact */
router.post('/:contactID', (req, res) => {
  const id = req.params.contactID;
  Contact.findByIdAndUpdate(id, { blocked: true })
    .then(() =>
      Contact.find({ blocked: false })
        .then(contacts => res.status(200).json({ data: contacts }))
        .catch(err => res.status(400).json(`Error: ${err}`)),
    )
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// /**To unblocked a contact */
router.patch('/:contactID', (req, res) => {
  const id = req.params.contactID;
  Contact.findByIdAndUpdate(id, { blocked: false })
    .then(() =>
      Contact.find({ blocked: true })
        .then(contacts => res.status(200).json({ data: contacts }))
        .catch(err => res.status(400).json(`Error: ${err}`)),
    )
    .catch(err => res.status(400).json(`Error: ${err}`));
});

/**Fetches all blocked contacts */
router.get('/', (_req, res) => {
  Contact.find({ blocked: true })
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

export default router;
