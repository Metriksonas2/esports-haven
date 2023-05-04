<?php

declare(strict_types=1);


namespace App\Event;

use App\Entity\TournamentMatch;
use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class AfterFriendAddedEvent extends Event
{
    protected User $userOne;
    protected User $userTwo;

    public function __construct(User $userOne, User $userTwo)
    {
        $this->userOne = $userOne;
        $this->userTwo = $userTwo;
    }

    public function getUserOne(): User
    {
        return $this->userOne;
    }

    public function getUserTwo(): User
    {
        return $this->userTwo;
    }
}