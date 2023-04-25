const pathToIcons = "/assets/images/games/icons/";
const pathToCoverImages = "/assets/images/games/";

const games = {
    "League of Legends": {
        icon: pathToIcons + 'lol_icon.png',
        cover: pathToCoverImages + 'League of Legends.jpg',
    },
    "Dota 2": {
        icon: pathToIcons + 'dota_icon.png',
        cover: pathToCoverImages + 'Dota 2.jpg',
    },
    "CS:GO": {
        icon: pathToIcons + 'csgo_icon.webp',
        cover: pathToCoverImages + 'CS:GO.jpg',
    },
    "Rocket League": {
        icon: pathToIcons + 'rocket_league_icon.webp',
        cover: pathToCoverImages + 'Rocket League.png',
    },
    "Valorant": {
        icon: pathToIcons + 'valorant_icon.png',
        cover: pathToCoverImages + 'Valorant.webp',
    },
    "Brawlhalla": {
        icon: pathToIcons + 'brawlhalla_icon.ico',
        cover: pathToCoverImages + 'Brawlhalla.jpg',
    }
}

const getGameIcon = (game) => {
    return games[game].icon;
}

const getGameCover = (game) => {
    return games[game].cover;
}

export {
    getGameIcon,
    getGameCover,
}