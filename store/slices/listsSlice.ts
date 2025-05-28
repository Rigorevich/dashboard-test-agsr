import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { Dashboard, Task } from '@/types';

const initialState: Dashboard = {
  lists: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    hydrateDashboard: (state, action: PayloadAction<Dashboard>) => {
      state.lists = action.payload.lists;
    },
    addList: (state, action: PayloadAction<{ title: string }>) => {
      const id = uuidv4();

      state.lists.push({
        id,
        title: action.payload.title,
        tasks: [],
      });
    },
    editList: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.id);

      if (list) {
        list.title = action.payload.title;
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    addTask: (state, action: PayloadAction<{ listId: string; task: Omit<Task, 'id'> }>) => {
      const id = uuidv4();

      const list = state.lists.find(list => list.id === action.payload.listId);

      if (list) {
        list.tasks.push({ id, ...action.payload.task });
      }
    },
    updateTask: (state, action: PayloadAction<{ listId: string; task: Task }>) => {
      const { listId, task: updatedTask } = action.payload;

      const list = state.lists.find(list => list.id === listId);

      if (list) {
        const index = list.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          list.tasks[index] = updatedTask;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<{ listId: string; taskId: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId);

      if (list) {
        list.tasks = list.tasks.filter(task => task.id !== action.payload.taskId);
      }
    },
    toggleTaskStatus: (state, action: PayloadAction<{ listId: string; taskId: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId);

      const task = list?.tasks.find(task => task.id === action.payload.taskId);

      if (task) {
        task.status =
          task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'todo';
      }
    },
  },
});

export const {
  hydrateDashboard,
  addList,
  editList,
  deleteList,
  deleteTask,
  addTask,
  updateTask,
  toggleTaskStatus,
} = listsSlice.actions;

export default listsSlice.reducer;
