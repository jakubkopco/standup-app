import { MOCK_THANK } from '@/mock/mock-thank';
import { render, screen, act } from '@/test/utils';

import { ThankGroup } from './ThankGroup';

describe('ThankGroup', () => {
  it('Should render ThankGroup with one person', async () => {
    await act(async () => {
      render(<ThankGroup name={''} thanks={[MOCK_THANK]} type={'THANK'} />);
    });

    expect(
      screen.getByRole('img', { name: MOCK_THANK.author })
    ).toBeInTheDocument();
    expect(screen.queryByText(MOCK_THANK.author)).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Ajouter un objectif' })
    ).toBeInTheDocument();
    const buttonClose = screen.getByRole('button', { name: 'close' });
    expect(buttonClose).toBeInTheDocument();
  });
});
