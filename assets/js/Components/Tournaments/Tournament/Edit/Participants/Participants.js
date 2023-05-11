import React from 'react';
import Participant from "@/Components/Tournaments/Form/Create/Participant";

const Participants = ({ participants, submitNewParticipantNames, changeParticipantNameHandler }) => {
    console.log(participants)
    return (
        <div className="flex flex-col mb-6">
            {participants.map((p, index) => (
                <Participant
                    key={index} index={index + 1}
                    name={p.tournamentName} users={[]}
                    fullName={p.firstName + ' ' + p.lastName}
                    userChangeHandler={()=>{}} addBackUserHandler={()=>{}}
                    changeParticipantName={()=>{}}
                    changeParticipantNameEdit={changeParticipantNameHandler}
                    createPhase={false} />
            ))}
            <button type="button"
                    onClick={() => submitNewParticipantNames()}
                    className="align-end mt-2 w-24 focus:outline-none text-white bg-indigo-900 hover:bg-indigo-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                Save
            </button>
        </div>
    );
}

export default Participants;
