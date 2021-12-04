import React from 'react';

import { render, screen, act } from '@/test/utils';

import { AccountMenu } from './index';

test('Should render AccountMenu', async () => {
  await act(async () => {
    render(<AccountMenu />);
  });
  expect(screen.getByRole('button')).toBeInTheDocument();
});
