import axios from 'axios';
import {setLabels, setIssues} from './searchSlice';

// RIS-48: Param'ize ISSUE_CAP
const ISSUE_CAP = 10;

// RIS-188: Parameterize other GraphQL query options
// RIS-190: Reduce to one request for label count
// RIS-203: Consider rate limiting (GraphQL, not REST) failure

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
            labels {
              totalCount
            }
          }
        }
      `
    }
  }

  await axios(options).then(async (outerResponse) => {
    const labelCount = outerResponse.data.data.repository.labels.totalCount;

    options.data = {
      query: `
        query {
          repository(owner:"facebook", name:"react") {
            labels(first:${labelCount}) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `
    };

    await axios(options).then((response) => {
      dispatch(setLabels(response.data.data));
      return response.data.data;
    });
  });
};

export const fetchIssues = async (dispatch, token, labelsString='["Component: DOM", "Type: Bug"]') => {
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
            labels {
              totalCount
            }
          }
        }
      `
    }
  }

  await axios(options).then(async (outerResponse) => {
    const labelCount = outerResponse.data.data.repository.labels.totalCount;

    options.data = {

      // RIS-25: Parameterize # of issues & paginate
      query: `
        query {
          repository(owner:"facebook", name:"react") {
            labels(first:${labelCount}) {
              edges {
                node {
                  issues(first:${ISSUE_CAP}, labels:${labelsString}, states:OPEN) {
                    edges {
                      node {
                        title
                        state
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    };

    await axios(options).then((response) => {
      dispatch(setIssues(response.data.data));
      return response.data.data;
    });
  });
};
