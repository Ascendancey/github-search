import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface Props {
  title: string;
  bodyText: string;
}

export default function BasicCard(props: Props) {
  return (
    <Card sx={{ minWidth: 350, minHeight: 170 }}>
      <CardContent>
        <Typography sx={{ typography: 'subtitle2' }} gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="body2" paragraph sx={{ maxHeight: 25 }}>
          {props.bodyText}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
