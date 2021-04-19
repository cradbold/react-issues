import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {setToken, getIssues} from './searchSlice';
import {Issues} from './components/Issues';
import styles from './Search.module.css';

const Search = () => {
  const dispatch = useDispatch();
  const [token, changeToken] = useState('');

  // RIS-188: Parameterize other GraphQL query options
  // RIS-75: Add accessibilityt/aria-label to all comps
  return (
    <div>
      <div className={styles.row}>
        <Form>
          <Form.Label>GitHub Token</Form.Label>
          <InputGroup>
            <Form.Control type="password" aria-label="GitHub Token" placeholder="Enter token..." value={token} onChange={(e) => changeToken(e.target.value)}/>
            <InputGroup.Append>
              <Button onClick={
                () => {
                  dispatch(setToken(token));
                  dispatch(getIssues(dispatch));
                }
              }>Submit</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
      <div className={styles.row}>
        <Issues/>
      </div>
    </div>
  );
}

export default Search;
