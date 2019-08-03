import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const FormInputs = () => {
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [website, setWebsite] = useState('');
  const [note, setNote] = useState('');

  function titleChange(event) {
    const value = event.target.value;
    setTitle(value);
    console.log(title);
  }
  function fullNameChange(event) {
    const value = event.target.value;
    setFullName(value);
  }
  function phoneChange(event) {
    const value = event.target.value;
    setPhone(value);
  }
  function emailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }
  function homeAddressChange(event) {
    const value = event.target.value;
    setHomeAddress(value);
  }
  function companyChange(event) {
    const value = event.target.value;
    setCompany(value);
  }
  function countryChange(event) {
    const value = event.target.value;
    setCountry(value);
    console.log(country);
  }
  function stateChange(event) {
    const value = event.target.value;
    setState(value);
  }
  function streetChange(event) {
    const value = event.target.value;
    setStreet(value);
  }
  function zipCodeChange(event) {
    const value = event.target.value;
    setZipCode(value);
  }
  function websiteChange(event) {
    const value = event.target.value;
    setWebsite(value);
  }
  function noteChange(event) {
    const value = event.target.value;
    setNote(value);
  }
  function mobileChange(event) {
    const value = event.target.value;
    setMobile(value);
  }

  function OnSubmit() {
    const contact = {
      title,
      fullName,
      phone,
      mobile,
      email,
      homeAddress,
      company,
      country,
      state,
      street,
      zipCode,
      website,
      note,
    };
    console.log(contact);

    fetch('http://localhost:3001/api/contacts/', {
      method: 'POST',
      data: contact,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
      });
  }

  return (
    <>
      <label>Title</label>
      <select onChange={titleChange} name="title">
        <option value="">--select--</option> <option value="Mr.">Mr.</option>{' '}
        <option value="Mrs.">Mrs.</option> <option value="Miss.">Miss.</option>{' '}
        <option value="Master.">Master</option>{' '}
      </select>
      <form>
        <input
          type="text"
          name="fullName"
          label="Full Name"
          placeholder="Full Name"
          value={fullName}
          onChange={fullNameChange}
        />
      </form>
      <form>
        <input
          type="text"
          name="Phone"
          label="Phone"
          placeholder="Phone"
          value={phone}
          onChange={phoneChange}
        />
      </form>
      <Form.Input
        name="Mobile"
        label="Mobile"
        placeholder="Mobile(Optional)"
        value={mobile}
        onChange={mobileChange}
      />
      <Form.Input
        name="Email"
        label="Email"
        placeholder="Email(Optional)"
        value={email}
        onChange={emailChange}
      />
      <Form.Input
        name="HomeAddress"
        label="Home Address"
        placeholder="Home Address(Optional)"
        value={homeAddress}
        onChange={homeAddressChange}
      />
      <Form.Input
        name="Company"
        label="Company"
        placeholder="Company(Optional)"
        value={company}
        onChange={companyChange}
      />

      <label>Country</label>
      <select onChange={countryChange} name="country">
        <option value="">--select--</option> <option value="ng">Nigeria</option>{' '}
        <option value="us">United State of America</option>{' '}
      </select>
      <Form.Input
        name="State"
        label="State"
        placeholder="State(Optional)"
        value={state}
        onChange={stateChange}
      />
      <Form.Input
        name="Street"
        label="Street"
        placeholder="Street(Optional)"
        value={street}
        onChange={streetChange}
      />
      <Form.Input
        name="ZipCode"
        label="ZipCode"
        placeholder="ZipCode(Optional)"
        value={zipCode}
        onChange={zipCodeChange}
      />
      <Form.Input
        name="Website"
        label="Website"
        placeholder="Website(Optional)"
        value={website}
        onChange={websiteChange}
      />
      <Form.Input
        name="note"
        label="Note"
        placeholder="Note(Optional)"
        value={note}
        onChange={noteChange}
      />
      <Button primary onClick={OnSubmit}>
        Add Contact
      </Button>
    </>
  );
};

export default FormInputs;
