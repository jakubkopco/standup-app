import { OfficeWorker } from '@/app/offices/offices.types';

export const MOCK_PERSON: OfficeWorker = {
  name: 'Jakub',
  onMorning: false,
  onAfternoon: false,
  photoUrl:
    'https://lh3.googleusercontent.com/a-/AOh14Ggimh1hGMsKeU-sQH0iRnerYPKqlNMbam9iryOIfQ=s96-c',
};

export const MOCK_PERSONS = [
  {
    name: 'Fero',
    onMorning: true,
    onAfternoon: false,
    photoUrl:
      'https://lh3.googleusercontent.com/a-/AOh14Ggimh1hGMsKeU-sQH0iRnerYPKqlNMbam9iryOIfQ=s96-c',
  },
  {
    name: 'Jozo',
    onMorning: false,
    onAfternoon: true,
    photoUrl:
      'https://lh3.googleusercontent.com/a/AATXAJzQuRTn6nq6pRjFsgA09lSArREtWMWaeZREN8aw=s96-c',
  },
];
