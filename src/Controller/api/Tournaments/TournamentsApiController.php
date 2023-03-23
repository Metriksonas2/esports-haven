<?php

namespace App\Controller\api\Tournaments;

use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use App\Enum\BracketType;
use App\Repository\TournamentRepository;
use App\Service\ParticipantService;
use App\Service\TournamentMatchService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
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
        ParticipantService $participantService,
        TournamentMatchService $tournamentMatchService
    ): Response
    {
        $user = $this->getUser();

        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->json(
                ["error" => "Access denied."],
                Response::HTTP_UNAUTHORIZED,
                headers: ['Content-Type' => 'application/json;charset=UTF-8']
            );
        }

        $requestData = json_decode($request->getContent(), true);

        /** @var Tournament $tournament */
        $tournament = $this->serializer->deserialize(
            $request->getContent(), Tournament::class, JsonEncoder::FORMAT, [
                AbstractNormalizer::IGNORED_ATTRIBUTES => ['bracketType', 'participants'],
            ]
        );

        // Add participants to the tournament
        $participantsArray = $participantService->saveParticipants(
            $requestData['participants'],
            $tournament,
            $user,
            'WON',
        );

        // Create initial tournament matches for the tournament
        $tournamentMatchesArray = $tournamentMatchService->saveTournamentMatches(
            $tournament,
            "The match",
            "IN_PROGRESS",
            $participantsArray,
        );

        if (!is_null($bracketType = BracketType::tryFrom($requestData['bracketType']))) {
            $tournament->setBracketType($bracketType);
        }

        $tournament->setHost($user);

        $this->entityManager->persist($tournament);
        $this->entityManager->flush();

        return $this->json(
            $tournament,
            Response::HTTP_CREATED,
            headers: ['Content-Type' => 'application/json;charset=UTF-8'],
            context: [AbstractNormalizer::IGNORED_ATTRIBUTES => ['host']]
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
