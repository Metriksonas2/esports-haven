import React from 'react';

import './Notice.css';

const Notice = ({children}) => {
  return (
    <div className='notice'>
      {children}
    </div>
  );
}

export default Notice;
