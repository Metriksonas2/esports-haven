<?php

namespace App\Controller\api\Endorsements;

use App\Entity\Endorsement;
use App\Entity\Game;
use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use App\Entity\User;
use App\Enum\BracketType;
use App\Enum\GameType;
use App\Event\AfterTournamentCreatedEvent;
use App\Repository\TournamentRepository;
use App\Service\GameService;
use App\Service\ParticipantService;
use App\Service\TournamentMatchService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'app_api_endorsements_')]
class EndorsementsApiController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager,
    )
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/endorse/{user}', name: 'endorse', methods: ["POST"])]
    public function endorse(
        Request $request,
        User $user,
    ): Response
    {
        $me = $this->getUser();

        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->json(
                ["error" => "Access denied."],
                Response::HTTP_UNAUTHORIZED,
                headers: ['Content-Type' => 'application/json;charset=UTF-8']
            );
        }

        $requestData = json_decode($request->getContent(), true);

        $game = $requestData['game'];
        $gameObj = $this->entityManager->getRepository(Game::class)->findOneBy(['name' => $game]);

        // Check if already endorsed
        $endorsementCheck = $this->entityManager->getRepository(Endorsement::class)->findOneBy([
            'endorsedUser' => $user, 'endorserUser' => $me, 'game' => $gameObj,
        ]);

        $endorsementExists = $endorsementCheck !== null;

        if (!$endorsementExists) {
            $endorsement = new Endorsement();
            $endorsement->setEndorserUser($me);
            $endorsement->setEndorsedUser($user);
            $endorsement->setGame($gameObj);

            $this->entityManager->persist($endorsement);
            $this->entityManager->flush();

            return $this->json(
                ['message' => 'User has been endorsed successfully!'],
                Response::HTTP_CREATED,
                headers: ['Content-Type' => 'application/json;charset=UTF-8'],
            );
        } else {
            return $this->json(
                ['error' => 'Endorsement already exists'],
                Response::HTTP_CONFLICT,
                headers: ['Content-Type' => 'application/json;charset=UTF-8'],
            );
        }
    }
}
