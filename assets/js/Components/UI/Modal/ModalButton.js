import React from 'react';

import './ModalButton.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ModalButton = ({children, className, title, message, onYesClick, onNoClick }) => {
  const submit = () => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: 'Yes',
          onClick: () => onYesClick()
        },
        {
          label: 'No',
          onClick: () => onNoClick()
        }
      ]
    });
  };

  return (
      <button className={`${className}`} onClick={submit}>{children}</button>
  );
}

export default ModalButton;
