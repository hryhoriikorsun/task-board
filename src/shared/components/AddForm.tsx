import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../rtk/store';
import { addTask } from '../rtk/tasksSlice';
import { tasksAPI } from '../api/tasksAPI';
import { toast } from 'sonner';
import { taskSchema } from '../schemas/task.shema';
import cn from 'classnames';

export const AddForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsAddingTask(true);

    const result = taskSchema.safeParse({ title, description });

    if (!result.success) {
      const msgs = result.error.issues.map((problem) => problem.message + '.');
      toast.error(msgs[0]);
      return;
    }

    const validData = result.data;

    const newTask = {
      title: validData.title,
      status: false,
      description: validData.description,
    };

    await tasksAPI.create(newTask);

    dispatch(addTask(newTask));

    toast.success(`Task '${validData.title}' created.`);

    setTitle('');
    setDescription('');
    setIsAddingTask(false);
  };

  return (
    <div className='p-2 border-2 rounded-md w-full'>
      <h2 className='font-semibold mb-3'>Add task</h2>
      <form
        className='flex flex-col gap-y-2'
        onSubmit={handleAdd}
      >
        <input
          className='bg-gray-100 border-2 rounded-md pl-2 placeholder-gray-700'
          type='text'
          name='title'
          placeholder='Title'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className='h-20 bg-gray-100 border-2 rounded-md pl-2 resize-none placeholder-gray-700'
          name='description'
          placeholder='Description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <button
          className={cn('text-white bg-indigo-400 rounded-md p-1', {
            'opacity-40': isAddingTask,
          })}
          type='submit'
          disabled={!title || !description || isAddingTask}
        >
          Add
        </button>
      </form>
    </div>
  );
};
