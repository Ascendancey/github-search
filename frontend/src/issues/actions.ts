import { action } from 'typesafe-actions';
import { Constants } from './types';
import * as API from './api';

export function pending(type: any, payload?: any) {
  return {
    type: `${type}_PENDING`,
    payload,
  };
}

export function rejected(type: any, payload?: any) {
  return {
    type: `${type}_REJECTED`,
    payload,
  };
}

export function fulfilled(type: any, payload: any) {
  return {
    type: `${type}_FULFILLED`,
    payload,
  };
}

export const issuesQuery = (term: string) => (dispatch: any) => {
  dispatch(pending(Constants.ISSUES), null);
  API.issuesQuery(term)
    .then((payload) => {
      dispatch(fulfilled(Constants.ISSUES, payload));
    })
    .catch((err: any) => {
      dispatch(rejected(Constants.ISSUES, err));
    });
};

export const issueQuery = (term: number) => (dispatch: any) => {
  dispatch(pending(Constants.ISSUE), null);
  API.issueQuery(term)
    .then((payload) => {
      dispatch(fulfilled(Constants.ISSUE, payload));
    })
    .catch((err: any) => {
      dispatch(rejected(Constants.ISSUE, err));
    });
};

export function setLoading(loading: boolean) {
  return action(Constants.ISSUES, {
    loading,
  });
}
