import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { Dashboard } from '@/types';

const initialState: Dashboard = {
  lists: [
    {
      id: '1',
      title: 'Рабочие задачи',
      tasks: [
        {
          id: '1',
          title: 'Подготовить презентацию',
          description: 'Создать слайды для отчета по проекту.',
          status: 'todo',
          durationMinutes: 90,
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: '2',
      title: 'Рабочие задачи',
      tasks: [
        {
          id: '1',
          title: 'Подготовить презентацию',
          description: 'Создать слайды для отчета по проекту.',
          status: 'todo',
          durationMinutes: 90,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Подготовить презентацию',
          description: 'Создать слайды для отчета по проекту.',
          status: 'todo',
          durationMinutes: 90,
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
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
    // addTask: (state, action: PayloadAction<{ listId: number; task: Task }>) => {
    //   const list = state.lists.find(list => list.id === action.payload.listId);
    //   if (list) list.tasks.push(action.payload.task);
    // },
    // deleteTask: (state, action: PayloadAction<{ listId: number; taskId: number }>) => {
    //   const list = state.lists.find(list => list.id === action.payload.listId);
    //   if (list) list.tasks = list.tasks.filter(task => task.id !== action.payload.taskId);
    // },
    // toggleTaskStatus: (state, action: PayloadAction<{ listId: number; taskId: number }>) => {
    //   const list = state.lists.find(list => list.id === action.payload.listId);
    //   const task = list?.tasks.find(task => task.id === action.payload.taskId);
    //   if (task) task.done = !task.done;
    // },
  },
});

export const { addList, editList, deleteList } = listsSlice.actions;

export default listsSlice.reducer;
