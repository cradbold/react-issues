import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import './index.css';
import ReactIssuesApp from './ReactIssuesApp';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactIssuesApp/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// RIS-143: Use service worker to optimize large issues requests
// import * as serviceWorker from './serviceWorker';
// serviceWorker.register();
