import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Form, InputGroup, Button, Modal} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// RIS-43: Investigate bringing this in via props as a sub-component
// RIS-233: Componetize & prettify issue visualization
import {selectLabels, setSelections, getIssues, selectIssues} from '../searchSlice';

export const Issues = () => {
  const labels = useSelector(selectLabels);
  const issues = useSelector(selectIssues);
  const dispatch = useDispatch();
  const [tempSelections, setTempSelections] = useState([]);
  const [showDetail, setShowDetail] = useState(false);

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
            options={labels ? adaptLabels(labels) : []}
            placeholder="Enter issue labels..."
            selected={tempSelections}
            onChange={setTempSelections}
          />
          <InputGroup.Append>
          <Button onClick={
            () => {
              setShowDetail(true);
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
      {getIssuesRender(showDetail, setShowDetail, issues)}
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

const getIssuesRender = (show, setShow, rawIssues) => {
  let issuesRender = (<React.Fragment/>);

  try {
    if (rawIssues) {
      const issues = [];
      // "repository":{"labels":{"edges":[{"node":{"issues":{"edges":[{"node":{"title"
      rawIssues.repository.labels.edges.forEach((label) => {
        label.node.issues.edges.forEach((issue) => {
          issues.push(`* ${issue.node.title}`);
        });
      })

      issuesRender = (
        <Modal show={show} backdrop="static" size="lg" centered onHide={() => {setShow(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>Issue Titles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {issues.map((title, index) => (
              <p key={index}>{title}</p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {setShow(false)}}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  } catch (err) {
    console.error(`issues is unexpectedly malformed: ${JSON.stringify(rawIssues, null, 2)}`);
  } finally {
    return issuesRender;
  }
};
