import { render, screen, act } from '@/test/utils';

import { MOCK_PERSON } from '../../../mock/mock-person';
import { OfficeSection } from './OfficeSection';

test('Should render OfficeSection', async () => {
  await act(async () => {
    render(<OfficeSection title="Matin" presence={[MOCK_PERSON]} />);
  });
  const title = screen.getByText('Matin').innerHTML;
  expect(title).toBeInTheDocument();
  expect(screen.queryByText(MOCK_PERSON.name));
  expect(screen.getByRole('Avatar'));
});
