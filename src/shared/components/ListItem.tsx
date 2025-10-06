import { useListItem } from '../hooks/useListItem';
import type { Task } from '../types/Task';
import cn from 'classnames';

interface ListItemProps {
  task: Task;
}

export const ListItem = ({ task }: ListItemProps) => {
  const {
    editItem,
    isStatusChanging,
    isDeletingTask,
    handleDeleteTask,
    handleChengeStatusTask,
    handleEditItem,
  } = useListItem(task);

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
            onClick={handleEditItem}
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
