import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from './dialog';

interface Props {
  title: string;
  bodyText: string;
  number: number;
}

export default function BasicCard(props: Props) {
  return (
    <Card sx={{ minWidth: 350, height: 175 }}>
      <CardContent>
        <Typography sx={{ typography: 'subtitle2' }} gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="body2" paragraph sx={{ maxHeight: 25 }}>
          {props.bodyText}
        </Typography>
      </CardContent>
      <CardActions>
        <Dialog id={props.number} />
      </CardActions>
    </Card>
  );
}
