import { useState } from 'react';
import { tasksAPI } from '../api/tasksAPI';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../rtk/store';
import { setEditItem, updateTask } from '../rtk/tasksSlice';
import { taskSchema } from '../schemas/task.shema';
import { toast } from 'sonner';

export const useEditForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editItem } = useSelector((state: RootState) => state.tasks);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isEditingTask, setIsEditingTask] = useState(false);

  const editSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsEditingTask(true);

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

    setIsEditingTask(false);
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

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleNewDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewDescription(event.target.value);
  };

  return {
    editItem,
    newTitle,
    newDescription,
    isEditingTask,
    editSubmit,
    handleClearEditForm,
    handleNewTitle,
    handleNewDescription,
  };
};
