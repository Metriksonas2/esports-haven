import React from 'react';
import ModalButton from "@/Components/UI/Modal/ModalButton";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteAction = ({ deleteTournament, tournamentId }) => {
  const deleteTournamentHandler = async () => {
      try {
          await axios.delete(`/api/tournaments/${tournamentId}`);
          toast.success('Tournament has been removed!');

          deleteTournament(tournamentId);
      } catch (error) {
          toast.error('Something went wrong... Please try again later');
          console.error(error); // log any errors
      }
  }

  return (
      <ModalButton
          title='Are you sure you want to delete this tournament?'
          message=''
          onYesClick={deleteTournamentHandler}
          onNoClick={() => console.log('no')}
      >
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
          </div>
      </ModalButton>
  );
}

export default DeleteAction;
