import { combineReducers } from 'redux';

import {
  Main,
} from './pages';

const appReducer = combineReducers({
  main: Main.reducers.main,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
