import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/tokens/tokenReducer';

export default configureStore({
  reducer: {
    tokens: tokenReducer
  }
});
