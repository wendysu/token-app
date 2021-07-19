import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { includes, isEmpty } from 'ramda';

import { tokenCreate } from '../actions';
import './CreateToken.css';

/**
 * Generate expiry date, 7 days from the moment token created
 * @param {number} createDate in milliseconds
 * @returns {number} expiryDate in milliseconds
 */
const getTokenExpiryDate = (createDate) => {
  const startDate = new Date(createDate);
  
  return startDate.setDate(startDate.getDate() + 7);
};

const CreateToken = ({ usedTokenNames }) => {
  const dispatch = useDispatch();
  const [newTokenName, setNewTokenName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onCreateToken = () => {
    const isEmptyTokenName = isEmpty(newTokenName);
    const isDuplicateTokenName = includes(newTokenName, usedTokenNames);
  
    if (isEmptyTokenName || isDuplicateTokenName) {
      if (isEmptyTokenName) {
        setErrorMessage('Warnning : Token name is not specified');
      } else if (isDuplicateTokenName) {
        setErrorMessage(`Warnning : Invalid token name: "${newTokenName}"`);
      }

      return;
    }

    const createDate = Date.now();
    const expiryDate = getTokenExpiryDate(createDate);
    const newToken = {
      name: newTokenName,
      key: uuidV4(),
      createDate,
      expiryDate
    };

    dispatch(
      tokenCreate(newToken)
    );
  };

  return (
    <div className='createToken'>
      <label>New token name:
        <input
          type='text'
          value={newTokenName}
          onChange={(e) => setNewTokenName(e.currentTarget.value)}
        />
      </label>
      <button onClick={onCreateToken}>Create</button>
      <div className='createToken_errorMessage'>{errorMessage}</div>
    </div>
  );
};

CreateToken.defaultProps = {
  usedTokenNames: []
};

CreateToken.propTypes = {
  usedTokenNames: PropTypes.arrayOf(
    PropTypes.string
  )
};

export {
  CreateToken as default
};
