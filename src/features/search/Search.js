import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setToken, getIssues} from './searchSlice';
import {Issues} from './Issues';
import styles from './Search.module.css';

const Search = () => {
  const dispatch = useDispatch();
  const [token, changeToken] = useState('');

  return (
    <div>
      <div className={styles.row}>
        <input className={styles.textbox} aria-label="GitHub Token" value={token} onChange={(e) => changeToken(e.target.value)}/>
        <button className={styles.asyncButton} onClick={
          () => {
            dispatch(setToken(token));
            dispatch(getIssues(dispatch));
          }
        }>Set Token</button>
      </div>
      <div className={styles.row}>
        <Issues/>
      </div>
    </div>
  );
}

export default Search;
