import React from 'react';
// import { useIntl } from 'react-intl';
import { AppBar, Grid, Typography, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import logo from 'core/content/assets/img/logo_lgtb_1.svg';

export default () => (
  <>
    <AppBar color="default" position="sticky">
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={6}>
          <NavLink to="/">
            <Box m={1} pl={1}>
              <img src={logo} alt="open-bank-logo" width="150px" height="25px" />
            </Box>
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <Box m={1}>
            <Typography align="right">
              {/* {useIntl().formatMessage({ id: 'default.title', defaultMessage: 'Intelligent Extract' })} */}
              {'Password Manager'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AppBar>
  </>
);
