<?php

declare(strict_types=1);


namespace App\Event;

use App\Entity\Tournament;
use Doctrine\Common\Collections\Collection;

class AfterTournamentCreatedEvent extends \Symfony\Contracts\EventDispatcher\Event
{
    protected Tournament $tournament;

    public function __construct(Tournament $tournament)
    {
        $this->tournament = $tournament;
    }

    public function getTournament(): Tournament
    {
        return $this->tournament;
    }

    public function getTournamentMatches(): Collection
    {
        return $this->tournament->getTournamentMatches();
    }
}