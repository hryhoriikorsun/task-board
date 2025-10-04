import { useState } from 'react';
import { tasksAPI } from '../api/tasksAPI';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../rtk/store';
import { setEditItem, updateTask } from '../rtk/tasksSlice';

export const EditForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editItem } = useSelector((state: RootState) => state.tasks);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const editSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTask = {
      id: editItem.id,
      title: !newTitle ? editItem.title : newTitle,
      status: editItem.status,
      description: !newDescription ? editItem.description : newDescription,
    };

    await tasksAPI.update(editItem.id, newTask);

    setNewTitle('');
    setNewDescription('');

    dispatch(updateTask(newTask));
  };

  const handleClearEditForm = () => {
    dispatch(
      setEditItem({
        id: '',
        title: '',
        status: false,
        description: '',
      }),
    );
    setNewTitle('');
    setNewDescription('');
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
          placeholder={editItem.id !== '' ? editItem.title : 'Title'}
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          className='h-20 bg-gray-100 border-2 rounded-md pl-2 resize-none placeholder-gray-700'
          name='description'
          id='description'
          placeholder={
            editItem.id !== '' ? editItem.description : 'Description'
          }
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
