import { Constants, IssuesActions, IssuesState } from './types';

const init: IssuesState = {
  list: [{ number: null, url: '', title: '', bodyText: '', state: '' }],
  issue: {
    number: null,
    url: '',
    title: '',
    bodyText: '',
    state: '',
    comments: [{ bodyText: '', author: { login: '' } }],
  },
  loading: false,
};

export function demoReducer(
  state: IssuesState = init,
  action: IssuesActions,
): IssuesState {
  switch (action.type) {
    case `${Constants.ISSUES}_PENDING`:
      return { ...state, loading: true };
    case `${Constants.ISSUES}_REJECTED`:
      return { ...state, loading: false };
    case `${Constants.ISSUES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        list: action.payload.issues,
        issue: init.issue,
      };
    case `${Constants.ISSUE}_PENDING`:
      return { ...state, loading: true };
    case `${Constants.ISSUE}_REJECTED`:
      return { ...state, loading: false };
    case `${Constants.ISSUE}_FULFILLED`:
      return { ...state, loading: false, issue: action.payload.issue };
    default:
      return state;
  }
}
