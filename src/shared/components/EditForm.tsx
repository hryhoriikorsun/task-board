export const EditForm = () => {
  return (
    <div className='p-2 border-2 rounded-md'>
      <h2 className='font-semibold mb-3'>Edit task</h2>
      <form
        className='flex flex-col gap-y-2'
        action=''
      >
        <label htmlFor='title'>Title</label>
        <input
          className='bg-gray-100 border-2 rounded-md pl-2 placeholder-gray-700'
          type='text'
          name='title'
          id='title'
          placeholder='Prev title'
        />
        <label htmlFor='description'>Description</label>
        <textarea
          className='h-20 bg-gray-100 border-2 rounded-md pl-2 resize-none placeholder-gray-700'
          name='description'
          id='description'
          placeholder='Prev description'
        ></textarea>
        <div className='flex gap-x-2'>
          <button
            className='w-full text-white bg-emerald-500 rounded-md p-1'
            type='submit'
          >
            Save
          </button>
          <button className='w-full border-2 rounded-md p-1'>Cancel</button>
        </div>
      </form>
    </div>
  );
};
