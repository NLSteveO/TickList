import { describe, expect, it } from 'vitest';
import { AddRoute } from '../../../../src/pages';

describe('AddRoute', () => {
  it('should render the page correctly', () => {
    const result = AddRoute();
    expect(result).toMatchSnapshot();
  });
});
