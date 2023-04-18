<?php

namespace App\Dto;

use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use App\Enum\BracketType;
use Doctrine\Common\Collections\Collection;

class TournamentDto
{
    public ?int $id = null;
    public ?string $name = null;
    public ?string $description = null;
    public ?string $rules = null;
    public ?string $game = null;
    public ?string $bracketType = null;
    public ?int $host = null;
    public ?bool $matchesSynced = null;
    public ?array $participants = null;
    public ?array $tournamentMatches = null;
    public ?int $winner = null;
    public ?\DateTimeInterface $createdAt = null;
    public ?\DateTimeInterface $startDate = null;

    public function __construct(
        ?int $id,
        ?string $name,
        ?string $description,
        ?string $rules,
        ?string $game,
        ?string $bracketType,
        ?int $host,
        ?bool $matchesSynced,
        ?array $participants,
        ?array $tournamentMatches,
        ?int $winner,
        ?\DateTimeInterface $createdAt,
        ?\DateTimeInterface $startDate
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->rules = $rules;
        $this->game = $game;
        $this->bracketType = $bracketType;
        $this->host = $host;
        $this->matchesSynced = $matchesSynced;
        $this->participants = $participants;
        $this->tournamentMatches = $tournamentMatches;
        $this->winner = $winner;
        $this->createdAt = $createdAt;
        $this->startDate = $startDate;
    }

    public static function createFromTournament(Tournament $tournament): self
    {
        return new self(
            $tournament->getId(),
            $tournament->getName(),
            $tournament->getDescription(),
            $tournament->getRules(),
            $tournament->getGame()->value,
            $tournament->getBracketType()->value,
            $tournament->getHost()->getId(),
            $tournament->isMatchesSynced(),
            self::formatParticipantsArray($tournament->getParticipants()),
            self::formatTournamentMatchesArray($tournament->getTournamentMatches()),
            $tournament->getWinner(),
            $tournament->getCreatedAt(),
            $tournament->getStartDate(),
        );
    }

    private static function formatParticipantsArray(Collection $participantsCollection): array
    {
        $participants = [];

        /** @var Participant $item */
        foreach ($participantsCollection as $item) {
            $participant = [
                'id' => $item->getId(),
                'resultText' => $item->getResultText(),
                'tournamentName' => $item->getTournamentName(),
                'user' => $item->getUser()->getId(),
            ];

            $participants[] = $participant;
        }

        return $participants;
    }

    private static function formatTournamentMatchesArray(Collection $tournamentMatchesCollection): array
    {
        $tournamentMatches = [];

        /** @var TournamentMatch $item */
        foreach ($tournamentMatchesCollection as $item) {
            $tournamentMatch = [
                'id' => $item->getId(),
                'name' => $item->getName(),
                'isGhostMatch' => $item->isIsGhostMatch(),
                'nextMatch' => $item->getNextMatch()?->getId(),
                'participants' => [],
                'startDate' => $item->getStartDate(),
                'state' => $item->getState(),
                'winnerParticipant' => $item->getWinnerParticipant()?->getId(),
            ];

            /** @var Participant $participant */
            foreach ($item->getParticipants() as $participant) {
                $tournamentMatch['participants'][] = [
                    'id' => $participant->getId(),
                    'resultText' => $participant->getResultText(),
                    'tournamentName' => $participant->getTournamentName(),
                    'user' => $participant->getUser()->getId(),
                ];
            }

            $tournamentMatches[] = $tournamentMatch;
        }

        return $tournamentMatches;
    }
}
