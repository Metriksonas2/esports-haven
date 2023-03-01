import React, {useEffect, useState} from 'react';
import {usePage} from "@inertiajs/inertia-react";

import './Index.css';
import TextField from "@/Components/UI/TextField/TextField";
import TournamentsList from "@/Components/Tournaments/TournamentsList/TournamentsList";
import Notice from "@/Components/UI/Notice/Notice";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";

const Index = () => {
    const isLoggedIn = usePage().props.isLoggedIn;
    const [tournaments, setTournaments] = useState(usePage().props.tournaments);

    useEffect(() => {
        const app = document.getElementById('app');
        delete app.dataset.page;
    }, [])

    const onTournamentCreationHandler = async (tournament) => {
        setTournaments((prevTournaments) => {
            return [tournament, ...prevTournaments];
        });
        await createTournamentRequest(tournament.name);
    }

    const onTournamentDelete = async (id) => {
        setTournaments((previousTournaments) => {
            return previousTournaments.filter(tournament => {
                return tournament.id !== id;
            });
        });
        await deleteTournamentRequest(id);
    }

    const createTournamentRequest = async (name) => {
        try {
            const body = { name };
            const headers = { 'Content-Type': 'application/json;charset=UTF-8' };
            const response = await axios.post('/api/tournaments', body, {
                headers: headers
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTournamentRequest = async (id) => {
        try {
            const response = await axios.delete(`/api/tournaments/${id}`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <nav>
                <Navbar isLoggedIn={isLoggedIn} />
            </nav>
            <section id='tournaments-form'>
                <TextField onCreation={onTournamentCreationHandler}/>
            </section>
            <section id='tournaments'>
                {tournaments.length === 0 && <Notice>No tournaments created. Create one now!</Notice>}
                {tournaments.length > 0 && <TournamentsList tournaments={tournaments} onDelete={onTournamentDelete}/>}
            </section>
        </div>
    );
}

export default Index;