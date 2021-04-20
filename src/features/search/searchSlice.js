import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {store} from '../../store';
import {fetchLabels, fetchIssues} from './searchClient';

const initialState = {
  status: 'READY',
  token: null,
  labels: null,
  selections: null,
  issues: null
};

export const getLabels = createAsyncThunk('search/fetchLabels', (dispatch) => {
  const token = store.getState().search.token;
  const responseData = fetchLabels(dispatch, token);
  return responseData;
});

export const getIssues = createAsyncThunk('search/fetchIssues', (dispatch) => {
  const token = store.getState().search.token;
  const selections = store.getState().search.selections;
  const responseData = fetchIssues(dispatch, token, JSON.stringify(selections));
  return responseData;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
    setSelections: (state, action) => {
      state.selections = action.payload;
    },
    setIssues: (state, action) => {
      state.issues = action.payload;
    }
  },
  extraReducers: {
    [getLabels.pending]: (state) => {
      state.status = 'LOADING';
    },
    [getLabels.fulfilled]: (state) => {
      state.status = 'READY';
    },
    [getLabels.rejected]: (state) => {
      state.status = 'ERROR';
    },
    [getIssues.pending]: (state) => {
      state.status = 'LOADING';
    },
    [getIssues.fulfilled]: (state) => {
      state.status = 'READY';
    },
    [getIssues.rejected]: (state) => {
      state.status = 'ERROR';
    }
  }
});

export const selectStatus = (state) => {
  return state.search.status;
}

export const selectToken = (state) => {
  return state.search.token;
}

export const selectLabels = (state) => {
  return state.search.labels;
}

export const selectSelections = (state) => {
  return state.search.selections;
}

export const selectIssues = (state) => {
  return state.search.issues;
}

export const {setToken, setLabels, setSelections, setIssues} = searchSlice.actions;
export default searchSlice.reducer;
