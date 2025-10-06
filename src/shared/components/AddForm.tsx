import cn from 'classnames';
import { useAddForm } from '../hooks/useAddForm';

export const AddForm = () => {
  const {
    title,
    description,
    isAddingTask,
    handleAdd,
    handleTitle,
    handleDescription,
  } = useAddForm();

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
          onChange={handleTitle}
        />
        <textarea
          className='h-20 bg-gray-100 border-2 rounded-md pl-2 resize-none placeholder-gray-700'
          name='description'
          placeholder='Description'
          value={description}
          onChange={handleDescription}
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
