/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import AccordionContainer from './Accordion';

afterEach(cleanup);

describe('handles Accordion', () => {
  it('renders Accordion', () => {
    const mockEventHandler = jest.fn();
    const props = {
      accordionId: '0',
      expandedId: '1',
      childrenSummary: 'lorem',
      childrenDetails: 'lorem ipsum',
      handleChange: mockEventHandler,
    };

    render(<AccordionContainer {...props} />);

    expect(screen.getByText(props.childrenSummary));
    fireEvent.click(screen.getByText(props.childrenSummary));
    expect(screen.queryByText(props.childrenDetails));
  });
});
