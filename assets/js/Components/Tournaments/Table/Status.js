import React from 'react';

const Status = ({status}) => {
  const statuses = {
    'Active': {
      bgColor: 'purple-200',
      textColor: 'purple-600'
    },
    'Pending': {
      bgColor: 'red-200',
      textColor: 'red-600'
    },
    'Scheduled': {
      bgColor: 'yellow-200',
      textColor: 'yellow-600'
    },
    'Completed': {
      bgColor: 'green-200',
      textColor: 'green-600'
    }
  };

  return (
      <span className={`bg-${statuses[status].bgColor} text-${statuses[status].textColor} py-1 px-3 rounded-full text-xs`}>
        {status}
      </span>
  );
}

export default Status;
