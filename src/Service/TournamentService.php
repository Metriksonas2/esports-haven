<?php

namespace App\Service;

use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use Doctrine\ORM\EntityManagerInterface;

class TournamentService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


}