import searchReducer, {
  setToken,
  setLabels,
  setSelections,
  setIssues,
  selectStatus,
  selectToken,
  selectLabels,
  selectSelections,
  selectIssues
} from './searchSlice';

describe('search reducer', () => {
  const initialState = {
    status: 'READY',
    token: undefined,
    labels: undefined,
    selections: undefined,
    issues: undefined
  };

  it('should handle initial state', () => {
    expect(searchReducer(undefined, {type: 'unknown'})).toEqual({
      status: 'READY',
      token: undefined,
      labels: undefined,
      selections: undefined,
      issues: undefined
    });
  });

  it('should handle setToken', () => {
    const actual = searchReducer(initialState, setToken("token"));
    expect(actual.token).toEqual("token");
  });

  it('should handle setLabels', () => {
    const actual = searchReducer(initialState, setLabels({labels: ["label1", "label2"]}));
    expect(actual.labels).toEqual({labels: ["label1", "label2"]});
  });

  it('should handle setSelections', () => {
    const actual = searchReducer(initialState, setSelections(["selection1", "selection2"]));
    expect(actual.selections).toEqual(["selection1", "selection2"]);
  });

  it('should handle setIssues', () => {
    const actual = searchReducer(initialState, setIssues({issues: ["issues1", "issues2"]}));
    expect(actual.issues).toEqual({issues: ["issues1", "issues2"]});
  });

  it('should handle selectStatus', () => {
    initialState.status = "READY";
    const actual = searchReducer(initialState, selectStatus);
    expect(actual.status).toEqual("READY");
  });

  it('should handle selectToken', () => {
    initialState.token = "token";
    const actual = searchReducer(initialState, selectToken);
    expect(actual.token).toEqual("token");
  });

  it('should handle selectLabels', () => {
    initialState.labels = {labels: ["label1", "label2"]};
    const actual = searchReducer(initialState, selectLabels);
    expect(actual.labels).toEqual({labels: ["label1", "label2"]});
  });

  it('should handle selectSelections', () => {
    initialState.selections = ["selection1", "selection2"];
    const actual = searchReducer(initialState, selectSelections);
    expect(actual.selections).toEqual(["selection1", "selection2"]);
  });

  it('should handle selectIssues', () => {
    initialState.issues = {issues: ["issue1", "issue2"]};
    const actual = searchReducer(initialState, selectIssues);
    expect(actual.issues).toEqual({issues: ["issue1", "issue2"]});
  });
});
