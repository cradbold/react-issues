import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
// import searchReducer from './features/search/searchSlice';
import './index.css';
import ReactIssuesApp from './ReactIssuesApp';
// import * as serviceWorker from './serviceWorker';

// const store = configureStore({
//   reducer: {
//     search: searchReducer
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactIssuesApp/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
