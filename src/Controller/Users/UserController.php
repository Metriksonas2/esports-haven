<?php

declare(strict_types=1);


namespace App\Controller\Users;

use App\Dto\UserDto;
use App\Entity\User;
use App\Service\EndorsementService;
use App\Service\FriendService;
use App\Service\GameService;
use App\Service\LevelingService;
use Doctrine\ORM\EntityManagerInterface;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/user', name: 'app_user_')]
class UserController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager,
    )
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/{user}', name: 'index')]
    public function index(
        User $user, InertiaInterface $inertia, FriendService $friendService,
        GameService $gameService, EndorsementService $endorsementService,
        LevelingService $levelingService,
    )
    {
        /** @var User $me */
        $me = $this->getUser();

        $friendsCount = count($user->getFriends());
        $hostedTournamentsCount = count($user->getHostedTournaments());
        $wonTournamentsCount = count($user->getWonTournaments());

        $isFriend = in_array($user, $me->getFriends());
        $isMe = $me === $user;
        $isRequestSent = $friendService->isFriendRequestSentByMe($me, $user);
        $isRequestingToBeFriend = $friendService->isUserRequestingToBeMyFriend($me, $user);

        $selectedGames = $user->getSelectedGames();
        $selectedGamesArray = $gameService->generateSelectedGamesArray($selectedGames, $user);

        $endorsements = $user->getEndorsements();
        $myEndorsementsArray = $endorsementService->getMyEndorsementsFromEndorsements($endorsements, $me);

        $levelPercentage = $levelingService->getUserPercentage($user);

        $userDto = UserDto::createFromUser($user);

        return $inertia->render("Profile/View", [
            'user' => $userDto,
            'friends' => $friendsCount,
            'hostedTournaments' => $hostedTournamentsCount,
            'wonTournaments' => $wonTournamentsCount,
            'selectedGames' => $selectedGamesArray,
            'myEndorsements' => $myEndorsementsArray,
            'levelPercentage' => $levelPercentage,
            'isMe' => $isMe,
            'isFriend' => $isFriend,
            'isRequestSent' => $isRequestSent,
            'isRequestingToBeFriend' => $isRequestingToBeFriend,
        ]);
    }
}