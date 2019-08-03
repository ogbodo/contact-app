import React, { useState, useEffect } from 'react';
import { Input, Menu, Grid } from 'semantic-ui-react';
import BriefDetails from './BriefDetails';
import FormInputs from './AddContacts';
import { Redirect } from 'react-router-dom';

function ContactsMenuPointing() {
  const [selected, setSelected] = useState('Home');
  const [, setContacts] = useState([]);

  function handleItemClick(_e, { name }) {
    setSelected(name);
  }

  function onViewClicked(event) {
    return <Redirect to="/ContactDetails" />;
  }
  function onShareClicked(event) {
    alert('Share will soon be implemented');
  }

  function toggleBlock(contactID, route) {
    const url = `http://localhost:3001/api/contacts/${contactID}/${route}`;

    fetch(url, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setContacts(data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function FetchContacts({ blockedContact }) {
    const [contacts, setContacts] = useState([]);

    const url = `http://localhost:3001/api/contacts${
      blockedContact ? '/blocks' : '/'
    }`;

    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const mappedContacts = data.data.map(contact => (
            <BriefDetails
              {...contact}
              key={contact._id}
              view={onViewClicked}
              share={onShareClicked}
              blockContact={toggleBlock.bind(this, contact._id, 'block')}
              unBlockContact={toggleBlock.bind(this, contact._id, 'unblock')}
            />
          ));
          setContacts(mappedContacts);
        })
        .catch(error => {
          console.log(error);
        });
    }, [url]);

    return (
      <>
        {contacts.length ? (
          <Grid style={{ margin: '20px' }}>{contacts}</Grid>
        ) : (
          <div style={{ paddingLeft: '50px' }}>
            <h1>Empty List</h1>
          </div>
        )}
      </>
    );
  }

  function ToggleSelection() {
    return (
      <>
        {selected === 'Home' ? <FetchContacts blockedContact={false} /> : null}
        {selected === 'Add Contact' ? <FormInputs /> : null}
        {selected === 'View Blocked Contacts' ? (
          <FetchContacts blockedContact={true} />
        ) : null}
      </>
    );
  }

  return (
    <>
      <Menu pointing>
        <Menu.Item
          name="Home"
          active={selected === 'Home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Add Contact"
          active={selected === 'Add Contact'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="View Blocked Contacts"
          active={selected === 'View Blocked Contacts'}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Find..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <ToggleSelection />
    </>
  );
}

export default ContactsMenuPointing;
