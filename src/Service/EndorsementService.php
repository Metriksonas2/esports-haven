<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;

class EndorsementService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getMyEndorsementsFromEndorsements(Collection $endorsements, User $me)
    {
        $newEndorsements = [];
        foreach ($endorsements as $endorsement) {
            if ($endorsement->getEndorserUser() === $me) {
                $newEndorsements[] = $endorsement->getGame()->getName();
            }
        }

        return $newEndorsements;
    }
}