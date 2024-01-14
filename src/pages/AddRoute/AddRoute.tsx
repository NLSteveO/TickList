import { useState } from 'react';

interface Route {
  id: string;
  gym: string;
  wall: string;
  color: string;
  grade: string;
  dateSet: string;
}

function AddRoute() {
  const [gym, setGym] = useState('');
  const [wall, setWall] = useState('');
  const [color, setColor] = useState('');
  const [grade, setGrade] = useState('');
  const [dateSet, setDateSet] = useState('');

  const createRouteId = () => {
    return Math.random().toString().substr(2, 9);
  }

  const gymOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setGym(event.target.value);
  };

  const wallOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setWall(event.target.value);
  };

  const colorOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setColor(event.target.value);
  };

  const gradeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setGrade(event.target.value);
  };

  const dateSetOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setDateSet(event.target.value);
  };

  const storeRoute = async (route: Route) => {
    const routes = localStorage.getItem('routes');
    if (routes) {
      const parsedRoutes = JSON.parse(routes);
      parsedRoutes.push(route);
      localStorage.setItem('routes', JSON.stringify(parsedRoutes));
    } else {
      localStorage.setItem('routes', JSON.stringify([route]));
    }
  }

  const clearForm = () => {
    setGym('');
    setWall('');
    setColor('');
    setGrade('');
    setDateSet('');
  }

  const onClick = async () => {
    const Route: Route = {
      id: createRouteId(),
      gym,
      wall,
      color,
      grade,
      dateSet
    };
    await storeRoute(Route);
    clearForm();
  };

  return (
    <form>
      <h1>Add Route</h1>
      <label htmlFor='gym'>
        Gym: <input id='gym' value={gym} onChange={gymOnChange} />
      </label>
      <br />
      <label htmlFor='wall'>
        Wall: <input id='wall' value={wall} onChange={wallOnChange} />
      </label>
      <br />
      <label htmlFor='routeColor'>
        Route Color(Tape or Holds): <input id='routeColor' value={color} onChange={colorOnChange} />
      </label>
      <br />
      <label htmlFor='grade'>
        Grade: <input id='grade' value={grade} onChange={gradeOnChange} />
      </label>
      <br />
      <label htmlFor='dateSet'>
        Date Set: <input id='dateSet' value={dateSet} onChange={dateSetOnChange} />
      </label>
      <br />
      <br />
      <button type='button' onClick={onClick}>Submit</button>
    </form>
  );
}

export default AddRoute;
