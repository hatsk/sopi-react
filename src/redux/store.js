import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';

import logger from './middleware/logger';
import generateId from './middleware/generateId';

import reducer from './reducer';
import history from '../history';

const middleware = [routerMiddleware(history), generateId, logger];

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware().concat(middleware),
});
