import type { Task } from '../types/Task';
import { ListItem } from './ListItem';

interface ListProps {
  tasks: Task[];
  onClickEdit: (task: Task) => void;
}

export const List = ({ tasks, onClickEdit }: ListProps) => {
  return (
    <ul className='col-span-12 h-60 border-2 rounded-md overflow-y-scroll'>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          onClickEdit={onClickEdit}
        />
      ))}
    </ul>
  );
};
