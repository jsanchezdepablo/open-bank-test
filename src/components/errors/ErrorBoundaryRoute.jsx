import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default ({ component: Component, ...rest }) => {
  if (!Component) throw new Error(`A component needs to be specified for path ${rest?.path}`);

  const encloseInErrorBoundary = props => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

  return <Route {...rest} render={encloseInErrorBoundary} />;
};
