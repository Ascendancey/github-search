import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { demoReducer } from './issues/reducer';
import { IssuesState } from './issues/types';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface IRootState {
  issues: IssuesState;
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    issues: demoReducer,
  }),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      createLogger({ collapsed: true, duration: true, diff: true }),
    ),
  ),
);

export default store;
