import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {selectStatus, selectToken, selectIssues} from './searchSlice';

export const Issues = () => {
  const status = useSelector(selectStatus);
  const token = useSelector(selectToken);
  const issues = useSelector(selectIssues);
  const [selections, setSelections] = useState([]);

  console.log(`Issues::Issues::status: ${status}`);
  console.log(`Issues::Issues::token: ${token}`);
  console.log(`Issues::Issues::issues: ${JSON.stringify(issues, null, 2)}`);

  return (
    <Typeahead
      id="typeahead"
      labelKey="name"
      onChange={setSelections}
      options={["apple", "banana", "pear", "orange", "lemon", "grapefruit", "mango"]}
      placeholder="Choose a state..."
      selected={selections}
    />
  );
};
