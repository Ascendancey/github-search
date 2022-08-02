import { action } from 'typesafe-actions';
import { Constants } from './types';
import * as API from './api';

export function pending(type: any, payload = null) {
  return {
    type: `${type}_PENDING`,
    payload,
  };
}

export function rejected(type: any, payload = null) {
  return {
    type: `${type}_REJECTED`,
    payload,
  };
}

export function fulfilled(type: any, payload = null) {
  return {
    type: `${type}_FULFILLED`,
    payload,
  };
}

export const issuesQuery = () => (dispatch: any) => {
  dispatch(pending(Constants.LOADING));
  API.issuesQuery()
    .then((payload) => {
      dispatch(fulfilled(Constants.LOADING, payload));
    })
    .catch((err: any) => {
      dispatch(rejected(Constants.LOADING, err));
    });
};

export function setLoading(loading: boolean) {
  API.issuesQuery();
  return action(Constants.LOADING, {
    loading,
  });
}
