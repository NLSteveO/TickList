import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Route {
  id: string;
  gym: string;
  wall: string;
  color: string;
  grade: string;
  dateSet: string;
}

function AddRoute() {
  const { register, reset, formState: { errors, isSubmitSuccessful }, handleSubmit } = useForm<Route>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const createRouteId = () => {
    return Math.random().toString().substr(2, 9);
  }

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

  const onSubmit: SubmitHandler<Route> = async (data) => {
    data.id = createRouteId();
    await storeRoute(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add Route</h1>
      <label htmlFor='gym'>
        Gym: <input id='gym' {...register('gym', {required: 'Gym is required'})} placeholder='The Cove' aria-invalid={errors.gym ? 'true' : 'false'} />
      </label>
      {errors.gym && <span>{errors.gym.message}</span>}
      <br />
      <label htmlFor='wall'>
        Wall: <input id='wall' {...register('wall', {required: 'Wall is required'})} aria-invalid={errors.wall ? 'true' : 'false'} />
      </label>
      {errors.wall && <span>{errors.wall.message}</span>}
      <br />
      <label htmlFor='routeColor'>
        Route Color(Tape or Holds): <input id='routeColor' {...register('color', {required: 'Color is required'})} aria-invalid={errors.color ? 'true' : 'false'} />
      </label>
      {errors.color && <span>{errors.color.message}</span>}
      <br />
      <label htmlFor='grade'>
        Grade: <input id='grade' {...register('grade', {required: 'Grade is required'})} aria-invalid={errors.grade ? 'true' : 'false'} />
      </label>
      {errors.grade && <span>{errors.grade.message}</span>}
      <br />
      <label htmlFor='dateSet'>
        Date Set: <input id='dateSet' {...register('dateSet')} />
      </label>
      <br />
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default AddRoute;
