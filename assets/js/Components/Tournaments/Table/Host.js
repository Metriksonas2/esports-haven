import React from 'react';

const Host = ({name}) => {
    return (
        <div className="flex items-center">
            <div className="mr-2">
                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"/>
            </div>
            <span>{name}</span>
        </div>
    );
}

export default Host;
