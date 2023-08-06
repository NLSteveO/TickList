import { describe, expect, it } from "vitest";
import Home from '../../pages/Home';

describe('Home', () => {
  it('should render the page correctly', () => {
    const result = Home();
    expect(result).toMatchSnapshot();
  });
});
