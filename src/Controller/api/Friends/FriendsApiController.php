<?php

namespace App\Controller\api\Friends;

use App\Entity\FriendRequest;
use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use App\Entity\User;
use App\Enum\BracketType;
use App\Enum\GameType;
use App\Repository\TournamentRepository;
use App\Service\FriendService;
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

#[Route('/api', name: 'app_api_friends_')]
class FriendsApiController extends AbstractController
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

    #[Route('/friends/request/{toUser}', name: 'send_request', methods: ["POST"])]
    public function sendFriendRequest(
        User $toUser,
        Request $request,
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

        $friendRequest = new FriendRequest();
        $friendRequest->setFromUser($user);
        $friendRequest->setToUser($toUser);

        $this->entityManager->persist($friendRequest);
        $this->entityManager->flush();

        return $this->json(
            ['success' => 'Friend request has been sent successfully!'],
            Response::HTTP_CREATED,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }

    #[Route('/friends/accept/{fromUser}', name: 'accept', methods: ["POST"])]
    public function acceptFriendRequest(
        User $fromUser,
        Request $request,
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

        $friendRequestToRemove = $this->entityManager->getRepository(FriendRequest::class)->findOneBy([
            'fromUser' => $fromUser,
            'toUser' => $user,
        ]);

        $user->addFriend($fromUser);
        $user->removeFriendRequest($friendRequestToRemove);

        $this->entityManager->flush();

        return $this->json(
            ['success' => 'Friend has been added successfully!'],
            Response::HTTP_CREATED,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }

    #[Route('/friends/decline/{fromUser}', name: 'decline', methods: ["POST"])]
    public function declineFriendRequest(
        User $fromUser,
        Request $request,
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

        $friendRequestToRemove = $this->entityManager->getRepository(FriendRequest::class)->findOneBy([
            'fromUser' => $fromUser,
            'toUser' => $user,
        ]);

        $user->removeFriendRequest($friendRequestToRemove);

        $this->entityManager->flush();

        return $this->json(
            ['success' => 'Friend request has been declined.'],
            Response::HTTP_CREATED,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }

    #[Route('/friends/{user}', name: 'remove_friend', methods: ["DELETE"])]
    public function removeFriend(
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
