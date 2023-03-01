import React from 'react';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";

import route from "@/Services/route";
import ModalButton from "@/Components/UI/Modal/ModalButton";

const Confirm = () => {
    return (
        <div>
            <ModalButton
                title="Delete tournament"
                message="Do you really want to remove this tournament?"
                onYesClick={() => console.log('Yes')}
                onNoClick={() => console.log('No')}
            >
                Delete tournament
            </ModalButton>
            <InertiaLink href={route('tournaments')}>Tournaments</InertiaLink>
        </div>
    );
}

export default Confirm;