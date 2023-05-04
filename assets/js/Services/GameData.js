const pathToIcons = "/assets/images/games/icons/";
const pathToCoverImages = "/assets/images/games/";

const games = {
    "League of Legends": {
        icon: pathToIcons + 'lol_icon.png',
        cover: pathToCoverImages + 'League of Legends.jpg',
        color: 'rgba(255, 194, 33, ',
    },
    "Dota 2": {
        icon: pathToIcons + 'dota_icon.png',
        cover: pathToCoverImages + 'Dota 2.jpg',
        color: 'rgba(255, 68, 0, ',
    },
    "CS:GO": {
        icon: pathToIcons + 'csgo_icon.webp',
        cover: pathToCoverImages + 'CS:GO.jpg',
        color: 'rgba(255, 123, 0, ',
    },
    "Rocket League": {
        icon: pathToIcons + 'rocket_league_icon.webp',
        cover: pathToCoverImages + 'Rocket League.png',
        color: 'rgba(21, 57, 148, ',
    },
    "Valorant": {
        icon: pathToIcons + 'valorant_icon.png',
        cover: pathToCoverImages + 'Valorant.webp',
        color: 'rgba(75, 192, 192, ',
    },
    "Brawlhalla": {
        icon: pathToIcons + 'brawlhalla_icon.ico',
        cover: pathToCoverImages + 'Brawlhalla.jpg',
        color: 'rgba(66, 20, 122, ',
    }
}

const getGameIcon = (game) => {
    return games[game].icon;
}

const getGameCover = (game) => {
    return games[game].cover;
}

const getGameColor = (game, alpha) => {
    return games[game].color + `${alpha})`;
}

const getGamesList = () => {
    return Object.keys(games);
}

export {
    getGameIcon,
    getGameCover,
    getGameColor,
    getGamesList,
}