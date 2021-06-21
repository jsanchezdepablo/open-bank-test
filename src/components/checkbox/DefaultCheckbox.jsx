import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export default ({ label, ...rest }) => (
  <FormControlLabel control={<Checkbox color="primary" {...rest} />} label={label} />
);
