import React from 'react';
import ViewAction from "@/Components/Tournaments/Table/Actions/ViewAction";
import EditAction from "@/Components/Tournaments/Table/Actions/EditAction";
import DeleteAction from "@/Components/Tournaments/Table/Actions/DeleteAction";

const Actions = ({ viewRoute, editRoute, deleteTournamentHandler, isHosted, tournamentId }) => {
    return (
        <div className="flex item-center justify-center">
            <ViewAction route={viewRoute} />
            {isHosted && <EditAction route={editRoute} />}
            {isHosted && <DeleteAction deleteTournament={deleteTournamentHandler} tournamentId={tournamentId}/>}
        </div>
    );
}

export default Actions;
