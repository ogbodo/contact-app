# Contact API Documentation

## To create a contact

`POST /contacts`

The request body should contain

```ts
interface CreateContact {
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
```

For example

```json
{
    title: "Mr."
    fullName: "Solomon Ogbodo"
    phone: "07032150416"
    mobile: "+2348032150416"
    email: "solomon@gmail.com"
    homeAddress:"No. 3 awilo road lagos"
    company:"Decagon"
    country:"Nigeria"
    state:"Lagos"
    street:"Aja street"
    zipCode:"10009234"
    website:"solomon.me"

}
```

Returns status code of `200` if the contact was successfully created. The response body would contain

```ts
interface CreateContactResponse {
  metadata: {
    contactID: string; // The uuid of the  contact
    createdAt: string; // The ISO date of when the contact was created}
    blocked: boolean; //Tells if this contact is Blocked or not
  };
  contact: CreateContact; // An object with the contact information
}
```

Returns status code `400` if the request body is missing the `fullName` or `phone` values or if `phone` or `email` is not valid.

## To list all contacts

`GET /contacts`

Returns status code `200` if contacts exist. The response body would contain

```ts
interface ListContactResponse {
  data: [
    {
      metadata: {
        contactID: string; // The uuid of the  contact
        createdAt: string; // The ISO date of when the contact was created
        blocked: boolean; //Tells if this contact is Blocked or not
      };
      contact: {
        title: string; //initials of the contact, e.g:Mr.Mrs.
        fullName: string; //Full name of the contact
        phone: string; // The phone number of the contact
        mobile?: string; // The mobile number of the contact
        email: string; //contact's valid email address
        homeAddress: string; //Home address of the contact
        company: string; //contact's company name
        country: string; //contact's country
        state: string; //contact's state
        street: string; //contact's street name
        zipCode: string; //contact's country zip code
        website: string; //contact's website address
      };
    },
    ...,
  ];
}
```

If no contact exists, returns status code `200` with response body

```ts
interface ListContactResponse {
  data: [];
}
```

## To view a single contact information

`GET /contacts/:contactID`

Returns status code `200` if the contact exist. The response body would contain

```ts
interface ContactResponse {
  metadata: {
    contactID: string; // The uuid of the  contact
    createdAt: string; // The ISO date of when the contact was created
    blocked: boolean; //Tells if this contact is Blocked or not
  };
  contact: {
    title: string; //initials of the contact, e.g:Mr.Mrs.
    fullName: string; //Full name of the contact
    phone: string; // The phone number of the contact
    mobile: string; // The mobile number of the contact
    email: string; //contact's valid email address
    homeAddress: string; //Home address of the contact
    company: string; //contact's company name
    country: string; //contact's country
    state: string; //contact's state
    street: string; //contact's street name
    zipCode: string; //contact's country zip code
    website: string; //contact's website address
  };
}
```

Returns status code `404` if no contact exist or no contact matches the requested contactID.

## Edit the contact information for a single contact

`PATCH /contacts/:contactID`

The request body should contain

```ts
interface UpdateContact {
   data: [
    {
      metadata: {
        contactID: string; // The uuid of the  contact
        createdAt: string; // The ISO date of when the contact was created
        blocked: boolean; //Tells if this contact is Blocked or not
        updatedAt:string //The ISO date of when last this contact was updated
      };
      contact: {
        title: string; //initials of the contact, e.g:Mr.Mrs.
        fullName: string; //Full name of the contact
        phone: string; // The phone number of the contact
        mobile?: string; // The mobile number of the contact
        email: string; //contact's valid email address
        homeAddress: string; //Home address of the contact
        company: string; //contact's company name
        country: string; //contact's country
        state: string; //contact's state
        street: string; //contact's street name
        zipCode: string; //contact's country zip code
        website: string; //contact's website address
      };
    },
    ...,
  ];
}
```

For example

```json
{
    title: "Mr."
    fullName: "Izuchukwu Ogbodo"
    phone: "07032150416"
    mobile:" +2348032150416"
    email: "solomon@gmail.com"
    homeAddress:"No. 3 awilo road lagos"
    company:"Decagon"
    country:"Nigeria"
    state:"Abuja"
    street:"Nyanya street"
    zipCode:"10209234"
    website:"solomonogbodo.com"

}
```

Returns status code of `200` if the contact was successfully updated. The response body would contain

```ts
interface UpdatedContact {
  metadata: {
    contactID: string; // The uuid of the  contact updated
    createdAt: string; // The ISO date of when the contact was updated
    updatedAt: string; // The ISO date of when the update was made
    blocked: boolean; //Tells if this contact is Blocked or not
  };
  contact: UpdateContact; // An object with the contact information
}
```

Returns status code `400` if the request body is empty or if `phone` or `email` is not valid.

## To delete a single contact information

`DELETE /contacts/:contactID`

Returns status code `200` if the contact exist. The response body would contain

```ts
interface ContactResponse {
    data: [
    {
      metadata: {
        contactID: string; // The uuid of the  contact
        createdAt: string; // The ISO date of when the contact was created
        blocked: boolean; //Tells if this contact is Blocked or not
      };
      contact: {
        title: string; //initials of the contact, e.g:Mr.Mrs.
        fullName: string; //Full name of the contact
        phone: string; // The phone number of the contact
        mobile?: string; // The mobile number of the contact
        email: string; //contact's valid email address
        homeAddress: string; //Home address of the contact
        company: string; //contact's company name
        country: string; //contact's country
        state: string; //contact's state
        street: string; //contact's street name
        zipCode: string; //contact's country zip code
        website: string; //contact's website address
      };
    },
    ...,
  ];
}
```

Returns status code `404` if no contact exist or no contact matches the requested contactID.

## To block a specific contact

`POST /block/:contactID`

Returns status code `200` if the contact exist. The response body would contain

```ts
interface BlockContactResponse {
  data: [
    {
      metadata: {
        contactID: string; // The uuid of the  contact
        createdAt: string; // The ISO date of when the contact was created
        blocked: boolean; //Tells if this contact is Blocked or not
        updatedAt:string //The ISO date of when last this contact was updated
      };
      contact: {
        title: string; //initials of the contact, e.g:Mr.Mrs.
        fullName: string; //Full name of the contact
        phone: string; // The phone number of the contact
        mobile?: string; // The mobile number of the contact
        email: string; //contact's valid email address
        homeAddress: string; //Home address of the contact
        company: string; //contact's company name
        country: string; //contact's country
        state: string; //contact's state
        street: string; //contact's street name
        zipCode: string; //contact's country zip code
        website: string; //contact's website address
      };
    },
    ...
  ];
}
```

Returns status code `404` if no contact exist or no contact matches the requested contactID.

## To unblock a specific contact

`POST /block/:contactID`

Returns status code `200` if the contact exist. The response body would contain

```ts
interface UnblockContactResponse {
  data: [
    {
      metadata: {
        contactID: string; // The uuid of the  contact
        createdAt: string; // The ISO date of when the contact was created
        blocked: boolean; //Tells if this contact is Blocked or not
        updatedAt: string; //The ISO date of when last this contact was updated
      };
      contact: {
        title: string; //initials of the contact, e.g:Mr.Mrs.
        fullName: string; //Full name of the contact
        phone: string; // The phone number of the contact
        mobile?: string; // The mobile number of the contact
        email: string; //contact's valid email address
        homeAddress: string; //Home address of the contact
        company: string; //contact's company name
        country: string; //contact's country
        state: string; //contact's state
        street: string; //contact's street name
        zipCode: string; //contact's country zip code
        website: string; //contact's website address
      };
    },
  ];
}
```

Returns status code `404` if no contact exist or no contact matches the requested contactID.

## To view blocked contacts

`GET /block`

Returns status code `200` if contacts exist. The response body would contain

```ts
interface ListBlockedContactsResponse {
  data: [
    {
      metadata: {
        contactID: string; // The uuid of the  contact
        createdAt: string; // The ISO date of when the contact was created
        blocked: boolean; //Tells if this contact is Blocked or not
        updatedAt: string; //The ISO date of when last this contact was updated
      };
      contact: {
        title: string; //initials of the contact, e.g:Mr.Mrs.
        fullName: string; //Full name of the contact
        phone: string; // The phone number of the contact
        mobile?: string; // The mobile number of the contact
        email: string; //contact's valid email address
        homeAddress: string; //Home address of the contact
        company: string; //contact's company name
        country: string; //contact's country
        state: string; //contact's state
        street: string; //contact's street name
        zipCode: string; //contact's country zip code
        website: string; //contact's website address
      };
    },
    ...
  ];
}
```

If no blocked contact exists, returns status code `200` with response body

```ts
interface ListBlockedContactsResponse {
  data: [];
}
```

## To view a single blocked contact information

`GET /block/:contactID`

Returns status code `200` if the contact exist. The response body would contain

```ts
interface ContactResponse {
  metadata: {
    contactID: string; // The uuid of the  contact
    createdAt: string; // The ISO date of when the contact was created
    blocked: boolean; //Tells if this contact is Blocked or not
    updatedAt: string; //The ISO date of when last this contact was updated
  };
  contact: {
    title: string; //initials of the contact, e.g:Mr.Mrs.
    fullName: string; //Full name of the contact
    phone: string; // The phone number of the contact
    mobile: string; // The mobile number of the contact
    email: string; //contact's valid email address
    homeAddress: string; //Home address of the contact
    company: string; //contact's company name
    country: string; //contact's country
    state: string; //contact's state
    street: string; //contact's street name
    zipCode: string; //contact's country zip code
    website: string; //contact's website address
  };
}
```

Returns status code `404` if no contact exist or no contact matches the requested contactID.
