import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from '../store';
import { IssuesState } from './types';

interface Props {
  title: string;
  bodyText: string;
}

const Issues = (props: Props) => {
  return (
    <li>
      Title: {props.title}
      <br />
      Body: {props.bodyText}
    </li>
  );
};

const mapStateToProps = ({ issues }: IRootState) => {
  const { list, loading } = issues;
  return { list, loading };
};

export default connect(mapStateToProps)(Issues);
