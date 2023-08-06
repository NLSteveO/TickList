import { describe, expect, it } from "vitest";
import App from '../App';

describe("App", () => {
  it("should render the page correctly", async () => {
    const result = App();
    expect(result).toMatchSnapshot();
  });
});
