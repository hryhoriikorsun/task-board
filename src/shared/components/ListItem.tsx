import { tasksAPI } from '../api/tasksAPI';
import type { Task } from '../types/Task';
import { reload } from '../utils/reloandPage';

interface ListItemProps {
  task: Task;
  onClickEdit: (task: Task) => void;
}

export const ListItem = ({ task, onClickEdit }: ListItemProps) => {
  const handleDeleteTask = async () => {
    await tasksAPI.remove(task.id);
    reload();
  };

  return (
    <li className='flex items-center justify-between gap-x-4 p-2 border-b-2 last:border-b-0'>
      <div>
        <h2 className='font-semibold'>{task.title}</h2>
        <p>{task.description}</p>
      </div>
      {task.status ? (
        <p className='p-1 rounded-md bg-green-100 font-semibold'>Completed</p>
      ) : (
        <div className='flex flex-col sm:flex-row gap-2 font-semibold'>
          <button onClick={() => onClickEdit(task)}>Edit</button>
          <button onClick={handleDeleteTask}>Delete</button>
        </div>
      )}
    </li>
  );
};
