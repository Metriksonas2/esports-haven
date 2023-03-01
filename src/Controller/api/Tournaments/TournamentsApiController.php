<?php

namespace App\Controller\api\Tournaments;

use App\Entity\Tournament;
use App\Repository\TournamentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'app_api_tournaments_')]
class TournamentsApiController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer
    )
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('/tournaments', name: 'create', methods: ["POST"])]
    public function create(
        Request $request,
    ): Response
    {
        $tournament = new Tournament();
        $tournamentDto = $this->serializer->deserialize($request->getContent(), Tournament::class, 'json');
        $name = $tournamentDto->getName();

        $tournament->setName($name);
        // todo: change data
        $tournament->setGame("Dota 2");
        $tournament->setBracketType("Single Elimination");
        $tournament->setWithThirdPlaceMatch(false);

        $this->entityManager->persist($tournament);
        $this->entityManager->flush();

        return $this->json(
            $tournament,
            Response::HTTP_CREATED,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }

    #[Route('/tournaments/{id}', name: 'delete', methods: ["DELETE"])]
    public function delete(
        Tournament $tournament,
        TournamentRepository $tournamentRepository,
    ): Response
    {
        $tournamentRepository->remove($tournament);
        $this->entityManager->flush();

        return $this->json(
            [],
            Response::HTTP_ACCEPTED,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }
}
