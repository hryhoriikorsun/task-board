import { ListItem } from './ListItem';
import { StatusTask } from '../types/statusTask';

import tasks from '../../assets/tasksData.json';

export const List = () => {
  return (
    <ul className='h-60 border-2 rounded-md overflow-y-scroll'>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          title={task.title}
          status={task.status as StatusTask}
          description={task.description}
        />
      ))}
    </ul>
  );
};
