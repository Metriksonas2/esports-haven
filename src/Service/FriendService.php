<?php

namespace App\Service;

use App\Dto\UserDto;
use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\User;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class FriendService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getUsersDtoArrayFromFriendsArray(array $friendsArray): bool|array
    {
        try {
            $users = [];

            foreach ($friendsArray as $friend) {
                $users[] = UserDto::createFromUser($friend);
            }

            return $this->removeDuplicateFriendRequests($users);
        } catch (\Exception $e) {
            return false;
        }
    }

    public function isFriendRequestSentByMe(User $me, User $otherUser): bool
    {
        return $this->ifContainsInFriendRequests($me, $otherUser);
    }

    public function isUserRequestingToBeMyFriend(User $me, User $otherUser): bool
    {
        return $this->ifContainsInFriendRequests($otherUser, $me);
    }

    private function removeDuplicateFriendRequests(array $friendRequests): array
    {
        $ids = array_map(function($friendRequest) {
            return $friendRequest->getId();
        }, $friendRequests);

        $uniqueIds = array_unique($ids);

        return array_values( array_intersect_key( $friendRequests, $uniqueIds ) );
    }

    private function ifContainsInFriendRequests(User $senderUser, User $toUser): bool
    {
        $friendRequests = $this->getUsersDtoArrayFromFriendsArray(
            $this->getFromUserArrayFromFriendRequests($toUser->getFriendRequests())
        );
        foreach ($friendRequests as $friendRequest) {
            if ($friendRequest->getId() === $senderUser->getId()) {
                return true;
            }
        }

        return false;
    }

    public function getFromUserArrayFromFriendRequests(array $friendRequests): array
    {
        $users = [];

        foreach ($friendRequests as $friendRequest) {
            $users[] = $friendRequest->getFromUser();
        }

        return $users;
    }
}