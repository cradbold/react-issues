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

  // console.log(`searchClient::fetchLabels::options (outer): ${JSON.stringify(options, null, 2)}`);

  await axios(options).then(async (outerResponse) => {
    // console.log(`searchClient::fetchLabels::outerResponse: ${JSON.stringify(outerResponse, null, 2)}`);

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

    // console.log(`searchClient::fetchLabels::options (inner): ${JSON.stringify(options, null, 2)}`);

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

  // console.log(`searchClient::fetchIssues::options (outer): ${JSON.stringify(options, null, 2)}`);

  await axios(options).then(async (outerResponse) => {
    // console.log(`searchClient::fetchIssues::outerResponse: ${JSON.stringify(outerResponse, null, 2)}`);
    console.log(`searchClient::fetchIssues::labelsString: ${labelsString}`);

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
                        labels(first:10) {
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
            }
          }
        }
      `
    };

    // console.log(`searchClient::fetchIssues::options (inner): ${JSON.stringify(options, null, 2)}`);

    await axios(options).then((response) => {
      console.log(`searchClient::fetchIssues::response: ${JSON.stringify(response, null, 2)}`);

      dispatch(setIssues(response.data.data));

      return response.data.data;
    });
  });
};
