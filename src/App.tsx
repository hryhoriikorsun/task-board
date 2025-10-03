import { AddForm } from './shared/components/AddForm';
import { BtnsBar } from './shared/components/BtnsBar';
import { EditForm } from './shared/components/EditForm';
import { List } from './shared/components/List';

function App() {
  return (
    <section className='flex flex-col gap-y-2 p-6 bg-white rounded-md drop-shadow-md'>
      <h1 className='font-semibold '>Tasks</h1>
      <BtnsBar />
      <List />
      <div className='flex gap-x-2 place-items-baseline'>
        <AddForm />
        <EditForm />
      </div>
    </section>
  );
}

export default App;
