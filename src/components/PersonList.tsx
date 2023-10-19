import React from 'react';
import { Col, Row } from 'react-bootstrap';
import type { PersonType } from '../types/person';
import PersonCard from './PersonCard';
import type { DeletePersonHandler } from '../types/handlers';

type PersonListProps = {
  persons: PersonType[];
  killPersonHandler: (id: PersonType['id']) => void;
  deleteHandler: DeletePersonHandler;
};

export default function PersonList({
  persons,
  killPersonHandler,
  deleteHandler,
}: PersonListProps): JSX.Element {
  return (
    <Row>
      {persons.map((person) => (
        <Col xs={4} key={person.id}>
          <PersonCard
            deleteHandler={deleteHandler}
            person={person}
            killPersonHandler={killPersonHandler}
          />
        </Col>
      ))}
    </Row>
  );
}
