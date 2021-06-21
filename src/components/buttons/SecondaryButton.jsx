import React from 'react';
import Button from '@material-ui/core/Button';

export default ({ children, ...rest }) => (
  <Button color="primary" {...rest}>
    {children}
  </Button>
);
