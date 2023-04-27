<?php

namespace App\Controller\api\Profile;

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

#[Route('/api', name: 'app_api_profile_')]
class ProfileApiController extends AbstractController
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

    #[Route('/profile/edit/{user}', name: 'edit_profile', methods: ["POST"])]
    public function editParticipants(
        Request $request,
        User $user,
        GameService $gameService,
    ): Response
    {
        $me = $this->getUser();
        $isMeOrAdmin = ($me === $user) || $this->isGranted('ROLE_ADMIN');

        if (!$isMeOrAdmin) {
            return $this->json(
                ["error" => "Access denied."],
                Response::HTTP_UNAUTHORIZED,
                headers: ['Content-Type' => 'application/json;charset=UTF-8']
            );
        }

        $requestData = json_decode($request->getContent(), true);

        $firstName = $requestData['firstName'];
        $lastName = $requestData['lastName'];
        $email = $requestData['email'];
        $username = $requestData['username'];
        $position = $requestData['position'];
        $country = $requestData['country'];
        $description = $requestData['description'];
        $games = $requestData['games'];

        $me->setFirstName($firstName);
        $me->setLastName($lastName);
        $me->setEmail($email);
        $me->setUsername($username);
        $me->setPosition($position);
        $me->setCountry($country);
        $me->setDescription($description);
        $gameService->addNewSelectedGames($me, $games);

        $this->entityManager->flush();

        return $this->json(
            ['message' => 'Your profile has been successfully edited.'],
            Response::HTTP_CREATED,
            headers: ['Content-Type' => 'application/json;charset=UTF-8'],
            context: [AbstractNormalizer::IGNORED_ATTRIBUTES => ['host']]
        );
    }
}
