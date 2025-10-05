import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Task } from '../types/Task';
import { tasksAPI } from '../api/tasksAPI';
import { STATUS, type ChoosedStatus } from '../types/Status';

interface TasksState {
  items: Task[];
  visibleItems: Task[];
  editItem: Task;
  filter: ChoosedStatus;
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  visibleItems: [],
  editItem: {
    id: '',
    title: '',
    status: false,
    description: '',
  },
  filter: STATUS.ALL,
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', () =>
  tasksAPI.getAll(),
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<Task, 'id'>>) {
      const taskWithMaxId = state.items.reduce((acc, task) => {
        return +acc.id > +task.id ? acc : task;
      });

      const newTask: Task = {
        ...action.payload,
        id: `${+taskWithMaxId.id + 1}`,
      };

      state.items.push(newTask);
    },
    updateTask(state, action: PayloadAction<Task>) {
      state.items = state.items.map((task) => {
        return task.id === action.payload.id ? action.payload : task;
      });
      state.editItem = {
        id: '',
        title: '',
        status: false,
        description: '',
      };
    },
    removeTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    setEditItem(state, action: PayloadAction<Task>) {
      console.log(action.payload);
      state.editItem = action.payload;
    },
    setFilte(state, action: PayloadAction<ChoosedStatus>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error loading tasks';
      });
  },
});

export const { addTask, updateTask, removeTask, setEditItem, setFilte } =
  tasksSlice.actions;
export default tasksSlice.reducer;
