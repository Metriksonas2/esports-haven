const formatTournamentMatchesData = (participants, isThirdPlaceMatch = false) => {
    let newSingleMatches = [];
    const participantsCount = participants.length;

    const findIndexFromSecondRoundObjects = (array, index) => {
        return array.map(obj => obj.id).indexOf(index);
    }

    let matchesCount = getMatchesCount(participantsCount);
    let indexForNextMatch = (matchesCount + 1) / 2; // 4
    let participantIndex = 0;
    let firstRound = true;
    let nextMatchId;

    if (isPowerOfTwo(participantsCount)) {
        for (let i = 1; i <= matchesCount; i++) {
            if (i % 2 === 0) {
                indexForNextMatch--;
            }

            let firstParticipantId = firstRound ? participants[participantIndex].index : 'TBD';
            let secondParticipantId = firstRound ? participants[participantIndex + 1].index : 'TBD';

            let firstParticipantName = firstRound ? participants[participantIndex].name : 'TBD';
            let secondParticipantName = firstRound ? participants[participantIndex + 1].name : 'TBD';
            nextMatchId = i + indexForNextMatch;

            newSingleMatches.push({
                "id": i,
                "name": "Semifinal - Match",
                "nextMatchId": i === matchesCount ? null : nextMatchId, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
                "tournamentRoundText": "4", // Text for Round Header
                "startTime": "2021-05-30",
                "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                "participants": [
                    {
                        "id": firstParticipantId, // Unique identifier of any kind
                        "resultText": null, // Any string works
                        "isWinner": false,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                        "name": firstParticipantName,
                    },
                    {
                        "id": secondParticipantId,
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
    } else {
        let firstRoundMatchIndexes = getTwoRoundMatchIndexes(participantsCount);
        let secondRoundIndexes = [];
        let nextMatchId, isSecondRound;

        for (let i = 1; i <= matchesCount; i++) {
            if (i % 2 === 0) {
                indexForNextMatch--;
            }

            nextMatchId = i + indexForNextMatch;
            isSecondRound = i > (matchesCount + 1) / 2 && i <= ((matchesCount + 1) / 2) + ((matchesCount + 1) / 4);

            if (firstRoundMatchIndexes.includes(i) && !isSecondRound) {
                let firstParticipantName = participants[participantIndex].name;
                let secondParticipantName = participants[participantIndex + 1].name;

                newSingleMatches.push({
                    "id": i,
                    "name": "Semifinal - Match",
                    "nextMatchId": i === matchesCount ? null : nextMatchId, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
                    "tournamentRoundText": "4", // Text for Round Header
                    "startTime": "2021-05-30",
                    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                    "participants": [
                        {
                            "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119", // Unique identifier of any kind
                            "resultText": null, // Any string works
                            "isWinner": false,
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

                let index = findIndexFromSecondRoundObjects(secondRoundIndexes, nextMatchId);

                if (index > -1) { // if item is found
                    secondRoundIndexes[index].solo = false;
                } else {
                    secondRoundIndexes.push({
                        id: nextMatchId,
                        solo: true
                    });
                }

                participantIndex += 2;
            } else if (isSecondRound) {
                let firstParticipantName = participants[participantIndex].name;
                let index = findIndexFromSecondRoundObjects(secondRoundIndexes, i);

                if (index > -1) {
                    let roundObj = secondRoundIndexes[index];

                    if (roundObj.solo) {
                        newSingleMatches.push({
                            "id": i,
                            "name": "Match",
                            "nextMatchId": i === matchesCount ? null : nextMatchId, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
                            "tournamentRoundText": "4", // Text for Round Header
                            "startTime": "2021-05-30",
                            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                            "participants": [
                                {
                                    "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119", // Unique identifier of any kind
                                    "resultText": null, // Any string works
                                    "isWinner": false,
                                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                                    "name": firstParticipantName,
                                },
                                {
                                    "id": 'TBD',
                                    "resultText": null,
                                    "isWinner": false,
                                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                                    "name": 'TBD',
                                }
                            ]
                        });

                        participantIndex++;
                    } else {
                        newSingleMatches.push({
                            "id": i,
                            "name": "Match",
                            "nextMatchId": i === matchesCount ? null : nextMatchId, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
                            "tournamentRoundText": "4", // Text for Round Header
                            "startTime": "2021-05-30",
                            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                            "participants": [
                                {
                                    "id": 'TBD',
                                    "resultText": null,
                                    "isWinner": false,
                                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                                    "name": 'TBD',
                                },
                                {
                                    "id": 'TBD',
                                    "resultText": null,
                                    "isWinner": false,
                                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                                    "name": 'TBD',
                                }
                            ]
                        });
                    }
                } else {
                    let secondParticipantName = participants[participantIndex + 1].name;

                    newSingleMatches.push({
                        "id": i,
                        "name": "Match",
                        "nextMatchId": i === matchesCount ? null : nextMatchId, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
                        "tournamentRoundText": "4", // Text for Round Header
                        "startTime": "2021-05-30",
                        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                        "participants": [
                            {
                                "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119", // Unique identifier of any kind
                                "resultText": null, // Any string works
                                "isWinner": false,
                                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                                "name": firstParticipantName,
                            },
                            {
                                "id": '5c8264cf-2dcb-4c51-9134-367eaf7885a4',
                                "resultText": null,
                                "isWinner": false,
                                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                                "name": secondParticipantName,
                            }
                        ]
                    });

                    participantIndex += 2;
                }
            } else {
                // check if "ghost" match (not first round match)
                const participantId = i > (matchesCount + 1) / 2 ? 'TBD' : '-';

                newSingleMatches.push({
                    "id": i,
                    "name": "-",
                    "nextMatchId": i === matchesCount ? null : nextMatchId, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
                    "tournamentRoundText": "4", // Text for Round Header
                    "startTime": "2021-05-30",
                    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                    "participants": [
                        {
                            "id": participantId, // Unique identifier of any kind
                            "resultText": null, // Any string works
                            "isWinner": false,
                            "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                            "name": participantId,
                        },
                        {
                            "id": participantId,
                            "resultText": null,
                            "isWinner": false,
                            "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                            "name": participantId,
                        }
                    ]
                });
            }
        }
    }

    return newSingleMatches;
}

const renderTournamentView = (matches) => {
    const matchesArray = [];
    let matchCounter = 1;

    matches.forEach(match => {
        let participantOneId, participantTwoId;
        let participantOneName, participantTwoName;
        const participants = match.participants;
        let matchName = null;

        if (match.isGhostMatch) {
            participantOneId = participantTwoId = '-';
            participantOneName = participantTwoName = '-';
        } else if (Array.isArray(participants) && participants.length === 0) {
            participantOneId = participantTwoId = 'TBD';
            participantOneName = participantTwoName = 'TBD';
        } else if (Array.isArray(participants) && participants.length === 1) {
            participantOneId = participants[0].id;
            participantOneName = participants[0].tournamentName;

            participantTwoId = participantTwoName = 'TBD';
        } else {
            participantOneId = participants[0].id;
            participantOneName = participants[0].tournamentName;

            participantTwoId = participants[1].id;
            participantTwoName = participants[1].tournamentName;

            matchName = `Match ${matchCounter++}`;
        }


        matchesArray.push({
            "id": match.id,
            "name": matchName,
            "nextMatchId": match.nextMatch !== null ? match.nextMatch : null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "3", // Text for Round Header
            "startTime": null,
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": participantOneId,
                    "resultText": match.winnerParticipant !== null && participantOneId === match.winnerParticipant ? 'WON' : null,
                    "isWinner": match.winnerParticipant !== null && participantOneId === match.winnerParticipant,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": participantOneName,
                },
                {
                    "id": participantTwoId,
                    "resultText": match.winnerParticipant !== null && participantTwoId === match.winnerParticipant ? 'WON' : null,
                    "isWinner": match.winnerParticipant !== null && participantTwoId === match.winnerParticipant,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": participantTwoName,
                }
            ]
        });
    });

    return matchesArray;
}

const getStructuredTournamentMatches = (tournament) => {
    const roundCount = Math.ceil(Math.log2(tournament.participants.length));
    let tournamentMatches = tournament.tournamentMatches.slice();
    const structuredTournamentMatches = [];
    let roundIndexer = 1;
    let roundNameIndexer = 1;

    // remove ghost matches
    tournamentMatches = tournamentMatches.filter(match => {
        return match.isGhostMatch === false;
    });

    for (let i = roundCount; i > 0; i--) {
        const roundObject = {
            name: getRoundNameByIndex(i, roundNameIndexer),
            matches: [],
        };

        let thisRoundMatchesCount;

        // If first round
        if (i === roundCount) {
            thisRoundMatchesCount = getTwoRoundMatchIndexes(tournament.participants.length).length;
        } else {
            thisRoundMatchesCount = getMatchesCountForRound(roundIndexer, tournament.tournamentMatches.length);
        }

        for (let j = 0; j < thisRoundMatchesCount; j++) {
            roundObject.matches.push(tournamentMatches[j]);
        }

        tournamentMatches.splice(0, thisRoundMatchesCount);

        if (i > 3) {
            roundNameIndexer++;
        }
        roundIndexer++;
        structuredTournamentMatches.push(roundObject);
    }

    return structuredTournamentMatches;
}

const getRoundNameByIndex = (index, roundIndexer) => {
    switch (index) {
        case 3:
            return 'Quarterfinals';
        case 2:
            return 'Semifinals';
        case 1:
            return 'Final';
        default:
            return `Round ${roundIndexer}`;
    }
}

const getMatchesCount = (participantsCount) => {
    let x = participantsCount;
    while (!isPowerOfTwo(x)) {
        x++
    }

    return x - 1;
}

const getMatchesCountForRound = (roundIndex, matchesCount) => {
    let roundIndexer = 0;
    let matchesCountForRound;
    let powerOfTwoIndex = matchesCount + 1;

    if (roundIndex < 0) {
        return 0;
    }

    while (roundIndexer !== roundIndex) {
        powerOfTwoIndex /= 2;
        matchesCountForRound = powerOfTwoIndex;
        roundIndexer++;
    }

    return matchesCountForRound;
}

const getTwoRoundMatchIndexes = (participantsCount) => {
    if (isPowerOfTwo(participantsCount)) {
        let firstRoundArray = [];
        for (let i = 1; i <= participantsCount / 2; i++) {
            firstRoundArray.push(i);
        }
        return firstRoundArray;
    }

    let firstTwoRoundMatchesCount = participantsCount;
    while (!isPowerOfTwo(firstTwoRoundMatchesCount)) {
        firstTwoRoundMatchesCount--;
    }

    let firstArray = [];
    let secondArray = [];
    let mergedArray = [];

    for (let i = 1; i <= firstTwoRoundMatchesCount; i++) {
        if (i > firstTwoRoundMatchesCount / 2) {
            secondArray.push(i);
        }

        firstArray.push(i);
    }

    // if matches count is 8
    // firstArray = [1, 2, 3, 4]
    // secondArray = [5, 6, 7, 8]

    for (let i = 0; i < firstTwoRoundMatchesCount / 2; i++) {
        mergedArray.push(firstArray[i]);
        mergedArray.push(secondArray[i]);
    }

    // mergedArray = [1, 5, 2, 6, 3, 7, 4, 8]


    let firstRoundMatchIndexes = [];

    for (let i = 0; i < firstTwoRoundMatchesCount; i++) {
        if (i < participantsCount - firstTwoRoundMatchesCount) {
            firstRoundMatchIndexes.push(mergedArray[i]);
        }
    }

    return firstRoundMatchIndexes;
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

const daysInThisMonth = () => {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}

const generateMonthlyCalendar = () => {
    let months = [];

    for (let i = 1; i <= daysInThisMonth(); i++) {
        months.push(i);
    }

    return months;
}

const getFirstDayOfTheCurrentMonth = () => {
    let monthIndex = new Date().getMonth();
    let year = new Date().getFullYear();

    return new Date(`${year}-${monthIndex + 1}-01`).getDay()
}

const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
}

const getEmptyCalendarCellsCount = () => {
    let emptyCellsCount = 0;
    for (let i = 1; i < getFirstDayOfTheCurrentMonth(); i++) {
        emptyCellsCount++;
    }
    return emptyCellsCount;
}

const getCorrectDateFormatFromDateObject = (date) => {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
}

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const participantsArrayIsValid = (participants) => {
    let isValid = true;
    participants.forEach((participant) => {
        if (participant.name === '' || participant.name.length < 2 || participant.user === null) {
            isValid = false;
        }
    })

    return isValid;
}

const generateMonthNamesForChart = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const currentMonth = today.getMonth();
    const prevMonth = (currentMonth + 11) % 12;
    const nextMonth = (currentMonth + 1) % 12;
    const months = [monthNames[prevMonth], monthNames[currentMonth], monthNames[nextMonth]];
    return months;
}

export {
    formatTournamentMatchesData,
    renderTournamentView,
    isPowerOfTwo,
    getQueryParam,
    isSidebarOpen,
    generateMonthlyCalendar,
    getFirstDayOfTheCurrentMonth,
    daysInMonth,
    getEmptyCalendarCellsCount,
    getCorrectDateFormatFromDateObject,
    getTwoRoundMatchIndexes,
    classNames,
    getStructuredTournamentMatches,
    participantsArrayIsValid,
    generateMonthNamesForChart,
};