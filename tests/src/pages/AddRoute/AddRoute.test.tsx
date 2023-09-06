import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderHook, render, screen, fireEvent } from '@testing-library/react';
import { AddRoute } from '../../../../src/pages';

const consoleSpy = vi.spyOn(console, 'log');
vi.spyOn(Math, 'random').mockReturnValue(0.123456789);

describe('AddRoute', () => {
  describe('Snapshots', () => {
    it('should render the page correctly', () => {
      const { result } = renderHook(AddRoute);
      expect(result.current).toMatchSnapshot();
    });
  });

  describe('onClick', () => {
    it('should log the route to the console', () => {
      render(<AddRoute />);
      const button = screen.getByRole('button');
      fireEvent.change(screen.getByLabelText('Gym:'), { target: { value: 'The Cove' } });
      fireEvent.change(screen.getByLabelText('Wall:'), { target: { value: 'Chossy Cove' } });
      fireEvent.change(screen.getByLabelText('Route Color(Tape or Holds):'), { target: { value: 'Black Holds' } });
      fireEvent.change(screen.getByLabelText('Grade:'), { target: { value: 'Green Circle' } });
      fireEvent.change(screen.getByLabelText('Date Set:'), { target: { value: '2023-09-06' } });
      fireEvent.click(button);
      expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify({
        id: '123456789',
        gym: 'The Cove',
        wall: 'Chossy Cove',
        color: 'Black Holds',
        grade: 'Green Circle',
        dateSet: '2023-09-06'
      }));
    });
  });
});
