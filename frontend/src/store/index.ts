import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { demoReducer } from './demo/reducer';
import { IDemoState } from './demo/types';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface IRootState {
  demo: IDemoState;
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    demo: demoReducer,
  }),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      createLogger({ collapsed: true, duration: true, diff: true }),
    ),
  ),
);

export default store;
