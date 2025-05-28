import { configureStore } from '@reduxjs/toolkit';

import listsReducer from './slices/listsSlice';
import { saveStateMiddleware } from './middleware/saveStateMiddleware';

const store = configureStore({
  reducer: {
    lists: listsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(saveStateMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
