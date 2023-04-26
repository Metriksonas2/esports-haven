import React, { useEffect, useState } from 'react';

const Status = ({ status }) => {
  const [styles, setStyles] = useState('');

  const statuses = {
    'Not started': {
      bgColor: 'yellow-200',
      textColor: 'yellow-600'
    },
    'In progress': {
      bgColor: 'red-200',
      textColor: 'red-600'
    },
    'Completed': {
      bgColor: 'green-200',
      textColor: 'green-600'
    }
  };

  const getStylesForStatus = () => {
    return {
      background: statuses[status].bgColor,
      text: statuses[status].textColor,
    }
  }

  useEffect(() => {
    setStyles(`bg-${getStylesForStatus().background} text-${getStylesForStatus().text} py-1 px-3 rounded-full text-xs`);
  }, [status])

  return (
      <span className={styles}>
        {status}
      </span>
  );
}

export default Status;
