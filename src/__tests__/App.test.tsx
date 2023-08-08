import { describe, expect, it } from "vitest";
import { renderHook } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('should render the page correctly', () => {
    const { result } = renderHook(() => App());
    expect(result.current).toMatchSnapshot();
  });
});
