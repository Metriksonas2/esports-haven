import React from 'react';

const Participants = ({ firstThreeParticipants }) => {
    return (
        <div className="flex items-center justify-center">
            {firstThreeParticipants.map((participant, index) => (
                <img
                    className={`w-6 h-6 rounded-full border-gray-200 ${index !== 0 ? '-m-1' : ''} border transform hover:scale-125`}
                    src={participant.profileImage}
                />
            ))}
        </div>
  );
}

export default Participants;
