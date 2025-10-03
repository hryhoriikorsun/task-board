import { useState } from 'react';
import type { Task } from '../types/Task';
import { tasksAPI } from '../api/tasksAPI';
import { reload } from '../utils/reloandPage';

interface EditFormProps {
  oneTask: Task;
  onClickEdit: (task: Task) => void;
}

export const EditForm = ({ oneTask, onClickEdit }: EditFormProps) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const editSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTask = {
      title: !newTitle ? oneTask.title : newTitle,
      status: oneTask.status,
      description: !newDescription ? oneTask.description : newDescription,
    };

    await tasksAPI.update(oneTask.id, newTask);

    reload();
  };

  const handleClearEditForm = () => {
    onClickEdit({
      id: '',
      title: '',
      status: false,
      description: '',
    });
  };

  return (
    <div className='p-2 border-2 rounded-md w-full'>
      <h2 className='font-semibold mb-3'>Edit task</h2>
      <form
        className='flex flex-col gap-y-2'
        onSubmit={editSubmit}
      >
        <label htmlFor='title'>Title</label>
        <input
          className='bg-gray-100 border-2 rounded-md pl-2 placeholder-gray-700'
          type='text'
          name='title'
          id='title'
          placeholder={oneTask.id !== '' ? oneTask.title : 'Title'}
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          className='h-20 bg-gray-100 border-2 rounded-md pl-2 resize-none placeholder-gray-700'
          name='description'
          id='description'
          placeholder={oneTask.id !== '' ? oneTask.description : 'Description'}
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
        ></textarea>
        <div className='flex gap-x-2'>
          <button
            className='w-full text-white bg-emerald-500 rounded-md p-1'
            type='submit'
          >
            Save
          </button>
          <button
            className='w-full border-2 rounded-md p-1'
            type='reset'
            onClick={handleClearEditForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
