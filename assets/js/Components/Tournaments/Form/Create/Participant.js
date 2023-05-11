import React from 'react';
import UserPicker from "@/Components/UI/UserPicker/UserPicker";

const Participant = ({ index, name, fullName = '', changeParticipantName, changeParticipantNameEdit, users, userChangeHandler, addBackUserHandler, createPhase = true }) => {
    const setParticipantNameHandler = (e) => {
        if (createPhase) {
            const participantObject = {
                index,
                name: e.target.value,
            };

            changeParticipantName(participantObject);
        } else {
            const participantObject = {
                index,
                tournamentName: e.target.value,
            };

            changeParticipantNameEdit(participantObject);
        }
    }

    return (
        <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-4"
                   htmlFor="">
                Participant #{index}
            </label>

            <label className="block uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
                Tournament username
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="" type="text" defaultValue={name} placeholder="Erikas"
                onChange={setParticipantNameHandler} />

            <label className="block uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
                User
            </label>
            {createPhase && (
                <UserPicker users={users} participantIndex={index} onUserChangeHandler={userChangeHandler} addBackUserHandler={addBackUserHandler} />
            )}
            {!createPhase && (
                <div className='bg-indigo-100 py-4 px-2 text-md font-semibold'>{fullName}</div>
            )}
            <div className='pb-4 border-b'></div>
            <div className='pt-4'></div>
        </div>
    );
}

export default Participant;
