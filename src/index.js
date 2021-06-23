import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import ErrorBoundary from 'components/errors/ErrorBoundary';
import MainApp from './App';
import * as serviceWorker from './serviceWorker';

import 'core/content/styles/styles.scss';

function loadLocaleData(locale) {
  switch (locale) {
    case 'es-ES':
      return import('locale/es.json');
    default:
      return import('locale/en.json');
  }
}

const App = ({ locale, messages }) => (
  <React.StrictMode>
    <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
      <ErrorBoundary>
        <MainApp />
      </ErrorBoundary>
    </IntlProvider>
  </React.StrictMode>
);

async function bootstrapApplication(locale, mainDiv) {
  const messages = await loadLocaleData(locale);
  ReactDOM.render(<App locale={locale} messages={messages} />, mainDiv);
}

bootstrapApplication(navigator.language, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
