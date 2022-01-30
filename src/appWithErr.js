import {withErrorBoundary} from 'react-error-boundary';
import React from 'react';
import MainApp from 'pages/app';

import ErrorPage from './pages/auth-pages/error-page/index';

const ComponentWithErrorBoundary = withErrorBoundary(MainApp, {
  FallbackComponent: ErrorPage,
  onError(error, info) {
    return <h1>Hello , The App Just Threw an Unexpected Error</h1>;
    // Do something with the error
    // E.g. log to an error logging client here
  },
});

export default ComponentWithErrorBoundary;
