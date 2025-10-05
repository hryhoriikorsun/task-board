import { useState } from 'react';
import { tasksAPI } from '../api/tasksAPI';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../rtk/store';
import { setEditItem, updateTask } from '../rtk/tasksSlice';
import { taskSchema } from '../schemas/task.shema';
import { toast } from 'sonner';

export const EditForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editItem } = useSelector((state: RootState) => state.tasks);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const editSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = taskSchema.safeParse({
      title: newTitle,
      description: newDescription,
    });

    if (!result.success) {
      const msgs = result.error.issues.map((problem) => problem.message + '.');
      toast.error(msgs[0]);
      return;
    }

    const validData = result.data;

    const newTask = {
      id: editItem.id,
      title: validData.title,
      status: editItem.status,
      description: validData.description,
    };

    await tasksAPI.update(editItem.id, newTask);

    toast.success(`Task '${validData.title}' updated.`);

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
          disabled={!editItem.id}
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
          disabled={!editItem.id}
        ></textarea>
        <div className='flex gap-x-2'>
          <button
            className='w-full text-white bg-emerald-500 rounded-md p-1'
            type='submit'
            disabled={!editItem.id}
          >
            Save
          </button>
          <button
            className='w-full border-2 rounded-md p-1'
            type='reset'
            onClick={handleClearEditForm}
            disabled={!editItem.id}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
