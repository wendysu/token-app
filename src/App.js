import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map, prop } from 'ramda';

import { apiOnSuccess, tokenRemove } from './actions';
import CreateToken from './components/CreateToken';
import './App.css';

const apiFetch = (url) => (
  fetch(url)
    .then(response => response.json())
    .then(data => data)
);

const toReadableDate = (value) => new Date(value).toLocaleString('en-au', {timeZoneName: 'short'});
const checkIsExpired = (expiryDate) => (Date.now() > expiryDate);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await apiFetch('/token.json');

      dispatch(apiOnSuccess(response.tokens));
    })();
  }, [dispatch]);

  const tokens = useSelector(state => state.tokens);
  const usedTokenNames = useMemo(() => map(prop('name'), tokens), [tokens]);
  
  return (
    <div className="App">
      <h1>API tokens</h1>
      <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Token</th>
          <th>Date created</th>
          <th>Date expires</th>
          <th>Expired</th>
          <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tokens && map(
            ({ key, name, createDate, expiryDate}) => {
              const isExpired = checkIsExpired(expiryDate);
              const rowClassName = isExpired ? 'expired' : 'active';
              const onRemoveToken = () => dispatch(
                tokenRemove(name)
              );

              return (
                <tr key={name} className={rowClassName}>
                  <td>{name}</td>
                  <td>{key}</td>
                  <td>{toReadableDate(createDate)}</td>
                  <td>{toReadableDate(expiryDate)}</td>
                  <td>{isExpired.toString()}</td>
                  <td>
                    {!isExpired && <button onClick={onRemoveToken}>Remove</button>}
                  </td>
                </tr>
              );
            }
          )(tokens)}
        </tbody>
      </table>

      <CreateToken usedTokenNames={usedTokenNames} />
    </div>
  );
}

export default App;
