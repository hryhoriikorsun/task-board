import { useEffect } from 'react';
import { AddForm } from './shared/components/AddForm';
import { BtnsBar } from './shared/components/BtnsBar';
import { EditForm } from './shared/components/EditForm';
import { List } from './shared/components/List';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './shared/rtk/store';
import { fetchTasks } from './shared/rtk/tasksSlice';
import { Toaster } from 'sonner';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <section className='grid grid-cols-12 gap-3 p-6 max-w-[600px] text-sm sm:text-base bg-white rounded-md drop-shadow-md'>
      <Toaster
        position='top-right'
        duration={5000}
        closeButton
        richColors
      />
      <h1 className='col-span-12 font-semibold'>Tasks</h1>
      <BtnsBar />

      {isLoading ? <>Loading...</> : <List tasks={items} />}

      <div className='col-span-12 flex flex-col sm:flex-row gap-x-3 place-items-baseline'>
        <AddForm />
        <EditForm />
      </div>
    </section>
  );
}

export default App;
