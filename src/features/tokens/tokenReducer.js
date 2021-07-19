import { createSlice } from '@reduxjs/toolkit';
import {
  always,
  propEq,
  reduce
} from 'ramda';

const tokenSlicer = createSlice({
  name: 'tokens',
  initialState: [],
  reducers: {
    tokenFetched: (state, action) => action.payload,
    tokenCreate: (state, action) => ([
      ...state,
      action.payload
    ]),
    tokenRemove: (state, action) => {
      const isTargetToRemove = propEq('name', action.payload);
      
      return reduce(
        (acc, value) => (isTargetToRemove(value) ? acc : [
          ...acc,
          value
        ]), []
      )(state);
    }
  }
});

const {
  tokenFetched,
  tokenCreate,
  tokenRemove
} = tokenSlicer.actions;

const tokenReducer = tokenSlicer.reducer;

export {
  tokenReducer as default,
  tokenFetched,
  tokenCreate,
  tokenRemove
};
