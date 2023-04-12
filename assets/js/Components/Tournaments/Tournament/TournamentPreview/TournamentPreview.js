import React from 'react';
import {Match, SingleEliminationBracket, SVGViewer} from "@g-loot/react-tournament-brackets";
import {TournamentBracketTheme} from "@/Services/TournamentBracketTheme";

const TournamentPreview = ({ matches, width = 750, height = 750}) => {
    console.log(matches)
    return (
        <React.Fragment>
            <h1 className='text-xl font-semibold'>Tournament preview</h1>
            <hr/>
            <SingleEliminationBracket
                matches={matches}
                theme={TournamentBracketTheme}
                options={{
                    style: {
                        roundHeader: { backgroundColor: '#312E81' },
                        connectorColor: '#312E81',
                        connectorColorHighlight: '#000',
                    },
                }}
                matchComponent={Match}
                svgWrapper={({ children, ...props }) => (
                    <SVGViewer width={width} height={height} {...props}
                               background="#FFF" SVGBackground="#F0F4F9"
                    >
                        {children}
                    </SVGViewer>
                )}
            />
        </React.Fragment>
    );
}

export default TournamentPreview;
