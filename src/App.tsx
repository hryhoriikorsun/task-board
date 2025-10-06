import { AddForm } from './shared/components/AddForm';
import { BtnsBar } from './shared/components/BtnsBar';
import { EditForm } from './shared/components/EditForm';
import { List } from './shared/components/List';
import { SkeletonList } from './shared/components/skeletons/SkeletonList';
import { useApp } from './shared/hooks/useApp';
import { Toaster } from 'sonner';

function App() {
  const { isLoading, tasks } = useApp();

  return (
    <section className='grid grid-cols-12 gap-3 p-2 sm:p-6 max-w-[600px] w-[320px] sm:w-[600px] text-sm sm:text-base bg-white rounded-md drop-shadow-md'>
      <Toaster
        position='top-right'
        duration={5000}
        closeButton
        richColors
      />

      <h1 className='col-span-12 font-semibold'>Tasks</h1>

      <BtnsBar />

      {isLoading ? <SkeletonList /> : <List tasks={tasks} />}

      <div className='col-span-12 flex flex-col sm:flex-row gap-x-3 place-items-baseline'>
        <AddForm />
        <EditForm />
      </div>
    </section>
  );
}

export default App;
