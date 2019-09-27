import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import createRootReducer from './rootReducer';
global.__DEV__ = process.env.NODE_ENV === 'development';
export default (history, initialState) => {
  const middlewares = [
    routerMiddleware(history),
    
    // Add other middlewares here
  ];
  // Use Redux DevTools Extension in development
  const store = createStore(
    createRootReducer(history),
    applyMiddleware(thunk),
    initialState
  );

  return store;
};
