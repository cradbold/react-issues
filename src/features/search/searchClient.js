import axios from 'axios';
import {setIssues} from './searchSlice';

// RIS-188: Parameterize other GraphQL query options
// RIS-203: Consider rate limiting (GraphQL, not REST) failure
export const fetchIssues = async (dispatch, token) => {
  const options = {
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    // RIS-25: Parameterize # of issues & paginate
    data: {
      query: `
        query {
          repository(owner:"facebook", name:"react") {
            issues(first:50, states:OPEN) {
              edges {
                node {
                  title
                  state
                  createdAt
                  updatedAt
                  labels(first:5) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    }
  };

  export const fetchLabels = async (dispatch, token) => {
    const options = {
      url: 'https://api.github.com/graphql',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
      // RIS-25: Parameterize # of issues & paginate
      data: {
        query: `
        query {
          repository(owner:"facebook", name:"react") {
            labels(first:70) {
              edges {
                node {
                  name
                }
              }
            }
          }
        `
      }
    }
  };

  await axios(options).then((response) => {
    dispatch(setLabels(response.data));
    return response.data;
  });
};
