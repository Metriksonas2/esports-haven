import React, { useEffect, useState } from 'react';

const Status = ({ status }) => {
  const [styles, setStyles] = useState('');

  const getStylesForStatus = () => {
    const styleEnd = ' py-1 px-3 rounded-full text-xs';
    switch (status) {
      case 'Not started':
        return 'bg-yellow-200 text-yellow-600' + styleEnd;
      case 'In progress':
        return 'bg-indigo-200 text-indigo-600' + styleEnd;
      case 'Finished':
        return 'bg-red-200 text-red-600' + styleEnd;
    }
  }


  return (
      <span className={getStylesForStatus()}>
        {status}
      </span>
  );
}

export default Status;
