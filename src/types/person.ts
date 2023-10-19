export type ApiPersonType = {
  id: number;
  name: string;
  status: AliveStatusType;
  species: string;
  type: string;
  gender: GenderType;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
};

export type APIResponse = {
  info: Info;
  results: ApiPersonType[];
};

export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

// utility types
export type ReducedPersonType = Omit<
  ApiPersonType,
  'species' | 'type' | 'episode'
>;

export type PersonType = ReducedPersonType & {
  age: number;
};

export type AliveStatusType = 'Alive' | 'Dead' | 'unknown';

export type GenderType = 'Female' | 'Male' | 'Genderless' | 'unknown';

export type Location = {
  name: string;
  url: string;
};
