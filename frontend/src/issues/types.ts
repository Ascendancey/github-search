import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type IssuesActions = ActionType<typeof actions>;

export interface IssuesState {
  list: string[];
  loading: boolean;
}

export enum Constants {
  LOADING = 'LOADING',
}
