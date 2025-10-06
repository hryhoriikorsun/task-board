import { useDispatch, useSelector } from 'react-redux';
import { tasksAPI } from '../api/tasksAPI';
import type { AppDispatch, RootState } from '../rtk/store';
import { removeTask, setEditItem, updateTask } from '../rtk/tasksSlice';
import { toast } from 'sonner';
import { useState } from 'react';
import type { Task } from '../types/Task';

export const useListItem = (task: Task) => {
  const dispatch = useDispatch<AppDispatch>();
  const { editItem } = useSelector((state: RootState) => state.tasks);

  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  const handleDeleteTask = async () => {
    setIsDeletingTask(true);
    await tasksAPI.remove(task.id);

    toast.success(`Task '${task.title}' deleted.`);

    dispatch(removeTask(task.id));
    setIsDeletingTask(false);
  };

  const handleChengeStatusTask = async () => {
    setIsStatusChanging(true);

    const newTask = {
      id: task.id,
      title: task.title,
      status: !task.status,
      description: task.description,
    };

    await tasksAPI.update(task.id, newTask);

    dispatch(updateTask(newTask));

    setIsStatusChanging(false);
  };

  const handleEditItem = () => {
    dispatch(setEditItem(task));
  };

  return {
    editItem,
    isStatusChanging,
    isDeletingTask,
    handleDeleteTask,
    handleChengeStatusTask,
    handleEditItem,
  };
};
