import { Constants, IssuesActions, IssuesState } from './types';

const init: IssuesState = {
  list: ['issue1', 'issue2'],
  loading: false,
};

export function demoReducer(
  state: IssuesState = init,
  action: IssuesActions,
): IssuesState {
  switch (action.type) {
    case `${Constants.LOADING}_PENDING`:
      return { ...state, loading: true };
    case `${Constants.LOADING}_REJECTED`:
      return { ...state, loading: false };
    case `${Constants.LOADING}_FULFILLED`:
      return { ...state, loading: false };
    default:
      return state;
  }
}
