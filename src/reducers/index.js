import { combineReducers } from 'redux';

import tokenReducer from './tokenReducer';

const appReducers = combineReducers({ tokens: tokenReducer });

export {
  appReducers as default
};
