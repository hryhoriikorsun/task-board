import { useDispatch } from 'react-redux';
import { STATUS } from '../types/Status';
import type { AppDispatch } from '../rtk/store';
import { setFilte } from '../rtk/tasksSlice';

export const BtnsBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='col-span-12 flex gap-x-4'>
      {Object.entries(STATUS).map(([key, value]) => {
        return (
          <button
            key={key}
            onClick={() => dispatch(setFilte(value))}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};
