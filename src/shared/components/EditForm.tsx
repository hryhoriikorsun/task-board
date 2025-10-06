import cn from 'classnames';
import { useEditForm } from '../hooks/useEditForm';

export const EditForm = () => {
  const {
    editItem,
    newTitle,
    newDescription,
    isEditingTask,
    editSubmit,
    handleClearEditForm,
    handleNewTitle,
    handleNewDescription,
  } = useEditForm();

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
          onChange={handleNewTitle}
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
          onChange={handleNewDescription}
          disabled={!editItem.id}
        ></textarea>
        <div className='flex gap-x-2'>
          <button
            className={cn('w-full text-white bg-emerald-500 rounded-md p-1', {
              'opacity-40': isEditingTask,
            })}
            type='submit'
            disabled={!editItem.id || isEditingTask}
          >
            Save
          </button>
          <button
            className={cn('w-full border-2 rounded-md p-1', {
              'opacity-40': isEditingTask,
            })}
            type='reset'
            onClick={handleClearEditForm}
            disabled={!editItem.id || isEditingTask}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
