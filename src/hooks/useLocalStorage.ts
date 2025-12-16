import { useState } from 'react';

interface Route {
  id: string;
  gym: string;
  wall: string;
  color: string;
  grade: string;
  dateSet: string;
}

const useRouteStorage = () => {
  const [routes, setRoutes] = useState<Route[]>(() => {
    const storedRoutes = localStorage.getItem('routes');
    return storedRoutes ? JSON.parse(storedRoutes) : [];
  });

  const createRouteId = () => {
    return Math.random().toString().substr(2, 9);
  };

  const storeRoute = (route: Route) => {
    setRoutes((prevRoutes) => {
      const updatedRoutes = [...prevRoutes, { ...route, id: createRouteId() }];
      localStorage.setItem('routes', JSON.stringify(updatedRoutes));
      return updatedRoutes;
    });
  };

  return { routes, storeRoute };
};

export default useRouteStorage;
