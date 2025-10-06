import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../rtk/tasksSlice';
import { visibleTasks } from '../utils/visibleTasks';
import type { AppDispatch, RootState } from '../rtk/store';

export const useApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, filter } = useSelector(
    (state: RootState) => state.tasks,
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const tasks = visibleTasks(items, filter);

  return {
    isLoading,
    tasks,
  };
};
