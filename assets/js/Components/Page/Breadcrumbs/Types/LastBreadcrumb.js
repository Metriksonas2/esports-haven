import React from 'react';

const LastBreadcrumb = ({ page }) => {
    return (
        <li aria-current="page">
            <div className="flex items-center">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor"
                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"></path>
                </svg>
                <span
                    className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{page}</span>
            </div>
        </li>
    );
}

export default LastBreadcrumb;
