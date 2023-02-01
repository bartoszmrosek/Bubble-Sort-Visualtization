import { render } from '@testing-library/react';
import React from 'react';
import Visualization from './Visualization';

describe('Visualization', () => {
  test('is displaying proper status', () => {
    const defaultMock = jest.fn();
    const rerender = render(
      <Visualization
        setSortingStatus={defaultMock}
        newSetTrigger={0}
        sortingStatus={'not solved'}
      />,
    );
  });
});
