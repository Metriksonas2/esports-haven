import React from 'react';

const Host = ({ name, profileImage }) => {
    return (
        <div className="flex items-center">
            <div className="mr-2">
                <img className="w-6 h-6 rounded-full" src={profileImage} alt='profile-image'/>
            </div>
            <span>{name}</span>
        </div>
    );
}

export default Host;
