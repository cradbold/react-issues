import React from 'react';
import Search from './features/search/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReactIssuesApp.css';

// RIS-12: Remove all console logging
const ReactIssuesApp = () => {
  return (
    <div className="app">
      <header className="app-header">
        <Search/>
      </header>
    </div>
  );
}

export default ReactIssuesApp;
