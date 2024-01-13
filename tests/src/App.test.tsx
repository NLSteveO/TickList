import { describe, expect, it } from "vitest";
import { renderHook } from '@testing-library/react';
import App from '../../src/App';

describe('App', () => {
  it('should render the Home page correctly', () => {
    const { result } = renderHook(() => App());
    expect(result.current).toMatchSnapshot();
  });

  it('should render the Home page correctly when home is used in the URL', () => {
    window.history.pushState({}, '', '/TickList/home');
    const { result } = renderHook(() => App());
    expect(result.current).toMatchSnapshot();
  });
});
