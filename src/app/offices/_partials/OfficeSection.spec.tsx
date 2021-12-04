import { render, screen, act } from '@/test/utils';

import { MOCK_PERSON, MOCK_PERSONS } from '../../../mock/mock-person';
import { OfficeSection } from './OfficeSection';

describe('OfficeSection', () => {
  const titleName: string = 'Matin';

  it('Should render office section with one person', async () => {
    await act(async () => {
      render(<OfficeSection title={titleName} presence={[MOCK_PERSON]} />);
    });

    const title = screen.getByText(titleName);
    expect(title).toBeInTheDocument();
    expect(screen.queryByText(MOCK_PERSON.name)).toBeInTheDocument();
    expect(
      screen.getByTestId(`avatarUrl-${MOCK_PERSON?.photoUrl}`)
    ).toBeInTheDocument();
  });

  it('Should render office section with 2 people', async () => {
    await act(async () => {
      render(<OfficeSection title={titleName} presence={MOCK_PERSONS} />);
    });

    const title = screen.getByText(titleName);
    expect(title).toBeInTheDocument();
    expect(screen.queryByText(MOCK_PERSONS[0].name)).toBeInTheDocument();
    expect(screen.queryByText(MOCK_PERSONS[1].name)).toBeInTheDocument();
    expect(
      screen.getByTestId(`avatarUrl-${MOCK_PERSONS[0]?.photoUrl}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`avatarUrl-${MOCK_PERSONS[1]?.photoUrl}`)
    ).toBeInTheDocument();
  });
});
