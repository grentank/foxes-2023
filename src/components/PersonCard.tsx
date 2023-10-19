import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import type { PersonType } from '../types/person';
import type { DeletePersonHandler, SwitchPersonStatusHandler } from '../types/handlers';

type PersonCardProps = {
  person: PersonType;
  killPersonHandler: SwitchPersonStatusHandler;
  deleteHandler: DeletePersonHandler;
};

export default function PersonCard({
  person,
  killPersonHandler,
  deleteHandler,
}: PersonCardProps): JSX.Element {
  return (
    <Card
      style={{
        width: '18rem',
        borderWidth: person.status === 'Dead' ? '5px' : '2px',
        borderColor: person.status === 'Dead' ? 'black' : 'whitesmoke',
      }}
    >
      <Card.Img variant="top" src={person.image} />
      <Card.Body>
        <Card.Title>{person.name}</Card.Title>
        <Card.Text>
          <br />
          &bull; {person.gender}
          <br />
          &bull; {person.status}
          <br />
          &bull; {person.age}
        </Card.Text>
        <Card.Footer>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="secondary"
              onClick={() => killPersonHandler(person.id)}
            >
              Switch
            </Button>
            <Button
              variant="secondary"
              onClick={() => deleteHandler(person.id)}
            >
              Delete
            </Button>
            <Button variant="secondary">Right</Button>
          </ButtonGroup>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
