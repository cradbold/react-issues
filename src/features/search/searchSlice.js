import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {store} from '../../store';
import {fetchIssues} from './searchClient';

const initialState = {
  status: 'READY',
  token: null,
  issues: null
};

export const getIssues = createAsyncThunk('search/fetchIssues', (dispatch) => {
  const token = store.getState().search.token;
  const response = fetchIssues(dispatch, token);
  return response;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIssues: (state, action) => {
      state.issues = action.payload;
    }
  },
  extraReducers: {
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

export const selectIssues = (state) => {
  return state.search.issues;
}

export const {setToken, setIssues} = searchSlice.actions;
export default searchSlice.reducer;
