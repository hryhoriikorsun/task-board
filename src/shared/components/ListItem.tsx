import { StatusTask } from '../types/statusTask';

interface ListItemProps {
  title: string;
  status: StatusTask;
  description: string;
}

export const ListItem = ({ title, status, description }: ListItemProps) => {
  return (
    <li className='flex items-center justify-between p-2 gap-x-8 border-b-2 last:border-b-0'>
      <div>
        <h2 className='font-semibold'>{title}</h2>
        <p>{description}</p>
      </div>
      {status === StatusTask.Completed ? (
        <p className='p-1 rounded-md bg-green-100 font-semibold'>Completed</p>
      ) : (
        <div className='flex gap-x-2 font-semibold'>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </li>
  );
};
