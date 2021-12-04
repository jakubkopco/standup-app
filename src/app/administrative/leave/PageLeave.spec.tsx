import { render, screen, act, fireEvent } from '@/test/utils';

import { PageLeave } from './PageLeave';

describe('PageLeave', () => {
  it('Should render PageLeave with inputs and radio buttons', async () => {
    await act(async () => {
      render(<PageLeave />);
    });

    expect(screen.queryAllByRole('textbox')).toHaveLength(4);
    expect(
      screen.getByRole('radio', { name: 'Matinée seulement' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: 'Après-midi seulement' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: 'Toute la journée' })
    ).toBeInTheDocument();
    expect(screen.queryAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Valider' })).toBeInTheDocument();
  });

  it('Should render PageLeave and change values in inputs', async () => {
    await act(async () => {
      render(<PageLeave />);
    });

    const firstInput = screen.getByTestId('firstName');
    fireEvent.change(firstInput, { target: { value: 'Frantisek' } });
    expect(screen.getByTestId('firstName')).toHaveValue('Frantisek');

    const lastInput = screen.getByTestId('lastName');
    fireEvent.change(lastInput, { target: { value: 'Novak' } });
    expect(screen.getByTestId('lastName')).toHaveValue('Novak');
  });
});
