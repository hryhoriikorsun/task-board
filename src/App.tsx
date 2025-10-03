import { useEffect, useState } from 'react';
import { AddForm } from './shared/components/AddForm';
import { BtnsBar } from './shared/components/BtnsBar';
import { EditForm } from './shared/components/EditForm';
import { List } from './shared/components/List';
import { tasksAPI } from './shared/api/tasksAPI';
import type { Task } from './shared/types/Task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [oneTask, setOneTask] = useState<Task>({
    id: '',
    title: '',
    status: false,
    description: '',
  });

  console.log(oneTask);

  useEffect(() => {
    // setIsLoading(true);

    tasksAPI.getAll().then(setTasks);

    // setIsLoading(false);
  }, []);

  return (
    <section className='flex flex-col gap-y-2 p-6 bg-white rounded-md drop-shadow-md'>
      <h1 className='font-semibold '>Tasks</h1>
      <BtnsBar />

      <List
        tasks={tasks}
        onClickEdit={setOneTask}
      />

      <div className='flex gap-x-2 place-items-baseline'>
        <AddForm />
        <EditForm
          oneTask={oneTask}
          onClickEdit={setOneTask}
        />
      </div>
    </section>
  );
}

export default App;
