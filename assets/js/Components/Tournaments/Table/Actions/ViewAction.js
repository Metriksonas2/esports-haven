import React from 'react';
import {InertiaLink} from "@inertiajs/inertia-react";

const ViewAction = ({ route }) => {
  return (
      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
        <InertiaLink href={route}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </InertiaLink>
      </div>
  );
}

export default ViewAction;
