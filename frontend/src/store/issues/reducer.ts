import { Constants, IssuesActions, IssuesState } from './types';

const init: IssuesState = {
  list: [],
  loading: false,
};

export function demoReducer(
  state: IssuesState = init,
  action: IssuesActions,
): IssuesState {
  switch (action.type) {
    case Constants.ADD_ITEM:
      return { ...state, list: [...state.list, action.payload.item] };
    case Constants.SET_LOADING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
