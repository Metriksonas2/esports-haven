import React from 'react';
import Page from "@/Components/Page/Page";
import Heading from "@/Components/Page/Heading/Heading";
import Game from "@/Components/Games/Card";

const Index = () => {
    const games = [
        {
            name: 'League of Legends',
            image: '/assets/images/games/League of Legends.jpg',
        },
        {
            name: 'Dota 2',
            image: '/assets/images/games/Dota 2.jpg',
        },
        {
            name: 'CS:GO',
            image: '/assets/images/games/CSGO.jpg',
        },
        {
            name: 'Rocket League',
            image: '/assets/images/games/Rocket League.png',
        },
        {
            name: 'Brawlhalla',
            image: '/assets/images/games/Brawlhalla.jpg',
        },
    ];
    return (
        <Page pageIndex='games'>
            <Heading title='Games' subtitle='Games in which you can compete in your own tournaments.' />
            <div className="games w-full flex flex-wrap gap-4">
                {games.map(game => (
                    <Game key={game.name} name={game.name} image={game.image} className='duration-200 hover:scale-105'/>
                ))}
            </div>
        </Page>
    );
}

export default Index;