import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Container, Row, Form, InputGroup, Button} from 'react-bootstrap';
import {setToken, getLabels} from './searchSlice';
import {Issues} from './components/Issues';
// import styles from './Search.module.css';

const Search = () => {
  const dispatch = useDispatch();
  const [token, changeToken] = useState('');

  // RIS-188: Parameterize other GraphQL query options
  // RIS-75: Add accessibilityt/aria-label to all comps
  // RIS-12: Add CLI->UI support for github token
  return (
    <Container>
      <Row>
        <Form>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>GitHub Token</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" aria-label="GitHub Token" placeholder="Enter token..." value={token} onChange={(e) => changeToken(e.target.value)}/>
            <InputGroup.Append>
              <Button onClick={
                () => {
                  dispatch(setToken(token));
                  dispatch(getLabels(dispatch));
                }
              }>Submit</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Row>
      <Row>
        <Issues/>
      </Row>
    </Container>
  );
}

export default Search;
