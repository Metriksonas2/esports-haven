import React from 'react';

const Host = ({ user }) => {
    return (
        <div className="flex items-center">
            <div className="mr-2">
                <img className="w-6 h-6 rounded-full" src={user.profileImage} alt='profile-image'/>
            </div>
            <span>{user.firstName}</span>
        </div>
    );
}

export default Host;
