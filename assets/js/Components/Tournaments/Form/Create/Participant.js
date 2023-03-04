import React from 'react';

const Participant = ({ index, name, changeParticipantName }) => {
    const setParticipantNameHandler = (e) => {
        const participantObject = {
            index,
            name: e.target.value
        };

        changeParticipantName(participantObject);
    }

    return (
        <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                   htmlFor="">
                Participant #{index}
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="" type="text" defaultValue={name} placeholder="Erikas"
                onChange={setParticipantNameHandler} />
        </div>
    );
}

export default Participant;
