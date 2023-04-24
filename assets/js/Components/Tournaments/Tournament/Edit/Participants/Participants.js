import React from 'react';
import Participant from "@/Components/Tournaments/Form/Create/Participant";

const Participants = ({ participants }) => {
    return (
        <div className="flex flex-col mb-6">
            {participants.map((p, index) => (
                <Participant key={index} index={p.id} name={p.tournamentName} users={[]} userChangeHandler={()=>{}} addBackUserHandler={()=>{}} changeParticipantName={()=>{}} createPhase={false} />
            ))}
            <div
                className="flex items-center justify-center cursor-pointer h-12 mt-2 mb-4 rounded bg-gray-200 hover:bg-gray-50"
            >
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
        </div>
    );
}

export default Participants;
