'use client';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { DateTab, DateTabProps } from '..';
import moment from 'moment';

describe('DateTab', () => {
  const renderComponent = (overrides: Partial<DateTabProps> = {}) => {
    const defaults = (props: Partial<DateTabProps>): DateTabProps => ({
      selectedDate: moment('2020-01-01', 'YYYY-MM-DD'),
      incrementDate: jest.fn(),
      decrementDate: jest.fn(),
      ...props,
    });
    return render(<DateTab {...defaults(overrides)} />);
  };

  it('match snapshot', () => {
    const rendered = renderComponent();
    expect(rendered).toMatchSnapshot();
  });
});
