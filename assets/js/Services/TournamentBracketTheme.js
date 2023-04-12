import {createTheme} from "@g-loot/react-tournament-brackets";

const TournamentBracketTheme = createTheme({
    textColor: { main: '#000000', highlighted: '#FFFFFF', dark: '#000000' },
    matchBackground: { wonColor: '#a8aab9', lostColor: '#a8aab9' },
    score: {
        background: { wonColor: '#4642a5', lostColor: '#4642a5' },
        text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#FB7E94' },
    },
    border: {
        color: '#a8aab9',
        highlightedColor: '#000000',
    },
    roundHeader: { backgroundColor: '#da96c6', fontColor: '#000' },
    connectorColor: '#CED1F2',
    connectorColorHighlight: '#da96c6',
    svgBackground: '#FAFAFA',
});

export { TournamentBracketTheme };