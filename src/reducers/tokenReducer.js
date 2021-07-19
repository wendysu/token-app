import {
  always,
  cond,
  equals,
  propEq,
  reduce,
  T
} from 'ramda';

const tokenReducer = (state = [], { type, payload }) => (
  cond([
    [equals('API_SUCCESS'), always(payload)],
    [equals('TOKEN_CREATE'), always([
      ...state,
      payload
    ])],
    [equals('TOKEN_REMOVE'), () => {
      const isTargetToRemove = propEq('name', payload);
      
      return reduce(
        (acc, value) => (isTargetToRemove(value) ? acc : [
          ...acc,
          value
        ]), []
      )(state);
    }],
    [T,always(state)]
  ])(type)
);

export {
  tokenReducer as default
};
