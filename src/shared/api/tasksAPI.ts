import type { Task } from '../types/Task';

const getAll = async (): Promise<Task[]> => {
  const res = await fetch(
    'https://68dfacc5898434f41358845d.mockapi.io/api/tb/tasks',
    {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
  );

  return res.json();
};

const getById = async (taskId: Task['id']): Promise<Task> => {
  const res = await fetch(
    `https://68dfacc5898434f41358845d.mockapi.io/api/tb/tasks/${taskId}`,
    {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
  );

  return res.json();
};

const create = async ({
  title,
  status = false,
  description,
}: Omit<Task, 'id'>): Promise<Task> => {
  const res = await fetch(
    'https://68dfacc5898434f41358845d.mockapi.io/api/tb/tasks',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, status, description }),
    },
  );

  return res.json();
};

const remove = async (tasksId: Task['id']) => {
  const res = await fetch(
    `https://68dfacc5898434f41358845d.mockapi.io/api/tb/tasks/${tasksId}`,
    {
      method: 'DELETE',
    },
  );

  return res.json();
};

const update = async (
  tasksId: Task['id'],
  { title, status, description }: Omit<Task, 'id'>,
) => {
  const res = await fetch(
    `https://68dfacc5898434f41358845d.mockapi.io/api/tb/tasks/${tasksId}`,
    {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, status, description }),
    },
  );

  return res.json();
};

export const tasksAPI = {
  getAll,
  getById,
  create,
  remove,
  update,
};
