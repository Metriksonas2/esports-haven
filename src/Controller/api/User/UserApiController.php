<?php

namespace App\Controller\api\User;

use App\Dto\UserDto;
use App\Entity\User;
use App\Service\UploadService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/users', name: 'app_api_users_')]
class UserApiController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'users', methods: ['GET'])]
    public function getUsers()
    {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->json(
                ["error" => "Access denied."],
                Response::HTTP_UNAUTHORIZED,
                headers: ['Content-Type' => 'application/json;charset=UTF-8']
            );
        }

        $users = $this->entityManager->getRepository(User::class)->findAll();
        $usersDto = UserDto::createFromUsers($users);

        return $this->json(
            ['users' => $usersDto],
            Response::HTTP_OK,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }

    #[Route('/profileimage', name: 'profile_image', methods: ['GET'])]
    public function getProfileImage()
    {
        $user = $this->getUser();

        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->json(
                ["error" => "Access denied."],
                Response::HTTP_UNAUTHORIZED,
                headers: ['Content-Type' => 'application/json;charset=UTF-8']
            );
        }

        return $this->json(
            ['path' => $user->getProfileImage()],
            Response::HTTP_OK,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }
}