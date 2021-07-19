const apiOnSuccess = (payload) => ({ type: 'API_SUCCESS', payload });
const tokenCreate = (payload) => ({ type: 'TOKEN_CREATE', payload });
const tokenRemove = (payload) => ({ type: 'TOKEN_REMOVE', payload });

export {
  apiOnSuccess,
  tokenCreate,
  tokenRemove
};
