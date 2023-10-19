import type { PersonType } from './person';

export type DeletePersonHandler = (personId: PersonType['id']) => void;

export type SwitchPersonStatusHandler = DeletePersonHandler;

export type AsyncSubmitHandler = (
  event: React.FormEvent<HTMLFormElement>,
) => Promise<void>;
