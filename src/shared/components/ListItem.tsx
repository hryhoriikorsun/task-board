import { useDispatch, useSelector } from 'react-redux';
import { tasksAPI } from '../api/tasksAPI';
import type { Task } from '../types/Task';
import type { AppDispatch, RootState } from '../rtk/store';
import { removeTask, setEditItem, updateTask } from '../rtk/tasksSlice';
import cn from 'classnames';
import { toast } from 'sonner';
import { useState } from 'react';

interface ListItemProps {
  task: Task;
}

export const ListItem = ({ task }: ListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { editItem } = useSelector((state: RootState) => state.tasks);

  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  const handleDeleteTask = async () => {
    setIsDeletingTask(true);
    await tasksAPI.remove(task.id);

    toast.success(`Task '${task.title}' deleted.`);

    dispatch(removeTask(task.id));
    setIsDeletingTask(false);
  };

  const handleChengeStatusTask = async () => {
    setIsStatusChanging(true);

    const newTask = {
      id: task.id,
      title: task.title,
      status: !task.status,
      description: task.description,
    };

    await tasksAPI.update(task.id, newTask);

    dispatch(updateTask(newTask));

    setIsStatusChanging(false);
  };

  return (
    <li
      className={cn(
        'flex items-center justify-between gap-x-4 p-2 border-b-2 last:border-b-0',
        {
          'bg-orange-300 border-b-orange-500': task.id === editItem.id,
          'opacity-40': isStatusChanging || isDeletingTask,
        },
      )}
    >
      <div className='flex gap-x-4'>
        <input
          type='checkbox'
          onChange={handleChengeStatusTask}
          checked={task.status}
          disabled={isStatusChanging || isDeletingTask}
        />
        <div>
          <h2 className='font-semibold'>{task.title}</h2>
          <p>{task.description}</p>
        </div>
      </div>
      {task.status ? (
        <p className='p-1 rounded-md bg-green-100 font-semibold'>Completed</p>
      ) : (
        <div className='flex flex-col sm:flex-row gap-2 font-semibold'>
          <button
            onClick={() => dispatch(setEditItem(task))}
            disabled={isStatusChanging || isDeletingTask}
          >
            Edit
          </button>
          <button
            onClick={handleDeleteTask}
            disabled={isStatusChanging || isDeletingTask}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};
