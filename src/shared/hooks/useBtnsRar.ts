import { useDispatch, useSelector } from 'react-redux';
import { type ChoosedStatus } from '../types/Status';
import type { AppDispatch, RootState } from '../rtk/store';
import { setFilte } from '../rtk/tasksSlice';

export const useBtnsBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const hanbleStatus = (value: ChoosedStatus) => {
    dispatch(setFilte(value));
  };

  return {
    filter,
    hanbleStatus,
  };
};
