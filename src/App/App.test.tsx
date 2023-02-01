import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  test('is displaying `not solved` on first render', async () => {
    expect(screen.getByText('not solved')).toBeInTheDocument();
  });
  test('displays random array to sort out', async () => {
    const user = userEvent.setup();
    const firstRenderHeights = screen
      .getAllByTestId('column')
      .map(element => window.getComputedStyle(element).height);
    await user.click(screen.getByTestId('newSetBtn'));
    const secondRenderHeights = screen
      .getAllByTestId('column')
      .map(element => window.getComputedStyle(element).height);
    expect(screen.getByText('not solved')).toBeInTheDocument();
    expect(firstRenderHeights).not.toEqual(
      expect.arrayContaining(secondRenderHeights),
    );
  });
  test('can start and pause solving process', async () => {
    const user = userEvent.setup();
    const columnsBefore = screen
      .getAllByTestId('column')
      .map(element => window.getComputedStyle(element).height);
    await act(async () => {
      await user.click(screen.getByTestId('startStopBtn'));
    });
    expect(await screen.findByText('solving')).toBeInTheDocument();
    act(() => {
      user.click(screen.getByTestId('startStopBtn'));
    });
    expect(await screen.findByText('paused')).toBeInTheDocument();
    waitFor(() => {
      const columnsAfter = screen
        .getAllByTestId('column')
        .map(element => window.getComputedStyle(element).height);
      const areEqual = columnsBefore.every((col, i) => col === columnsAfter[i]);
      expect(areEqual).toBeFalsy();
    });
  });
});
