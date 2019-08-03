import React from 'react';
import { Card, Image, Button, Flag } from 'semantic-ui-react';
// import ContactDetails from './ContactDetails';

const ShortContactDetail = ({
  title,
  fullName,
  phone,
  country,
  website,
  note,
  view,
  share,
  blocked,
  blockContact,
  unBlockContact,
}) => {
  function CustomButton({ event, label }) {
    return (
      <Button onClick={event} basic color="red">
        {label}
      </Button>
    );
  }
  function ToggleBlockContact() {
    return (
      <>
        {blocked ? (
          <CustomButton event={unBlockContact} label={'Unblock'} />
        ) : (
          <CustomButton event={blockContact} label={'Block'} />
        )}
      </>
    );
  }
  return (
    <Card
      style={{
        width: '420px',
        height: '220px',
        cursor: 'pointer',
        float: 'left',
        textAlign: 'center',
        margin: '10px',
      }}
    >
      <Card.Content
        style={{
          textAlign: 'center',
        }}
      >
        <Image onClick={view} floated="left">
          <Flag name={country} />
        </Image>
        <Image
          onClick={view}
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header onClick={view}>{`${title} ${fullName}`}</Card.Header>
        <Card.Meta>{website}</Card.Meta>
        <Card.Description onClick={view}>
          <h3>{phone}</h3>
          <h4>{note}</h4>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui four buttons">
          <Button onClick={view} basic color="green">
            View Details
          </Button>
          <Button onClick={share} basic color="blue">
            Share Contact
          </Button>
          <ToggleBlockContact />
        </div>
      </Card.Content>
    </Card>
  );
};

export default ShortContactDetail;
