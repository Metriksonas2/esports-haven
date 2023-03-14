import React from 'react';
import ViewAction from "@/Components/Tournaments/Table/Actions/ViewAction";
import EditAction from "@/Components/Tournaments/Table/Actions/EditAction";
import DeleteAction from "@/Components/Tournaments/Table/Actions/DeleteAction";

const Actions = ({ viewRoute, editRoute, deleteRoute }) => {
    return (
        <div className="flex item-center justify-center">
            <ViewAction route={viewRoute} />
            <EditAction route={editRoute} />
            <DeleteAction route={deleteRoute} />
        </div>
    );
}

export default Actions;
