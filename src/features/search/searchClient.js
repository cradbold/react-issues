import axios from 'axios';
import {setIssues} from './searchSlice';

export const fetchIssues = async (dispatch, token) => {
  const options = {
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    data: {
      query: `
        query {
          repository(owner:"facebook", name:"react") {
            issues(first:1, states:OPEN) {
              edges {
                node {
                  title
                }
              }
            }
          }
        }
      `
    }
  };

  await axios(options).then((response) => {
    dispatch(setIssues(response.data));
    return response.data;
  });
};
