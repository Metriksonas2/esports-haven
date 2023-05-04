<?php

declare(strict_types=1);


namespace App\Event;

use App\Entity\Tournament;
use Doctrine\Common\Collections\Collection;
use Symfony\Contracts\EventDispatcher\Event;

class AfterTournamentEndedEvent extends Event
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
}