import tokenReducer, { tokenCreate, tokenRemove } from './tokenReducer';

test('should add new token to an empty token array', () => {
  const previousState = [];
  const newTokenObj = {
    name: 'abc',
    token: '123987'
  };

  expect(
    tokenReducer(previousState, tokenCreate(newTokenObj))
  ).toEqual([{
    name: 'abc',
    token: '123987'
  }])
});

test('should remove token from token array with specified name', () => {
  const previousState = [{
    name: 'abc',
    token: '123'
  },{
    name: 'def',
    token: '456'
  },{
    name: 'ghi',
    token: '789'
  }];

  expect(
    tokenReducer(previousState, tokenRemove('def'))
  ).toEqual([{
    name: 'abc',
    token: '123'
  },{
    name: 'ghi',
    token: '789'
  }])
});
