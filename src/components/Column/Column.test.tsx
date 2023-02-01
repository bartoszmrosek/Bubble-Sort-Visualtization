import React from 'react';
import Column from './Column';
import { screen, render } from '@testing-library/react';

describe('Column', () => {
  test('is rendered with proper div height', () => {
    render(<Column height={100} />);
    const columnNode = screen.getByTestId('column');
    expect(columnNode).toHaveStyle('height: 100px');
  });
});
