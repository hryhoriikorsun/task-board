import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../rtk/store';
import { addTask } from '../rtk/tasksSlice';
import { tasksAPI } from '../api/tasksAPI';
import { toast } from 'sonner';
import { taskSchema } from '../schemas/task.shema';

export const useAddForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsAddingTask(true);

    const result = taskSchema.safeParse({ title, description });

    if (!result.success) {
      const msgs = result.error.issues.map((problem) => problem.message + '.');
      toast.error(msgs[0]);
      return;
    }

    const validData = result.data;

    const newTask = {
      title: validData.title,
      status: false,
      description: validData.description,
    };

    await tasksAPI.create(newTask);

    dispatch(addTask(newTask));

    toast.success(`Task '${validData.title}' created.`);

    setTitle('');
    setDescription('');
    setIsAddingTask(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return {
    title,
    description,
    isAddingTask,
    handleAdd,
    handleTitle,
    handleDescription,
  };
};
