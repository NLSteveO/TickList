import React from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { renderHook, render, screen, fireEvent } from '@testing-library/react';
import { AddRoute } from '../../../../src/pages';

vi.spyOn(Math, 'random').mockReturnValue(0.123456789);

describe('AddRoute', () => {
  describe('Snapshots', () => {
    it('should render the page correctly', () => {
      const { result } = renderHook(AddRoute);
      expect(result.current).toMatchSnapshot();
    });
  });

  describe('onClick', () => {
    let button: Node | Window;

    beforeAll(() => {
      render(<AddRoute />);
      button = screen.getByRole('button');
    });

    it('should store the route in localStorage when no routes are stored', () => {
      fireEvent.change(screen.getByLabelText('Gym:'), { target: { value: 'The Cove' } });
      fireEvent.change(screen.getByLabelText('Wall:'), { target: { value: 'Chossy Cove' } });
      fireEvent.change(screen.getByLabelText('Route Color(Tape or Holds):'), { target: { value: 'Black Holds' } });
      fireEvent.change(screen.getByLabelText('Grade:'), { target: { value: 'Green Circle' } });
      fireEvent.change(screen.getByLabelText('Date Set:'), { target: { value: '2023-09-06' } });
      fireEvent.click(button);

      expect(localStorage.getItem('routes')).equals(JSON.stringify([{
        id: '123456789',
        gym: 'The Cove',
        wall: 'Chossy Cove',
        color: 'Black Holds',
        grade: 'Green Circle',
        dateSet: '2023-09-06'
      }]));
    });

    it('should store the route in localStorage when there are routes already stored', () => {
      const routes = [{ id: '0123456789', gym: 'The Cove', wall: 'Chossy Cove', color: 'Black Holds', grade: 'Green Circle', dateSet: '2023-09-06' }];
      localStorage.setItem('routes', JSON.stringify(routes));

      fireEvent.change(screen.getByLabelText('Gym:'), { target: { value: 'The Cove' } });
      fireEvent.change(screen.getByLabelText('Wall:'), { target: { value: 'Chossy Cove' } });
      fireEvent.change(screen.getByLabelText('Route Color(Tape or Holds):'), { target: { value: 'Green Holds' } });
      fireEvent.change(screen.getByLabelText('Grade:'), { target: { value: 'Blue Square' } });
      fireEvent.change(screen.getByLabelText('Date Set:'), { target: { value: '2023-09-06' } });
      fireEvent.click(button);

      routes.push({ id: '123456789', gym: 'The Cove', wall: 'Chossy Cove', color: 'Green Holds', grade: 'Blue Square', dateSet: '2023-09-06' });
      expect(localStorage.getItem('routes')).equals(JSON.stringify(routes));
    });
  });
});
