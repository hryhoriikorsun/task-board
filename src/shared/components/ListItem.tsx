import { useDispatch, useSelector } from 'react-redux';
import { tasksAPI } from '../api/tasksAPI';
import type { Task } from '../types/Task';
import type { AppDispatch, RootState } from '../rtk/store';
import { removeTask, setEditItem } from '../rtk/tasksSlice';
import cn from 'classnames';

interface ListItemProps {
  task: Task;
}

export const ListItem = ({ task }: ListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { editItem } = useSelector((state: RootState) => state.tasks);

  const handleDeleteTask = async () => {
    await tasksAPI.remove(task.id);

    dispatch(removeTask(task.id));
  };

  return (
    <li
      className={cn(
        'flex items-center justify-between gap-x-4 p-2 border-b-2 last:border-b-0',
        { 'bg-orange-300 border-b-orange-500': task.id === editItem.id },
      )}
    >
      <div>
        <h2 className='font-semibold'>{task.title}</h2>
        <p>{task.description}</p>
      </div>
      {task.status ? (
        <p className='p-1 rounded-md bg-green-100 font-semibold'>Completed</p>
      ) : (
        <div className='flex flex-col sm:flex-row gap-2 font-semibold'>
          <button onClick={() => dispatch(setEditItem(task))}>Edit</button>
          <button onClick={handleDeleteTask}>Delete</button>
        </div>
      )}
    </li>
  );
};
