import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import menuPage from '../services/MenuPage/MenuPageReducers';

const reducers = {

  menuPage
};

export default history =>
  combineReducers({ router: connectRouter(history), ...reducers });
