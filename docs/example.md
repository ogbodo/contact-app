# Contact API Documentation

## To create a contact

`POST /api/contact`

The request body should contain

```ts
interface CreateContact {
  title?: string; //initials of the contact, e.g:Mr.Mrs.
  fullName: string; //Full name of the contact
  phone: string[]; // The phone numbers of the contact
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
    phone: "07032150416, +2348032150416"
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

Returns 400 if the request body is missing the `name` value or if phone or email is not valid.
