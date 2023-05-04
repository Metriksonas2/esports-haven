<?php

declare(strict_types=1);


namespace App\Event;

use App\Entity\Participant;
use App\Entity\TournamentMatch;
use Symfony\Contracts\EventDispatcher\Event;

class AfterMatchPlayedEvent extends Event
{
    protected Participant $winnerParticipant;
    protected Participant $loserParticipant;
    protected bool $isFinalMatch;

    public function __construct(
        Participant $winnerParticipant,
        Participant $loserParticipant,
        bool $isFinalMatch = false,
    )
    {
        $this->winnerParticipant = $winnerParticipant;
        $this->loserParticipant = $loserParticipant;
        $this->isFinalMatch = $isFinalMatch;
    }

    public function getWinnerParticipant(): Participant
    {
        return $this->winnerParticipant;
    }

    public function getLoserParticipant(): Participant
    {
        return $this->loserParticipant;
    }

    public function isFinalMatch(): bool
    {
        return $this->isFinalMatch;
    }
}
