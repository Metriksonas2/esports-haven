import React from 'react';
import {InertiaLink} from "@inertiajs/inertia-react";

const EditAction = ({ route }) => {
  return (
      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
        <InertiaLink href={route}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        </InertiaLink>
      </div>
  );
}

export default EditAction;
