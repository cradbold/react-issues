import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Form, InputGroup, Button, Modal} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
// import styles from '../Search.module.css';

// RIS-43: Investigate bringing this in via props as a sub-component
// import {selectStatus, selectToken, selectLabels, setSelections, selectIssues, getIssues} from '../searchSlice';
import {selectStatus, selectLabels, setSelections, selectIssues, getIssues} from '../searchSlice';

export const Issues = () => {
  const status = useSelector(selectStatus);
  // const token = useSelector(selectToken);
  const labels = useSelector(selectLabels);
  const issues = useSelector(selectIssues);
  const dispatch = useDispatch();
  const [tempSelections, setTempSelections] = useState([]);
  const [showDetail, setShowDetail] = useState(false);

  console.log(`Issues::Issues::status: ${status}`);
  // console.log(`Issues::Issues::token: ${token}`); // Don't log private token
  // console.log(`Issues::Issues::labels: ${JSON.stringify(labels, null, 2)}`);
  console.log(`Issues::Issues::issues: ${JSON.stringify(issues, null, 2)}`);

  // TODO: replace issues with labels; add button to fire issue search; autocomplete issue search to popup dialog
  // labelKey="name"
  return (
    <React.Fragment>
      <Form.Group>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Labels</InputGroup.Text>
          </InputGroup.Prepend>
          <Typeahead
            id="typeahead"
            dropUp={true}
            highlightOnlyResult={true}
            labelKey="name"
            minLength={2}
            multiple={true}
            options={adaptLabels(labels)}
            placeholder="Enter issue labels..."
            selected={tempSelections}
            onChange={setTempSelections}
          />
          <InputGroup.Append>
          <Button onClick={
            () => {
              // setShowDetail(true);
              console.log(`Issues::Issues::selections: ${tempSelections}`);
              dispatch(setSelections(tempSelections));
              dispatch(getIssues(dispatch));
            }
          }>Search Issues</Button>
          </InputGroup.Append>
        </InputGroup>
        <Form.Text className="text-muted">
          Two characters minimum
        </Form.Text>
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
  );
};

const adaptLabels = (labels) => {
  const labelValues = [];
  try {
    labels.repository.labels.edges.forEach((label) => {
      labelValues.push(label.node.name);
    });
  } catch (err) {
    console.error(`labels is unexpectedly malformed: ${JSON.stringify(labels, null, 2)}`);
  } finally {
    return labelValues;
  }
};

const adaptIssues = (issues) => {
  const issueValues = [];
  try {
    issues.repository.issues.edges.forEach((issue) => {
      issueValues.push(issue.node.title);
    });
  } catch (err) {
    console.error(`issues is unexpectedly malformed: ${JSON.stringify(issues, null, 2)}`);
  } finally {
    return issueValues;
  }
};
