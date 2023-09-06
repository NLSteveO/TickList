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

  const onClick = () => {
    const Route: Route = {
      id: createRouteId(),
      gym,
      wall,
      color,
      grade,
      dateSet
    };
    console.log(JSON.stringify(Route));
  };

  return (
    <>
      <h1>Add Route</h1>
      <label>
        Gym: <input value={gym} onChange={gymOnChange} />
      </label>
      <br />
      <label>
        Wall: <input value={wall} onChange={wallOnChange} />
      </label>
      <br />
      <label>
        Route Color(Tape or Holds): <input value={color} onChange={colorOnChange} />
      </label>
      <br />
      <label>
        Grade: <input value={grade} onChange={gradeOnChange} />
      </label>
      <br />
      <label>
        Date Set: <input value={dateSet} onChange={dateSetOnChange} />
      </label>
      <br />
      <br />
      <button onClick={onClick}>Submit</button>
    </>
  );
}

export default AddRoute;
