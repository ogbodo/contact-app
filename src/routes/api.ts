import { Router } from 'express';
import joi from '@hapi/joi';

const router = Router();

router.get('/home', (_req, res) => {
  res.status(200).json({ data: 'Hello World' });
});

const schema = {
  fullname: joi
    .string()
    .min(5)
    .required(),
  address: joi
    .string()
    .min(10)
    .optional()
    .allow(''),
  email: joi
    .string()
    .email()
    .optional()
    .allow('')
    .lowercase(),
};

interface Home {
  fullname: string;
  address?: string;
  email?: string;
}

router.post('/home', (req, res) => {
  const { error, value } = joi.validate<Home>(req.body, schema, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ error });

    return;
  }

  res.status(200).json({ data: `Welcome home ${value.fullname}` });
});

export default router;
