export const AddForm = () => {
  return (
    <div className='p-2 border-2 rounded-md'>
      <h2 className='font-semibold mb-3'>Add task</h2>
      <form
        className='flex flex-col gap-y-2'
        action=''
      >
        <input
          className='bg-gray-100 border-2 rounded-md pl-2 placeholder-gray-700'
          type='text'
          name='title'
          placeholder='Title'
        />
        <textarea
          className='h-20 bg-gray-100 border-2 rounded-md pl-2 resize-none placeholder-gray-700'
          name='description'
          placeholder='Description'
        ></textarea>
        <button
          className='text-white bg-indigo-400 rounded-md p-1'
          type='submit'
        >
          Add
        </button>
      </form>
    </div>
  );
};
