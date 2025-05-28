import { Middleware } from '@reduxjs/toolkit';

export const saveStateMiddleware: Middleware = store => next => action => {
  const result = next(action);
  
  const state = store.getState();
  
  fetch('/api/dashboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.lists.lists),
  }).catch(error => {
    console.error('Failed to save state:', error);
  });

  return result;
}; 