import React, { Suspense } from 'react';
// import { FormattedMessage, useIntl } from 'react-intl';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import { MuiThemeProvider, Box } from '@material-ui/core';
// import { theme } from 'core/content/styles/theme';
import { DETAIL } from 'routes/routing/paths';
import ErrorBoundaryRoute from 'components/errors/ErrorBoundaryRoute';
import routes from 'routes/routing/routes';
import Header from 'routes/main/Header';

export default () => (
  // <MuiThemeProvider theme={theme}>
  <Suspense fallback={'Loading' /* useIntl().formatMessage({ id: 'default.loading', defaultMessage: 'Loading...' }) */}>
    <BrowserRouter>
      <div className="App">
        <Header />
        <main role="main" className="wrapper">
          <Switch>
            <Redirect exact from="/" to={DETAIL} />
            {routes?.map((route, index) => (
              <ErrorBoundaryRoute exact key={index} path={route?.path} component={route?.component} />
            ))}
            {/* <Route
                render={() => (
                  <Box p={2} m={2}>
                    <h2>
                      <FormattedMessage id="default.error.route" defaultMessage="Route not found" />
                    </h2>
                  </Box>
                )}
              /> */}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  </Suspense>
  // </MuiThemeProvider>
);
