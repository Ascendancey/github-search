import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../actions';
import { IRootState } from '../../store';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Issue = (props: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(actions.issueQuery(props.id));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Learn more</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props.issue.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{props.issue.bodyText}</Typography>
        </DialogContent>
        {props.issue.comments.length !== 0 && (
          <DialogContent dividers>
            <Typography gutterBottom>Comments</Typography>
            {props.issue.comments.map((item: any) => {
              return (
                <Typography>
                  <Box fontWeight="fontWeightMedium" display="inline">
                    {item.author.login}&nbsp;
                  </Box>
                  commented: {item.bodyText}
                </Typography>
              );
            })}
            {}
          </DialogContent>
        )}

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

const mapStateToProps = ({ issues }: IRootState, ownProps: { id: number }) => {
  const { issue, list, loading } = issues;
  const own = ownProps.id;
  return { issue, list, loading, own };
};

export default connect(mapStateToProps)(Issue);
