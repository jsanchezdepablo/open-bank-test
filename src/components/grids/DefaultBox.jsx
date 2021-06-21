import React from 'react';
import Box from '@material-ui/core/Box';

export default ({ children, m = 4, pl = 6, pr = 6 }) => (
  <Box m={m} pl={pl} pr={pr}>
    {children}
  </Box>
);
