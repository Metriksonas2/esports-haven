import React, {useState} from 'react';

import './TextField.css';
import Button from "@/Components/UI/Button/Button";

const TextField = ({onCreation}) => {
    const [newTournamentName, setNewTournamentName] = useState("");

    const onTournamentNameInput = e => {
        setNewTournamentName(e.target.value);
    }

    const onCreateTournamentHandler = e => {
        e.preventDefault();
        let newTournament = {
            id: Math.random(),
            name: newTournamentName
        };
        onCreation(newTournament);
        setNewTournamentName("");
    }

    return (
        <form onSubmit={onCreateTournamentHandler}>
            <div className='form-control'>
                <label>Tournaments</label>
                <input type="text" value={newTournamentName} onChange={onTournamentNameInput}/>
            </div>
            <Button type="submit">Create tournament</Button>
        </form>
    );
}

export default TextField;
