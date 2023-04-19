<?php

declare(strict_types=1);


namespace App\Service;

use App\Controller\api\Upload\UploadApiController;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploadService
{
    private EntityManagerInterface $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager,
    )
    {
        $this->entityManager = $entityManager;
    }

    public function uploadImage(
        string $type,
        User $user,
        UploadedFile $file,
        $uploadsDirectory,
        string $defaultAvatar,
        string $defaultCover,
    )
    {
        $fileSystem = new Filesystem();

        switch ($type) {
            case UploadApiController::PROFILE:
                $currentImage = $user->getProfileImage();
                $defaultImage = $defaultAvatar;
                break;
            case UploadApiController::COVER:
                $currentImage = $user->getCoverImage();
                $defaultImage = $defaultCover;
                break;
        }

        if ($currentImage !== $defaultImage) {
            $currentImageFileName = explode('/', $currentImage);
            $currentImageFileName = $currentImageFileName[count($currentImageFileName) - 1];
            $fileSystem->remove($uploadsDirectory . '/' . $currentImageFileName);
        }

        $fileName = md5(uniqid()) . '.' . $file->guessExtension();
        $file->move($uploadsDirectory, $fileName);

        switch ($type) {
            case UploadApiController::PROFILE:
                $user->setProfileImage('/uploads/' . $fileName);
                break;
            case UploadApiController::COVER:
                $user->setCoverImage('/uploads/' . $fileName);
                break;
        }

        $this->entityManager->flush();
    }


}