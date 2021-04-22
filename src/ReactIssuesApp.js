import React from 'react';
import Search from './features/search/Search';
import {Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReactIssuesApp.css';

const ReactIssuesApp = () => {
  return (
    <Jumbotron fluid>
      <Search/>
    </Jumbotron>
  );
}

export default ReactIssuesApp;
