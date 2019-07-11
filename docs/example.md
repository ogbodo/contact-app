# Contact API Documentation

`POST /api/contact`

The request body should contain

```ts
interface CreateContact {
  name?: string;
  email?: string;
  home?: string; // The home phone number of the user
  mobile?: string; This should be a valid phone number in international format eg. +2348020101010
  company?: string;
  website?: string;
}
```

For example

```json
{
    name: "Bond Akinmade"
    phone: "+2348060130003"
    email: "test@example.com"
    website: "https://bond.me"
}
```

Returns status code of `200` if the contact was successfully created. The response body would contain

```ts
interface CreateContactReponse {
  id: string; // The uuid of the newly created contact
  created: string; // The ISO date of when the contact was created
  contact: CreateContact; // An object with the contact information
}
```

Returns 400 if the request body is missing the `name` value or if phone or email is not valid.
