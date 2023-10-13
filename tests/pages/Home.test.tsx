import { describe, expect, it } from "vitest";
import Home from '../../src/pages/Home/Home';

describe('Home', () => {
  it('should render the page correctly', () => {
    const result = Home();
    expect(result).toMatchSnapshot();
  });
});
