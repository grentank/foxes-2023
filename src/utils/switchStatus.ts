import type { AliveStatusType } from '../types/person';

export default function switchStatus(status: AliveStatusType): AliveStatusType {
  if (status === 'Alive') return 'Dead';
  return 'Alive';
}
