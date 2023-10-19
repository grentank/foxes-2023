import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import type { APIResponse, ApiPersonType, PersonType } from './types/person';
import getRandomAge from './utils/getRandomAge';
import PersonList from './components/PersonList';
import switchStatus from './utils/switchStatus';
import type { AsyncSubmitHandler, DeletePersonHandler } from './types/handlers';
import FindPersonForm from './components/FindPersonForm';

function App(): JSX.Element {
  const [persons, setPersons] = useState<PersonType[]>([]);

  useEffect(() => {
    axios<APIResponse>('https://rickandmortyapi.com/api/character')
      .then((res) =>
        setPersons(
          res.data.results.map((person) => ({
            ...person,
            age: getRandomAge(),
          })),
        ),
      )
      .catch(console.log);
  }, []);

  const killPersonHandler = (personId: PersonType['id']): void => {
    setPersons((prev) =>
      prev.map((person) =>
        person.id === personId
          ? {
              ...person,
              status: switchStatus(person.status),
            }
          : person,
      ),
    );
  };

  const deleteHandler: DeletePersonHandler = (id) => {
    setPersons((prev) => prev.filter((person) => person.id !== id));
  };

  // const submitHandler: React.FormEventHandler<HTMLFormElement> = (event)=> {
  //   event.preventDefault()
  // }

  const submitHandler: AsyncSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as {
      personids: string;
    };

    const res = await axios<ApiPersonType[]>(
      `https://rickandmortyapi.com/api/character/${formData.personids}`,
    );
    const withAge = res.data.map((person) => ({
      ...person,
      age: getRandomAge(),
    }));
    setPersons(withAge);
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <FindPersonForm submitHandler={submitHandler} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PersonList
            persons={persons}
            killPersonHandler={killPersonHandler}
            deleteHandler={deleteHandler}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
