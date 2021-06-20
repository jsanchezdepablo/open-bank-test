import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    margin: '24px',
  },
});

export default ({ title, children }) => {
  const classes = useStyles();

  return (
    <Box className={classes?.root}>
      <Typography variant="h5">{title}</Typography>
      {children}
    </Box>
  );
};
