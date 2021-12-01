/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from '@testing-library/react';
import LoadMoreButton from './LoadMoreButton';

afterEach(cleanup);

describe('handles LoadMoreButton', () => {
  it('renders LoadMoreButton', async () => {
    const mockEventHandler = jest.fn();
    const props = {
      isLoading: false,
      handleLoadingButton: mockEventHandler,
    };
    act(() => {
      render(
        <LoadMoreButton {...props} />,
      );
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);
  });
});
