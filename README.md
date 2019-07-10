# Contacts App API

Design the API backend for a contacts app that is able to

- List all the contacts in the app
- Add a new contact
- View the contact information for a single contact
- Edit the contact information for a single contact
- Allow the client to block a specific contact
  - Blocked contacts should not show by default in the contacts list
  - The client should be able to view block contacts and unblock them as needed

Ensure that all your functions are properly tested.

---

Start by writing your API specification in a docs/spec.md file

The spec should contain information about the routes request methods, status code, and the response. For example:

```
To delete a contact

DELETE /contact/:contactID

Returns status code 200 if the contact is successfully deleted and the ID of the contact in the response body.

Returns status code 404 if the contact to be deleted was not found.
```

Write this for all the routes that your app supports.

---

You are eventually going to write tests that ensure that your specification is conformed to.

Although your spec can be a living document, be aware that with REST, you can break clients that already implement a version of your API if you change the API.

Hence, put some thought into your design.
