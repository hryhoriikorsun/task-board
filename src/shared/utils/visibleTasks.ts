import { STATUS, type ChoosedStatus } from '../types/status';
import type { Task } from '../types/Task';

export const visibleTasks = (tasks: Task[], filter: ChoosedStatus) => {
  switch (filter) {
    case STATUS.ALL:
      return tasks;
    case STATUS.COMPLETED:
      return tasks.filter((task) => task.status);
    case STATUS.INCOMPLETED:
      return tasks.filter((task) => !task.status);
  }
};
