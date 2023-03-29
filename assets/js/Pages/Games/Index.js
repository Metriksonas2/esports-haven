import React from 'react';
import Page from "@/Components/Page/Page";
import Heading from "@/Components/Page/Heading/Heading";
import Game from "@/Components/Games/Card";

const Index = () => {
    const games = [
        {
            name: 'League of Legends',
            image: '/assets/images/games/League of Legends.jpg',
            description: 'League of Legends is one of the world\'s most popular video games, developed by Riot Games. It features a team-based competitive game mode based on strategy and outplaying opponents. Players work with their team to break the enemy Nexus before the enemy team breaks theirs.'
        },
        {
            name: 'Dota 2',
            image: '/assets/images/games/Dota 2.jpg',
            description: 'Dota 2 is a multiplayer online battle arena (MOBA) video game in which two teams of five players compete to destroy a large structure defended by the opposing team known as the "Ancient" whilst defending their own.'
        },
        {
            name: 'CS:GO',
            image: '/assets/images/games/CSGO.jpg',
            description: 'Counter-Strike: Global Offensive is a tactical shooter that emphasizes teamwork, strategy, and gunplay. Getting kills in CS:GO comes from recognizing and holding angles, using grenades in a smart manner, and effectively communicating with your team. Winning a game requires extensive teamwork, as well as personal economy management.'
        },
        {
            name: 'Rocket League',
            image: '/assets/images/games/Rocket League.png',
            description: 'Rocket League is a fantastical sport-based video game, developed by Psyonix (it\'s “soccer with cars”). It features a competitive game mode based on teamwork and outmaneuvering opponents. Players work with their team to advance the ball down the field, and score goals in their opponents\' net.'
        },
        {
            name: 'Brawlhalla',
            image: '/assets/images/games/Brawlhalla.jpg',
            description: 'Brawlhalla is a free 2D platform fighting game that supports up to 8 local or online players with full cross-play for PC, Xbox One, Xbox Series X, PS5, PS4, iOS, Nintendo Switch, and Android. Climb the ranked ladder from Tin up to Platinum and beyond! Matches you against players near your skill level.'
        },
    ];
    return (
        <Page pageIndex='games' breadcrumbsPathArray={['Games']}>
            <Heading title='Games' subtitle='Games in which you can compete in your own tournaments.' />
            <div className="games w-full flex flex-wrap gap-4">
                {games.map(game => (
                    <Game key={game.name} name={game.name}
                          image={game.image} description={game.description} className='duration-200 hover:scale-105'/>
                ))}
            </div>
        </Page>
    );
}

export default Index;