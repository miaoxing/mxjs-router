import {render} from '@testing-library/react';
import {Link} from '..';
import {MemoryRouter} from 'react-router';

describe('test', () => {
  test('basic', () => {
    const result = render(<MemoryRouter><Link/></MemoryRouter>);
    expect(result.container).toMatchSnapshot();
  });
});
