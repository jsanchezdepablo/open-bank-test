import React from 'react';
// import { useIntl } from 'react-intl';
import DetailForm from 'components/forms/DetailForm';
import DefaultLayout from 'routes/layouts/DefaultLayout';

export default props => (
  <DefaultLayout title="Vista detalle">
    <DetailForm {...props} />
  </DefaultLayout>
);
