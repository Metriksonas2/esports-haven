const formatTournamentMatchesData = (participants, isThirdPlaceMatch = false) => {
    let newSingleMatches = [];
    let matchIndexesForRounds = [];
    const participantsCount = participants.length;
    // const numberOfRounds = Math.log2(participantsCount);
    // let separator = participantsCount;
    // let indexNumber = 1;
    // let limit = 0;
    //
    // for (let i = 1; i <= numberOfRounds; i++) {
    //     let indexesArrayForRound = [];
    //     separator = separator / 2;
    //     limit += separator;
    //
    //     for (let j = indexNumber; j <= limit; j++) {
    //         indexesArrayForRound.push(j);
    //     }
    //     indexNumber += separator;
    //
    //     matchIndexesForRounds.push(indexesArrayForRound);
    // }

    let indexForNextMatch = participantsCount / 2;
    let participantIndex = 0;
    let firstRound = true;

    for (let i = 1; i <= participantsCount - 1; i++) {
        if (i % 2 === 0) {
            indexForNextMatch--;
        }

        let firstParticipantName = firstRound ? participants[participantIndex].name : '';
        let secondParticipantName = firstRound ? participants[participantIndex + 1].name : '';

        newSingleMatches.push({
            "id": i,
            "name": "Semifinal - Match",
            "nextMatchId": i === participantsCount - 1 ? null : i + indexForNextMatch, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": firstParticipantName,
                },
                {
                    "id": "5c8264cf-2dcb-4c51-9134-367eaf7885a4",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": secondParticipantName,
                }
            ]
        });

        firstRound = i < participantsCount / 2;

        if (firstRound) {
            participantIndex += 2;
        }
    }

    if (isThirdPlaceMatch) {
        newSingleMatches.push({
            "id": participantsCount,
            "name": "Third Place Match",
            "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": 'test',
                },
                {
                    "id": "5c8264cf-2dcb-4c51-9134-367eaf7885a4",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": 'test',
                }
            ]
        });
    }

    console.log(newSingleMatches)

    return newSingleMatches;
}

const isPowerOfTwo = x => {
    return Math.log2(x) % 1 === 0;
}

const getQueryParam = (paramName) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(paramName);
}

const isSidebarOpen = () => {
    let sidebarOpenItemValue = window.localStorage.getItem('sidebar-open');

    if (sidebarOpenItemValue === null) {
        return true;
    }

    return window.localStorage.getItem('sidebar-open') === 'true';
}

export {
    formatTournamentMatchesData,
    isPowerOfTwo,
    getQueryParam,
    isSidebarOpen,
};