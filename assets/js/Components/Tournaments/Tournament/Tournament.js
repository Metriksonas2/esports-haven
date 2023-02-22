import React from 'react';

import './Tournament.css';
import { confirmAlert } from "react-confirm-alert";
import css from 'react-confirm-alert/src/react-confirm-alert.css';

const Tournament = ({children, id, onDelete}) => {
  const deleteHandler = () => {
    confirmAlert({
      title: 'Remove tournament',
      message: 'Do you really want to remove this tournament?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete(id)
        },
        {
          label: 'No'
        }
      ]
    });
  }

  return (
    <li className='tournament' onClick={deleteHandler}>
      {children}
    </li>
  );
}

export default Tournament;
