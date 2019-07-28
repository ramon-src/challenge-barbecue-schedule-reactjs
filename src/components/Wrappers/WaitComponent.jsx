import React, { Suspense } from 'react';
import { CircularProgress } from '@material-ui/core';

const WaitingComponent = Component => {
  return props => (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );
};

export default WaitingComponent;
