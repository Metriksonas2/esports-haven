<?php

namespace App\Service;

use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class ParticipantService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function saveParticipants(
        array $participants,
        Tournament $tournament,
        string $resultText,
        bool $flush = false
    ): bool|array
    {
        try {
            $participantsArray = [];

            foreach ($participants as $participant) {
                $newParticipant = new Participant();
                $user = $this->entityManager->getRepository(User::class)->find($participant['user']);
                $newParticipant->setTournament($tournament);
                $newParticipant->setUser($user);
                $newParticipant->setTournamentName($participant['name']);
                $newParticipant->setResultText($resultText);

                $participantsArray[] = $newParticipant;
                $this->entityManager->persist($newParticipant);
            }

            if ($flush) {
                $this->entityManager->flush();
            }
            return $participantsArray;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function editParticipants(array $participants): bool
    {
        try {
            foreach ($participants as $participant) {
                $participantObj = $this->entityManager->getRepository(Participant::class)->find($participant['id']);
                $participantObj->setTournamentName($participant['tournamentName']);
            }

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}