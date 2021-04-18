import React from 'react';
import Search from './features/search/Search';
import './ReactIssuesApp.css';

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
