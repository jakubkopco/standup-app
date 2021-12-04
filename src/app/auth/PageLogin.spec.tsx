import React from 'react';

import { render, screen, act, fireEvent } from '@/test/utils';

import { PageLogin } from './PageLogin';

test('Should render PageLogin', async () => {
  await act(async () => {
    render(<PageLogin />);
  });
  expect(screen.getByText('Se connecter avec Google')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '🐻' })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'button-login' })
  ).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'Passer en mode sombre' });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(
    screen.getByRole('button', { name: 'Passer en mode sombre' })
  ).not.toBeInTheDocument();
  expect(screen.queryAllByRole('button')).toHaveLength(2);
});
