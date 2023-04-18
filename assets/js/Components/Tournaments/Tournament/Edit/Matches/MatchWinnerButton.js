import React from 'react';
import {TrophyIcon} from "@heroicons/react/24/solid";

const MatchWinnerButton = ({ matchId, participant, winnerChoiceHandler }) => {
    const onWinnerChoiceHandler = () => {
        winnerChoiceHandler(matchId, participant.id);
    }

    return (
        <div className='flex w-full flex-col justify-center items-center px-4 gap-y-4'>
            <h3 className='text-xl'>{participant.tournamentName}</h3>
            <button type="button"
                    className="max-w-[170px] text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    onClick={onWinnerChoiceHandler}
            >
                Choose winner
                <TrophyIcon className='w-5 h-5 ml-2 -mr-1' />
            </button>
        </div>
    );
}

export default MatchWinnerButton;
