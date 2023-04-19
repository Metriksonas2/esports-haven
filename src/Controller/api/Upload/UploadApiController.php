<?php

namespace App\Controller\api\Upload;

use App\Entity\User;
use App\Service\UploadService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/upload', name: 'app_api_upload_')]
class UploadApiController extends AbstractController
{
    public const PROFILE = 'profile';
    public const COVER = 'cover';

    private EntityManagerInterface $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager,
    )
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/profile', name: 'profile')]
    public function uploadProfileImage(Request $request, UploadService $uploadService)
    {
        $userId = $request->request->get('user');
        $user = $this->entityManager->getRepository(User::class)->find($userId);

        if (!$this->isGranted('IS_AUTHENTICATED_FULLY') && $this->getUser() === $user) {
            return $this->json(
                ["error" => "Access denied."],
                Response::HTTP_UNAUTHORIZED,
                headers: ['Content-Type' => 'application/json;charset=UTF-8']
            );
        }

        $file = $request->files->get('file');
        $uploadsDirectory = $this->getParameter('uploads_directory');
        $defaultAvatar = $this->getParameter('default_avatar');
        $defaultCover = $this->getParameter('default_cover');

        $uploadService->uploadImage(self::PROFILE, $user, $file, $uploadsDirectory, $defaultAvatar, $defaultCover);

        return $this->json(
            ['message' => 'File uploaded successfully'],
            Response::HTTP_OK,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }

    #[Route('/cover', name: 'cover')]
    public function uploadCoverImage(Request $request, UploadService $uploadService)
    {
        $userId = $request->request->get('user');
        $user = $this->entityManager->getRepository(User::class)->find($userId);

        if (!$this->isGranted('IS_AUTHENTICATED_FULLY') && $this->getUser() === $user) {
            return $this->json(
                ["error" => "Access denied."],
                Response::HTTP_UNAUTHORIZED,
                headers: ['Content-Type' => 'application/json;charset=UTF-8']
            );
        }

        $file = $request->files->get('file');
        $uploadsDirectory = $this->getParameter('uploads_directory');
        $defaultAvatar = $this->getParameter('default_avatar');
        $defaultCover = $this->getParameter('default_cover');

        $uploadService->uploadImage(self::COVER, $user, $file, $uploadsDirectory, $defaultAvatar, $defaultCover);

        return $this->json(
            ['message' => 'File uploaded successfully'],
            Response::HTTP_OK,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }
}