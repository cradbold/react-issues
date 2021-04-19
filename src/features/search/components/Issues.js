import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Form, InputGroup, Button, Modal} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from '../Search.module.css';

// RIS-43: Investigate bringing this in via props as a sub-component
// import {selectStatus, selectToken, selectIssues} from '../searchSlice';
import {selectStatus, selectLabels, selectIssues} from '../searchSlice';

export const Issues = () => {
  const status = useSelector(selectStatus);
  // const token = useSelector(selectToken);
  const labels = useSelector(selectLabels);
  const issues = useSelector(selectIssues);
  const [selections, setSelections] = useState([]);
  const [showDetail, setShowDetail] = useState(false);

  console.log(`Issues::Issues::status: ${status}`);
  // console.log(`Issues::Issues::token: ${token}`); // Don't log private token
  console.log(`Issues::Issues::labels: ${JSON.stringify(labels, null, 2)}`);
  console.log(`Issues::Issues::issues: ${JSON.stringify(issues, null, 2)}`);

  // TODO: replace issues with labels; add button to fire issue search; autocomplete issue search to popup dialog 
  return (
    <div className={styles.row}>
      <React.Fragment>
        <Form.Group>
          <Form.Label>Search Issues by Title</Form.Label>
          <InputGroup>
            <Typeahead
              id="typeahead"
              labelKey="name"
              dropUp="true"
              minLength="2"
              highlightOnlyResult="true"
              onChange={setSelections}
              options={adaptIssues(issues, "title")}
              placeholder="Enter issue title..."
              selected={selections}
            />
            <InputGroup.Append>
            <Button onClick={
              () => {
                setShowDetail(true);
                console.log(`Issues::Issues::selections: ${selections}`);
                // dispatch(setToken(token));
                // dispatch(getIssues(dispatch));
              }
            }>Details</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Modal show={showDetail} backdrop="static" size="lg" centered onHide={() => {setShowDetail(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>Issue Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {setShowDetail(false)}}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    </div>
  );
};

const adaptIssues = (issues) => {
  const issueValues = [];
  try {
    issues.data.repository.issues.edges.forEach((issue) => {
      issueValues.push(issue.node.title);
    });
  } catch (err) {
    console.error(`issues is unexpectedly malformed: ${JSON.stringify(issues, null, 2)}`);
  } finally {
    return issueValues;
  }
};
